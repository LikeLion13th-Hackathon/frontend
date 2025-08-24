// src/api/receipt.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// 영수증 업로드(등록)
export const uploadReceipt = async (missionId, file) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("로그인 토큰이 없습니다!");

  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    `${API_URL}/api/receipt/${missionId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// 영수증 이미지 전체 조회
export const getReceipts = async (missionId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("로그인 토큰이 없습니다!");

  const res = await axios.get(`${API_URL}/api/receipt/${missionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 영수증 이미지 조회
export const getReceiptFile = async (missionId, receiptId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("로그인 토큰이 없습니다!");

  const res = await axios.get(
    `${API_URL}/api/receipt/${missionId}/${receiptId}/file`,
    {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    }
  );
  return res.data;
};

// OCR 결과 반환
export const getReceiptOCR = async (missionId, receiptId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("로그인 토큰이 없습니다!");

  const res = await axios.post(
    `${API_URL}/api/receipt/${missionId}/${receiptId}/ocr`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
