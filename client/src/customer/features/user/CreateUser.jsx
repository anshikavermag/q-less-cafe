import { useNavigate } from "react-router-dom";
import styles from "./CreateUser.module.css";

function CreateUser() {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className={styles.right__Section}>
            <div className={styles.heading}>
                <h1>Welcome to JU Cafeteria</h1>
                <h4>Skip the line, savor the taste</h4>
            </div>
            <div className={styles.line}>&nbsp;</div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p>👋 Welcome back! Let&apos;s order something delicious</p>
                <button onClick={() => navigate("/outlets")}>
                    Start Ordering
                </button>
            </form>
        </div>
    );
}

export default CreateUser;
