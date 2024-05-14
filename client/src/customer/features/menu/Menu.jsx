import { useLocation, useParams } from "react-router-dom";
import MenuItem from "./MenuItem";
import styles from "./Menu.module.css";
function Menu() {
    const menuData = useLocation();
    let menuOutletName = useParams();
    menuOutletName = menuOutletName.slug.split("-").join(" ");
    return (
        <div>
            <h1
                className={styles.outlet__name}
            >{`${menuOutletName}'s Menu`}</h1>
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
                    <span>Choose Item</span>
                </h3>
                <ul className={styles.menu__list}>
                    {menuData.state.menuItems.map((item) => (
                        <MenuItem item={item} key={item._id} />
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Menu;
