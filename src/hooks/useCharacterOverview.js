import { useEffect, useMemo, useState } from "react";
import { getShopOverview, updateCharacterName } from "../api/shop";
import { getCharImg, getCharTitle } from "../data/imageMap";

export default function useCharacterOverview() {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const [displayName, setDisplayName] = useState("");
  const [characterId, setCharacterId] = useState(null);
  const [level, setLevel] = useState(null);
  const [feedProgress, setFeedProgress] = useState(null);
  const [feedsRequiredToNext, setFeedsReq] = useState(null);

  // 오버뷰가 주는 배경 활성화 id
  const [activeBackgroundId, setActiveBackgroundId] = useState(null);

  const img   = useMemo(
    () => (characterId != null && level != null) ? getCharImg(characterId, level) : null,
    [characterId, level]
  );
  const title = useMemo(
    () => (characterId != null && level != null) ? getCharTitle(characterId, level) : "",
    [characterId, level]
  );
  
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const ov = await getShopOverview();
      const ch = ov?.character ?? {};

      if (ch.displayName != null) setDisplayName(ch.displayName);
      if (ch.skinId != null) setCharacterId(ch.skinId);
      if (ch.level != null) setLevel(ch.level);
      if (ch.feedProgress != null) setFeedProgress(ch.feedProgress);
      if (ch.feedsRequiredToNext != null) setFeedsReq(ch.feedsRequiredToNext);
      if (ch.activeBackgroundId != null) setActiveBackgroundId(ch.activeBackgroundId);

      return ov;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // 닉네임 변경
  const setName = async (nextName) => {
    const trimmed = (nextName ?? "").trim();
    if (!trimmed) return;
    const res = await updateCharacterName(trimmed);
    setDisplayName(res?.displayName ?? trimmed);
    return res;
  };

  return {
    name: displayName, setName,
    characterId, setCharacterId,
    level, setLevel,
    feedProgress, setFeedProgress,
    feedsRequiredToNext, setFeedsRequiredToNext: setFeedsReq,
    img, title,
    activeBackgroundId,
    loading, error, reload: load,
  };
}