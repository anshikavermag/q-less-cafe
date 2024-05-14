import styles from "./CreateOrder.module.css";
import { useSelector } from "react-redux";
import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
import { clearCart } from "../cart/CartSlice";

function CreateOrder() {
    const { name } = useSelector((store) => store.user.info);
    const cart = useSelector((store) => store.cart.cart);
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div>
            <h2 className={styles.user__identity}>Your Details</h2>
            <Form className={styles.user__detail} method="POST">
                <div className={styles.input__container}>
                    <div className={styles.rows}>
                        <label>First Name</label>
                        <input
                            type="text"
                            defaultValue={name}
                            required
                            name="customer_name"
                        />
                    </div>
                    <div className={styles.rows}>
                        <label>Phone number</label>
                        <input type="tel" required name="customer_contact" />
                    </div>
                </div>
                <div className={styles.button__container}>
                    <button className="btn" disabled={isSubmitting}>
                        {isSubmitting ? "Preparing..." : "Order Now"}
                    </button>
                    <button
                        className="btn btn__back"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        Back
                    </button>
                </div>
                <input
                    type="hidden"
                    value={JSON.stringify(cart)}
                    name="order_items"
                />
            </Form>
        </div>
    );
}
async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    delete data.dispatch;
    const order = {
        ...data,
        order_items: JSON.parse(data.order_items),
        created_at: new Date().toISOString(),
        status: "new",
        order_number: Math.floor(Math.random() * 1000),
        cooking_time: JSON.parse(data.order_items).reduce(
            (acc, item) => Math.max(acc, item.cooking_time),
            0
        ),
        order_total: JSON.parse(data.order_items).reduce(
            (acc, item) => acc + item.totalPrice,
            0
        ),
    };
    const newOrder = await createOrder(order);
    store.dispatch(clearCart());
    return redirect(`/order/${newOrder._id}`);
}
export { action };

export default CreateOrder;
