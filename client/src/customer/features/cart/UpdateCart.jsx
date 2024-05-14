import { useDispatch } from "react-redux";
import styles from "./UpdateCart.module.css";
import { decreaseQuantity, deleteItem, increaseQuantity } from "./CartSlice";

function UpdateCart({ item }) {
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.change__items__quantity}>
                <button
                    className="btn"
                    onClick={() => dispatch(decreaseQuantity(item._id))}
                >
                    -
                </button>
                <p>{item.quantity}</p>
                <button
                    className="btn"
                    onClick={() => dispatch(increaseQuantity(item._id))}
                >
                    +
                </button>
            </div>
            <button
                className={`${styles.del__button} btn`}
                onClick={() => dispatch(deleteItem(item._id))}
            >
                Delete
            </button>
        </div>
    );
}

export default UpdateCart;
