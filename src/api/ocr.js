// 네이버 CLOVA OCR API
// 아직 백에 연동 안 해서 얘기 필요!
import axios from "axios";

export const scanReceipt = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const { data } = await axios.post(
    "https://naveropenapi.apigw.ntruss.com/vision/v1/receipt",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_CLOVA_KEY_ID,
        "X-NCP-APIGW-API-KEY": process.env.REACT_APP_CLOVA_KEY,
      },
    }
  );

  // OCR 결과에서 필요한 값 추출
  const store = data.images?.[0]?.receipt?.result?.store?.name?.text;
  const date = data.images?.[0]?.receipt?.result?.paymentInfo?.date?.text;
  const total = data.images?.[0]?.receipt?.result?.totalPrice?.price?.text;

  return { store, date, total };
};
