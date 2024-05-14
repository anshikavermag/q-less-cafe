import { useLoaderData, useNavigation } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import SpinnerFullPage from "../../ui/SpinnerFullPage";
import styles from "./Order.module.css";
import OrderItem from "./OrderItem";
import { formatCurrency } from "../../utils/helper";

function Order() {
    const orderData = useLoaderData();
    const navigation = useNavigation();
    if (navigation.state === "loading") return <SpinnerFullPage />;
    return (
        <div className={styles.order__container}>
            <header>
                <p>
                    Order #{orderData.order_number.toString().padStart(3, "0")}
                </p>
                <div>{orderData.status}</div>
            </header>
            <section>
                <header>
                    <div className={styles.left__details}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            style={{
                                stroke: "white",
                                strokeWidth: 2,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                            }}
                        >
                            <path
                                d="M14.5 2.5H6.5C5.96957 2.5 5.46086 2.71071 5.08579 3.08579C4.71071 3.46086 4.5 3.96957 4.5 4.5V20.5C4.5 21.0304 4.71071 21.5391 5.08579 21.9142C5.46086 22.2893 5.96957 22.5 6.5 22.5H18.5C19.0304 22.5 19.5391 22.2893 19.9142 21.9142C20.2893 21.5391 20.5 21.0304 20.5 20.5V8.5L14.5 2.5Z"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M14.5 2.5V8.5H20.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16.5 13.5H8.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16.5 17.5H8.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10.5 9.5H9.5H8.5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p>{orderData.customer_name}</p>
                    </div>
                    <div className={styles.right__details}>
                        <p>Contact: {orderData.customer_contact}</p>
                        <p>
                            {new Date(orderData.created_at)
                                .toGMTString()
                                .slice(5, 16)}
                        </p>
                    </div>
                </header>
                <ul className={styles.order__item__details}>
                    {orderData.order_items.map((item) => (
                        <OrderItem item={item} key={item._id} />
                    ))}
                </ul>
                <div className={styles.total}>
                    <div>
                        <img src="/coin.png" />
                        <p>Total Bill</p>
                    </div>
                    <p>{formatCurrency(orderData.order_total)}</p>
                </div>
            </section>
        </div>
    );
}

async function loader({ params }) {
    return await getOrder(params.orderId);
}
export { loader };
export default Order;
