import { useEffect, useRef, useState } from "react";
import { MapBox } from "../styles/MissionDetail.styles";

function loadKakaoMaps(appKey) {
  return new Promise((resolve, reject) => {
    if (!appKey)
      return reject(new Error("[Kakao] appKey가 없습니다. .env.local 확인!"));
    if (window.kakao?.maps) return resolve(window.kakao);

    const existing = document.querySelector('script[data-kakao-sdk="1"]');
    const onLoad = () => {
      if (!window.kakao?.maps)
        return reject(new Error('[Kakao] SDK loaded but "kakao.maps" 없음'));
      window.kakao.maps.load(() => resolve(window.kakao));
    };
    const onError = () =>
      reject(new Error("[Kakao] SDK 로드 실패(네트워크/도메인/키 확인)"));

    if (existing) {
      existing.addEventListener("load", onLoad);
      existing.addEventListener("error", onError);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
    script.async = true;
    script.setAttribute("data-kakao-sdk", "1");
    script.onload = onLoad;
    script.onerror = onError;
    document.head.appendChild(script);
  });
}

export default function MapView({
  appKey,
  markerSrc,
  onAddressChange,
  defaultCenter = { lat: 37.5665, lng: 126.978 }, // 서울시청
}) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [geoMsg, setGeoMsg] = useState(""); // 디버그/상태 표시용(원하면 UI로 노출 가능)

  // 주소 갱신
  const updateAddress = (kakao, lat, lng) => {
    if (!geocoderRef.current) return;
    geocoderRef.current.coord2RegionCode(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result?.[0]) {
        const r = result[0];
        const text = [
          r.region_1depth_name,
          r.region_2depth_name,
          r.region_3depth_name,
        ]
          .filter(Boolean)
          .join(" ");
        onAddressChange?.({ address: text, lat, lng });
      }
    });
  };

  // 지도/마커 센터 이동
  const centerTo = (kakao, lat, lng) => {
    const latlng = new kakao.maps.LatLng(lat, lng);
    mapRef.current.setCenter(latlng);
    markerRef.current.setPosition(latlng);
    updateAddress(kakao, lat, lng);
  };

  // 내 위치로 이동(재시도 포함)
  const locateMe = async (kakao, opts = {}) => {
    setGeoMsg("내 위치 확인 중…");
    if (!navigator.geolocation) {
      setGeoMsg("이 브라우저는 위치 서비스를 지원하지 않아요.");
      return false;
    }
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          centerTo(kakao, lat, lng);
          setGeoMsg("내 위치로 이동 완료");
          resolve(true);
        },
        (err) => {
          // 흔한 에러 메시지 보정
          const reasons = {
            1: "권한 거부됨(브라우저/OS 설정 확인)", // PERMISSION_DENIED
            2: "위치 가져오기 실패(일시적 오류)", // POSITION_UNAVAILABLE
            3: "요청 시간 초과", // TIMEOUT
          };
          setGeoMsg(`내 위치 실패: ${reasons[err.code] || err.message}`);
          resolve(false);
        },
        {
          enableHighAccuracy: true, // 고정밀 시도
          timeout: 10000, // 10초 타임아웃
          maximumAge: 60000, // 1분 내 캐시 허용
          ...opts,
        }
      );
    });
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const kakao = await loadKakaoMaps(appKey);
        if (!mounted) return;

        const map = new kakao.maps.Map(ref.current, {
          center: new kakao.maps.LatLng(defaultCenter.lat, defaultCenter.lng),
          level: 4,
        });
        mapRef.current = map;

        geocoderRef.current = new kakao.maps.services.Geocoder();

        const imageSize = new kakao.maps.Size(48, 48);
        const imageOption = { offset: new kakao.maps.Point(24, 48) };
        const markerImage = markerSrc
          ? new kakao.maps.MarkerImage(markerSrc, imageSize, imageOption)
          : null;

        markerRef.current = new kakao.maps.Marker({
          position: map.getCenter(),
          image: markerImage || undefined,
          map,
        });

        // 최초: 내 위치 시도 → 실패 시 기본센터
        const ok = await locateMe(kakao);
        if (!ok) centerTo(kakao, defaultCenter.lat, defaultCenter.lng);

        // 지도 클릭하면 마커 이동 + 주소 갱신
        kakao.maps.event.addListener(map, "click", (e) => {
          const latlng = e.latLng;
          markerRef.current.setPosition(latlng);
          map.panTo(latlng);
          updateAddress(kakao, latlng.getLat(), latlng.getLng());
        });
      } catch (e) {
        console.error("❌ Kakao Maps 초기화 실패:", e);
        setGeoMsg(e.message || "지도 초기화 실패");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [appKey, markerSrc, defaultCenter]);

  // 우하단 “내 위치” 버튼(재시도용)
  return (
    <MapBox>
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
      <button
        onClick={async () => {
          if (!window.kakao?.maps || !mapRef.current) return;
          await locateMe(window.kakao);
        }}
        style={{
          position: "absolute",
          fontSize: "10px",
          right: 12,
          bottom: 12,
          padding: "4px 8px",
          borderRadius: 999,
          border: "1px solid #e5e7eb",
          background: "#fff",
          fontWeight: 600,
          boxShadow: "0 6px 16px rgba(0,0,0,.08)",
          cursor: "pointer",
        }}
      >
        {loading ? "불러오는 중…" : "새로고침"}
      </button>
    </MapBox>
  );
}
