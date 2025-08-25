import { useEffect, useState } from "react";
import {
  getSkinCatalog,
  getMySkins,
  purchaseSkin,
  activateSkin,
} from "../api/character";
import { getCharImg, getCharTitle } from "../data/imageMap";

export default function useCharShop() {
  const [items, setItems] = useState([]);   // [{id,name,price,owned,active,img}]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const [catalog, inventory] = await Promise.all([
        getSkinCatalog(),
        getMySkins(),
      ]);

      const invMap = new Map(inventory.map(i => [i.skinId, i]));

      setItems(
        catalog.map(c => {
          const inv = invMap.get(c.skinId);
          return {
            id: c.skinId,
            name: c.name,
            title: getCharTitle(c.skinId, 1),
            price: c.priceCoins,
            owned: inv?.owned ?? c.owned ?? false,
            active: inv?.active ?? c.active ?? false,
            img: getCharImg(c.skinId, 1),
          };
        })
      );
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // 구매 (성공 후에만 목록 갱신)
  const buy = async (id) => {
    try {
      await purchaseSkin(id);
      await load();
    } catch (e) {
      console.error("구매 실패", e);
      throw e;
    }
  };

  // 활성화 (성공 후에만 목록 갱신)
  const activate = async (id) => {
    try {
      await activateSkin(id);
      await load();
    } catch (e) {
      console.error("활성화 실패", e);
      throw e;
    }
  };

  const activeId = items.find((v) => v.active)?.id ?? null;

  return { items, loading, error, reload: load, buy, activate, activeId };
}