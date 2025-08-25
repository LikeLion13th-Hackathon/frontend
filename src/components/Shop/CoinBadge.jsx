import { Badge, CoinIcon, Amount } from "../../styles/Shop/Shop.styles";
import { TbCoin } from "react-icons/tb";

export default function CoinBadge({ coin }) {
  return (
    <Badge>
      <CoinIcon>
        <TbCoin size={20} />
      </CoinIcon>
      <Amount>{coin.toLocaleString()}</Amount>
    </Badge>
  );
}