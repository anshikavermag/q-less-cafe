import { formatCurrency } from "../../utils/helper";
import styles from "./OrderItem.module.css";
function OrderItem({ item }) {
  return (
    <li className={styles.item}>
      <p style={{ display: "flex", gap: ".5rem" }}>
        <span>{`${item.quantity}x`}</span>
        <span>{`${item.name}`}</span>
      </p>
      <p>{formatCurrency(item.price * item.quantity)}</p>
    </li>
  );
}

export default OrderItem;
