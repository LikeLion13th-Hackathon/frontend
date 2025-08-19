import { Badge, CoinIcon, Amount } from "../../styles/Shop.styles";
import { TbCoin } from "react-icons/tb";

export default function CoinBadge({ coin }) {
  return (
    <Badge>
      <CoinIcon>
        <TbCoin size={20} color="#FACD2B" />
      </CoinIcon>
      <Amount>{coin.toLocaleString()}</Amount>
    </Badge>
  );
}