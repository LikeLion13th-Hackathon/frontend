import ItemCard from "./ItemCard";
import { GridWrapper } from "../../styles/Shop/DecoTab.styles";

export default function ItemGrid({ items = [], type, coins = 0, onApply, onBuy }) {
  const handleClick = async (item) => {
    if (item.disabled) return;

    if (item.owned) {
      await onApply?.(item.id);
      return;
    }

    if (!item.price || coins < item.price) return;
    await onBuy?.(item.id, item.price);
  };

  return (
    <GridWrapper>
      {items.map(item => (
        <ItemCard
          key={item.id}
          type={type}
          thumb={item.img}
          owned={!!item.owned}
          active={!!item.active}
          disabled={!!item.disabled}
          price={item.price || 0}
          onClick={() => handleClick(item)}
        />
      ))}
    </GridWrapper>
  );
}