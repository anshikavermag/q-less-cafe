import { formatCurrency } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import UpdateCart from "../cart/UpdateCart";
import styles from "./MenuItem.module.css";
import { addItem } from "../cart/CartSlice";
import { useParams } from "react-router-dom";
function MenuItem({ item }) {
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart.cart);
    const outlet_name = useParams();
    const itemInCart = cart.filter((cartEl) => cartEl._id === item._id);
    function handleClick() {
        const newItemInCart = {
            price: item.price,
            totalPrice: item.price,
            _id: item._id,
            quantity: 1,
            name: item.name,
            cooking_time: item.cooking_time,
            outlet_name: outlet_name.slug,
        };
        dispatch(addItem(newItemInCart));
    }

    return (
        <li className={styles.menu__item}>
            <div
                className={styles.image}
                style={{
                    backgroundImage: `url(${`/${item.image}`})`,
                    backgroundColor: "lightgray",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                }}
            >
                &nbsp;
            </div>

            <div className={styles.context}>
                <div className={styles.description}>
                    <p>{item.name}</p>
                    <p>{formatCurrency(item.price)}</p>
                </div>
                {itemInCart.length > 0 ? (
                    <UpdateCart item={itemInCart[0]} />
                ) : (
                    <button
                        className={`btn ${styles.add__btn}`}
                        onClick={handleClick}
                    >
                        Add To Cart
                    </button>
                )}
            </div>
        </li>
    );
}

export default MenuItem;
