// src/components/Shop/DecoTab.jsx
import { useState } from "react";
import { DecoBox, DecoTabs, DecoTabBtn } from "../../styles/Shop/DecoTab.styles";
import { Panel } from "../../styles/Shop/Shop.styles";
import ItemGrid from "./ItemGrid";

export default function DecoTab({ coins, setCoins, bg, skin }) {
  const [tab, setTab] = useState("BACKGROUND"); // BACKGROUND | CHARACTER

  const { items: bgItems, buy: buyBg, activate: activateBg } = bg;
  const { items: skinItems, buy: buySkin, activate: activateSkin } = skin;


  const makeHandlers = (buyFn, activateFn) => ({
    onApply: async (id) => {
      try { await activateFn(id); } catch {}
    },
    onBuy: async (id, price) => {
      if (coins < price) return;
      setCoins(c => Math.max(0, c - price));
      try { await buyFn(id); }
      catch { setCoins(c => c + price); }
    },
  });

  const bgHandlers = makeHandlers(buyBg, activateBg);
  const skinHandlers = makeHandlers(buySkin, activateSkin);

  return (
    <Panel>
      <DecoBox>
        <DecoTabs>
          <DecoTabBtn $active={tab === "BACKGROUND"} onClick={() => setTab("BACKGROUND")}>
            배경
          </DecoTabBtn>
          <DecoTabBtn $active={tab === "CHARACTER"} onClick={() => setTab("CHARACTER")}>
            캐릭터
          </DecoTabBtn>
        </DecoTabs>

        {tab === "BACKGROUND" ? (
          <ItemGrid
            items={bgItems}
            type="bg"
            coins={coins}
            onApply={bgHandlers.onApply}
            onBuy={bgHandlers.onBuy}
          />
        ) : (
          <ItemGrid
            items={skinItems}
            type="char"
            coins={coins}
            onApply={skinHandlers.onApply}
            onBuy={skinHandlers.onBuy}
          />
        )}
      </DecoBox>
    </Panel>
  );
}