import axios from "axios";

export const checkReceiptOCR = async (missionId, receiptId) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/receipt/${missionId}/${receiptId}/ocr`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
