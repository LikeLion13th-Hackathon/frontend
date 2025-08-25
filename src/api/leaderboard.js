import instance from "./axiosInstance";

export const getRanking = async () => {
  const { data } = await instance.get("/api/rankings/top100");
  return data;
};

export const getMyRanking = async (userId) => {
  const { data } = await instance.get("/api/rankings/top100", 
    {
      params: {userId}
    }
  );
  return data;
};