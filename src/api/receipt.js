import axios from "axios";

export const uploadReceipt = async (missionId, file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/receipt/${missionId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
