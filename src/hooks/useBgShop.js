import { useEffect, useState, useMemo } from "react";
import {
  getBackgroundCatalog,
  getMyBackgrounds,
  purchaseBackground,
  activateBackground,
} from "../api/background";
import { getBgImg } from "../data/imageMap";

export default function useBgShop() {
  const [items, setItems] = useState([]);   // [{id,name,price,owned,active,img}]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const [catalog, inventory] = await Promise.all([
        getBackgroundCatalog(),
        getMyBackgrounds(),
      ]);

      const invMap = new Map(inventory.map(i => [i.backgroundId, i]));
      setItems(
        catalog.map(c => {
          const inv = invMap.get(c.backgroundId);
          return {
            id: c.backgroundId,
            name: c.name,
            price: c.priceCoins,
            owned: inv?.owned ?? c.owned ?? false,
            active: inv?.active ?? c.active ?? false,
            img: getBgImg(c.backgroundId),
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

  const buy = async (id) => {
    const snapshot = items;
    setItems(prev => prev.map(v => v.id === id ? { ...v, owned: true } : v));
    try { await purchaseBackground(id); }
    catch (e) { setItems(snapshot); throw e; }
  };

  const activate = async (id) => {
    const snapshot = items;
    setItems(prev => prev.map(v => ({ ...v, active: v.id === id })));
    try { await activateBackground(id); }
    catch (e) { setItems(snapshot); throw e; }
  };

  const activeId = useMemo(
    () => items.find(v => v.active)?.id ?? null,
    [items]
  );

  const activeImg = useMemo(
    () => items.find(v => v.active)?.img ?? null,
    [items]
  );

  // 오버뷰에서 내려준 activeBackgroundId 동기화
  const applyActiveFromOverview = (id) => {
    if (id == null) return;
    setItems(prev => prev.map(v => ({ ...v, active: v.id === id })));
  };

  return { items, loading, error, reload: load, buy, activate, activeId, activeImg, applyActiveFromOverview };
}