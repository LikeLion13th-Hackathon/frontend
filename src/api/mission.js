import instance from "./axiosInstance";

// 맞춤 미션 목록 조회
export const fetchCustomMissions = async () => {
  const { data } = await instance.get("/api/missions/custom");
  return data;
};

// 맞춤 미션 상세 조회 (단건)
export const fetchCustomMissionDetail = async (id) => {
  const { data } = await instance.get(`/api/missions/${id}`);
  return data;
};

// 소비 패턴 기반 맞춤 미션 추천 (ai)
export const fetchAIMissions = async () => {
  const { data } = await instance.get(
    "/api/missions?category=AI_CUSTOM&status=READY"
  );
  return data;
};

// 지역 맛집 미션 목록 조회
export const fetchRestaurantMissions = async () => {
  const { data } = await instance.get("/api/missions/region/restaurants");
  return data;
};

// 지역 맛집 상세 조회 (단건)
export const fetchRestaurantMissionDetail = async (id) => {
  const { data } = await instance.get(`/api/missions/region/restaurants/${id}`);
  return data;
};

// 지역 명소 미션 목록 조회
export const fetchLandmarkMissions = async () => {
  const { data } = await instance.get("/api/missions/region/landmarks");
  return data;
};

// 지역 명소 상세 조회 (단건)
export const fetchLandmarkMissionDetail = async (id) => {
  const { data } = await instance.get(`/api/missions/region/landmarks/${id}`);
  return data;
};

// 특산물 미션 목록 조회
export const fetchSpecialtyMissions = async () => {
  const { data } = await instance.get("/api/missions/region/specialties");
  return data;
};

// 특산물 미션 상세 조회 (단건)
export const fetchSpecialtyMissionDetail = async (id) => {
  const { data } = await instance.get(`/api/missions/region/specialties/${id}`);
  return data;
};

// 미션 시작
export const startMission = async (id) => {
  const { data } = await instance.post(`/api/missions/${id}/start`);
  return data;
};

// 미션 완료
export const completeMission = async (id, receiptId) => {
  const { data } = await instance.post(`/api/missions/${id}/complete`, {
    receiptId,
  });
  return data;
};

// 미션 포기
export const abandonMission = async (id) => {
  const { data } = await instance.post(`/api/missions/${id}/abandon`);
  return data;
};
