import instance from "./axiosInstance";

// 영수증 업로드(등록)
export const uploadReceipt = async (missionId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await instance.post(`/api/receipt/${missionId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// 영수증 이미지 전체 조회
export const getReceipts = async (missionId) => {
  const { data } = await instance.get(`/api/receipt/${missionId}`);
  return data;
};

// 영수증 이미지 조회 (blob)
export const getReceiptFile = async (missionId, receiptId) => {
  const { data } = await instance.get(
    `/api/receipt/${missionId}/${receiptId}/file`,
    { responseType: "blob" }
  );
  return data;
};

// OCR 결과 반환
export const getReceiptOCR = async (missionId, receiptId) => {
  const { data } = await instance.post(
    `/api/receipt/${missionId}/${receiptId}/ocr`
  );
  return data;
};
