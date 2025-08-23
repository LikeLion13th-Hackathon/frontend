import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/+$/, "") || "";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// 맞춤 미션 목록 조회
export const fetchCustomMissions = async () => {
  const res = await axios.get(`${API_BASE}/api/missions/custom`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
// 맞춤 미션 상세 조회 (단건)
export const fetchCustomMissionDetail = async (id) => {
  const res = await axios.get(`${API_BASE}/api/missions/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// 지역 맛집 미션 목록 조회
export const fetchRestaurantMissions = async () => {
  const res = await axios.get(`${API_BASE}/api/missions/region/restaurants`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
// 지역 맛집 상세 조회 (단건)
export const fetchRestaurantMissionDetail = async (id) => {
  const res = await axios.get(
    `${API_BASE}/api/missions/region/restaurants/${id}`,
    { headers: getAuthHeaders() }
  );
  return res.data;
};

// 지역 명소 미션 목록 조회
export const fetchLandmarkMissions = async () => {
  const res = await axios.get(`${API_BASE}/api/missions/region/landmarks`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
// 지역 명소 상세 조회 (단건)
export const fetchLandmarkMissionDetail = async (id) => {
  const res = await axios.get(
    `${API_BASE}/api/missions/region/landmarks/${id}`,
    { headers: getAuthHeaders() }
  );
  return res.data;
};

// 특산물 미션 목록 조회
export const fetchSpecialtyMissions = async () => {
  const res = await axios.get(`${API_BASE}/api/missions/region/specialties`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
// 특산물 미션 상세 조회 (단건)
export const fetchSpecialtyMissionDetail = async (id) => {
  const res = await axios.get(
    `${API_BASE}/api/missions/region/specialties/${id}`,
    { headers: getAuthHeaders() }
  );
  return res.data;
};

// 미션 시작
export const startMission = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/missions/${id}/start`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// 미션 완료
export const completeMission = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/missions/${id}/complete`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// 미션 포기
export const abandonMission = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/missions/${id}/abandon`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};