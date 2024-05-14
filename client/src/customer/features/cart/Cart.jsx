import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { formatCurrency } from "../../utils/helper";
import { clearCart } from "./CartSlice";

function Cart() {
    const cart = useSelector((store) => store.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector((store) => store.user.userName);

    if (!cart.length)
        return (
            <div
                style={{
                    marginTop: "4rem",
                    display: "grid",
                    justifyItems: "center",
                }}
            >
                <p
                    style={{
                        fontFamily: "Poppins",
                        fontSize: "1.125rem",
                        fontStyle: "normal",
                        fontWeight: "500",
                    }}
                >
                    Empty cart!
                </p>
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
                    to="/outlets"
                >
                    ← Back To Outlets
                </Link>
            </div>
        );

    const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    const cooking_time = cart.reduce(
        (acc, item) => Math.max(acc, item.cooking_time),
        0
    );
    return (
        <div>
            <h1 className={styles.header}>Your Cart, {userName}</h1>
            <section className={styles.cart__list__section}>
                <div className={styles.table}>
                    <ul className={styles.list}>
                        {cart.map((item) => (
                            <CartItem cartItem={item} key={item._id} />
                        ))}
                    </ul>
                    <section className={styles.section__total}>
                        <div className={styles.totals}>
                            <p className={styles.bills__text}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                >
                                    <path
                                        d="M12.5 22.5C18.0228 22.5 22.5 18.0228 22.5 12.5C22.5 6.97715 18.0228 2.5 12.5 2.5C6.97715 2.5 2.5 6.97715 2.5 12.5C2.5 18.0228 6.97715 22.5 12.5 22.5Z"
                                        stroke="#7B3713"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15.5 9.5H9.5V15.5H15.5V9.5Z"
                                        stroke="#7B3713"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span>Total Bills</span>
                            </p>
                            <p>{formatCurrency(totalPrice)}</p>
                        </div>
                        <div className={styles.time}>
                            <p className={styles.time__text}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                >
                                    <path
                                        d="M12.5 22.5C18.0228 22.5 22.5 18.0228 22.5 12.5C22.5 6.97715 18.0228 2.5 12.5 2.5C6.97715 2.5 2.5 6.97715 2.5 12.5C2.5 18.0228 6.97715 22.5 12.5 22.5Z"
                                        stroke="#7B3713"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12.5 6.5V12.5L16.5 14.5"
                                        stroke="#7B3713"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span>Estimated Time</span>
                            </p>
                            <p>{cooking_time} min</p>
                        </div>
                    </section>
                </div>
            </section>
            <div className={styles.btn__container}>
                <button onClick={() => navigate("/order/new")} className="btn">
                    Order
                </button>
                <button
                    onClick={() => dispatch(clearCart())}
                    className={`btn ${styles.btn__clear}`}
                >
                    Clear Cart
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className={`btn ${styles.btn__clear}`}
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default Cart;
