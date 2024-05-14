import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
function Header() {
    const userName = useSelector((store) => store.user.userName);
    return (
        <nav className={styles.nav}>
            <Link to="/outlets" className={styles.logo}>
                <img
                    src="./../../images/home-black-small.png"
                    alt="logo"
                    className={styles.house}
                />
                <span className={styles.heading}>JU CAFETARIA</span>
            </Link>
            <SearchOrder />
            {userName !== "" ? (
                <p className={styles.username}>{userName}</p>
            ) : (
                <p className={styles.username}>User</p>
            )}
        </nav>
    );
}

export default Header;
