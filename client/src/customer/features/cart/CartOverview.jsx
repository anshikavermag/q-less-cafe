import { Link } from "react-router-dom";
import styles from "./CartOverview.module.css";
import { useSelector } from "react-redux";
import { formatCurrency } from "./../../utils/helper";

function CartOverview() {
    const cartState = useSelector((store) => store.cart.cart);
    if (cartState.length === 0) {
        return null;
    }
    const totalItems = cartState.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartState.reduce(
        (acc, item) => acc + item.totalPrice,
        0
    );
    return (
        <footer className={styles.container}>
            <div className={styles.item__info}>
                <p>{totalItems} items</p>
                <p>{formatCurrency(totalPrice)}</p>
            </div>
            <Link
                style={{
                    color: "var(--Primary-800, #984014)",
                    fontFamily: "Poppins",
                    fontSize: "1.125rem",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                    textDecoration: "none",
                }}
                to="/cart"
            >
                Open Cart &rarr;
            </Link>
        </footer>
    );
}

export default CartOverview;
