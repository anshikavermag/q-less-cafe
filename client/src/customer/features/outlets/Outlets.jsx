import { useLoaderData, useNavigation } from "react-router-dom";
import { getAllOutlets } from "./../../services/apiRestaurant";
import OutletsItem from "./OutletsItem";
import styles from "./Outlets.module.css";
import SpinnerFullPage from "../../ui/SpinnerFullPage";

function Outlets() {
    const outlets = useLoaderData();
    const navigation = useNavigation();

    if (navigation.state === "loading") return <SpinnerFullPage />;
    return (
        <div>
            <h2 className={styles.heading}>Menus</h2>
            <section className={styles.section}>
                <h3 className={styles.sub__heading}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M13 17L18 12L13 7"
                            stroke="#464646"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 17L11 12L6 7"
                            stroke="#464646"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>Choose Outlet</span>
                </h3>
                <div className={styles.list}>
                    {outlets.map((item) => (
                        <OutletsItem item={item} key={item._id} />
                    ))}
                </div>
            </section>
        </div>
    );
}

async function loader() {
    return await getAllOutlets();
}
export { loader };
export default Outlets;
