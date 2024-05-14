import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import styles from "./CreateUser.module.css";

function CreateUser() {
    const [username, setUsername] = useState("");
    const name = useSelector((store) => store.user.userName);
    const dispatch = useDispatch();
    const navigation = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!username && !name) return;
        if (username) dispatch(updateName(username));
    }

    return (
        <div className={styles.right__Section}>
            <div className={styles.heading}>
                <h1>Welcome to Ju Cafetaria</h1>
                <h4>Skip the line, savor the taste</h4>
            </div>
            <div className={styles.line}>&nbsp;</div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p>👋 Welcome! Please start by telling us your name</p>
                {name === "" ? (
                    <input
                        type="text"
                        placeholder="Your full name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                ) : (
                    <button onClick={() => navigation("/outlets")}>
                        Start Ordering
                    </button>
                )}
            </form>
        </div>
    );
}

export default CreateUser;
