import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import styles from "./AppLayout.module.css";
import CartOverview from "../features/cart/CartOverview";
import Spinner from "./Spinner";

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div>
            <Header />
            <main className={styles.main}>
                {!isLoading ? <Outlet /> : <Spinner></Spinner>}
            </main>
            <CartOverview />
        </div>
    );
}
export default AppLayout;
