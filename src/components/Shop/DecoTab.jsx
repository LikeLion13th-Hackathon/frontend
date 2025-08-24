// src/components/Shop/DecoTab.jsx
import { useState } from "react";
import { 
  DecoBox, 
  DecoTabs, 
  DecoTabBtn,
  Overlay,
  ModalBox,
  Text,
  Buttons,
  Primary,
  Secondary,
  Emoji,
} from "../../styles/Shop/DecoTab.styles";
import { Panel, CoinIcon } from "../../styles/Shop/Shop.styles";
import ItemGrid from "./ItemGrid";
import { TbCoin } from "react-icons/tb";

export default function DecoTab({ coins, setCoins, reloadCoins, bg, skin }) {
  const [tab, setTab] = useState("BACKGROUND"); // BACKGROUND | CHARACTER

  const { items: bgItems, buy: buyBg, activate: activateBg } = bg;
  const { items: skinItems, buy: buySkin, activate: activateSkin } = skin;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("confirm"); // confirm | success | error
  const [purchaseItem, setPurchaseItem] = useState(null); // { type:'bg'|'char', id, price }

  const openConfirm = (payload) => {
    setPurchaseItem(payload);
    setModalStep("confirm");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPurchaseItem(null);
  };

  const makeHandlers = (buyFn, activateFn, type) => ({
    onApply: async (id) => {
      try { await activateFn(id); } catch {}
    },
    onBuy: async (id, price) => {
      if (coins < price) {
        alert("코인이 부족합니다.")
        return;
      }
      openConfirm({ type, id, price });
    },
  });

  const bgHandlers = makeHandlers(buyBg, activateBg, "bg");
  const skinHandlers = makeHandlers(buySkin, activateSkin, "char");

  const confirmPurchase = async () => {
    if (!purchaseItem) return;
    const { type, id, price } = purchaseItem;
    const buyFn = type === "bg" ? buyBg : buySkin;

    setCoins(c => Math.max(0, c - price)); 
    try {
      await buyFn(id);
      reloadCoins?.();
      setModalStep("success");
    } catch {
      setCoins(c => c + price);
      setModalStep("error");
    }
  };

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

      {modalOpen && (
        <Overlay onClick={closeModal}>
          <ModalBox onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            {modalStep === "confirm" && (
              <>
                <Text>
                  <CoinIcon>
                    <TbCoin size={20} />
                  </CoinIcon>
                  <span>
                    {Number(purchaseItem?.price || 0).toLocaleString()} 코인으로 구매하시겠습니까?
                  </span>
                </Text>
                <Buttons>
                  <Primary onClick={confirmPurchase}>확인</Primary>
                  <Secondary onClick={closeModal}>취소</Secondary>
                </Buttons>
              </>
            )}

            {modalStep === "success" && (
              <>
                <Emoji>☺️</Emoji>
                <Text>구매가 완료되었습니다.</Text>
                <Buttons>
                  <Primary onClick={closeModal}>확인</Primary>
                </Buttons>
              </>
            )}

            {modalStep === "error" && (
              <>
                <Emoji>😵</Emoji>
                <Text>구매에 실패했습니다. 잠시 후 다시 시도해주세요.</Text>
                <Buttons>
                  <Primary onClick={closeModal}>확인</Primary>
                </Buttons>
              </>
            )}
          </ModalBox>
        </Overlay>
      )}
    </Panel>
  );
}