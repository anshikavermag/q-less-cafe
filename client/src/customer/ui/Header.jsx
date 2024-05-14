import { Link, useNavigate } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { deleteUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/CartSlice";

function Header() {
    const userInfo = useSelector((store) => store.user.info);
    const cookies = new Cookies();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogOut() {
        cookies.remove("TOKEN", {
            path: "/",
        });
        localStorage.removeItem("userInfo");
        dispatch(deleteUser());
        dispatch(clearCart());
        navigate("/login");
    }

    return (
        <nav className={styles.nav}>
            <Link to="/outlets" className={styles.logo}>
                <img
                    src="/home-black-small.png"
                    alt="logo"
                    className={styles.house}
                />
                <span className={styles.heading}>JU CAFETARIA</span>
            </Link>
            <SearchOrder />
            {userInfo ? (
                <div className={styles.navRight}>
                    <p className={styles.username}>{userInfo.name}</p>
                    <button onClick={handleLogOut}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            />
                        </svg>
                    </button>
                </div>
            ) : (
                <p className={styles.username}>User</p>
            )}
        </nav>
    );
}

export default Header;
