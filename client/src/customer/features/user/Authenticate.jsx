import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Header from "../../ui/Header";
import styles from "./Authenticate.module.css";
import Cookies from "universal-cookie";
import { useEffect } from "react";

function Authenticate() {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const isLoading = navigation.state === "loading";

    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    useEffect(
        function () {
            if (token) return navigate("/");
        },
        [token, navigate]
    );

    isLoading && <Spinner></Spinner>;

    return (
        <div>
            <Header />
            <main className={styles.main}>
                <div id={styles.homePage}>
                    <div className={styles.left__Section}>
                        <img src="/hero-img.png" alt="hero" />
                        <div className={styles.logo_text}>
                            <p>powered by</p>
                            <div className={styles.logo}>
                                <img
                                    src="/Logo.png"
                                    alt="logo"
                                    height="3.75rem"
                                    width="2.75rem"
                                />
                                <p>Q-Less</p>
                            </div>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Authenticate;
