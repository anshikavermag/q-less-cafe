import CreateUser from "../features/user/CreateUser";
import styles from "./Home.module.css";
function Home() {
    return (
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
            <CreateUser />
        </div>
    );
}

export default Home;
