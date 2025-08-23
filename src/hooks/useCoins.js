import { useEffect, useState } from "react";
import { getCoins } from "../api/shop";

export default function useCoins() {
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getCoins();
      setCoins(data.balance);
    } catch (e) {
      console.error("코인 불러오기 실패", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { coins, setCoins, reload: load, loading };
}