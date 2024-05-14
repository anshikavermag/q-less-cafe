import { useNavigate } from "react-router-dom";
import styles from "./OutletsItem.module.css";

function OutletsItem({ item }) {
    const navigate = useNavigate();
    return (
        <li
            className={styles.item}
            style={{
                backgroundImage: `url(${`/${item.image}`})`,
                backgroundColor: "lightgray",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <button
                className={styles.item__button}
                onClick={() =>
                    navigate(`${item.slug}/menu`, {
                        state: { menuItems: item.menu_items },
                    })
                }
            >
                {item.name}
            </button>
        </li>
    );
}

export default OutletsItem;
