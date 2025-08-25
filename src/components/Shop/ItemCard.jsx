import { LockKeyhole } from 'lucide-react';
import { TbCoin } from "react-icons/tb";
import {
  ItemButton,
  Thumb,
  LockOverlay,
  ActiveOutline,
  ItemLabel,
  PriceRow,
  ItemWrapper
} from "../../styles/Shop/DecoTab.styles";

import { CoinIcon } from "../../styles/Shop/Shop.styles"

export default function ShopItemCard({
  type = "bg",               // 'bg' | 'char'
  thumb,                     // 썸네일 이미지 URL
  owned = false,             // 보유 여부
  active = false,            // 적용됨
  price = 0,                 // 가격
  disabled = false,          // Coming soon
  onClick,
}) {
  const showLock = !owned && !disabled;
  const showComing = disabled;
  const showOwnedText = owned;

  return (
    <ItemWrapper>
      <ItemButton
        $active={active}
        $disabled={disabled}
        onClick={disabled ? undefined : onClick}
      >
        <Thumb style={{ backgroundImage: `url(${thumb})` }} />
        {showLock && (
          <LockOverlay>
            <LockKeyhole size={18} color="#FFFFFF" />
            <span>코인으로 잠금해제</span>
          </LockOverlay>
        )}
        {showComing && (
          <LockOverlay style={{ opacity: 0.9 }}>
            <span>Coming soon !</span>
          </LockOverlay>
        )}
        {active && <ActiveOutline />}
      </ItemButton>

      <ItemLabel>
        {showOwnedText ? (
          "보유중"
        ) : (
          <PriceRow>
            <CoinIcon>
              <TbCoin size={16} />
            </CoinIcon>
            {price.toLocaleString()}
          </PriceRow>
        )}
      </ItemLabel>
    </ItemWrapper>
  );
}

