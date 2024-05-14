import styles from "./CartItem.module.css";
import UpdateCart from "./UpdateCart";
function CartItem({ cartItem }) {
  return (
    <li className={styles.cart__item}>
      <p>
        {cartItem.quantity}x {cartItem.name}
      </p>

      <UpdateCart item={cartItem} />
    </li>
  );
}

export default CartItem;
