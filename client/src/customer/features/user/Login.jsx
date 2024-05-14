import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "./userSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateUser.module.css";
import { login } from "../../services/apiRestaurant";
import Cookies from "universal-cookie";

function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookies = new Cookies();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await login({
            email,
            password,
        });

        if (result.status === "fail") {
            setIsSubmitting(false);
            return;
        }

        // setting cookies
        cookies.set("TOKEN", result.token, {
            path: "/",
        });

        // storing User info to localStorage
        localStorage.setItem("userInfo", JSON.stringify(result.data));

        dispatch(updateUser(result.data));
        setIsSubmitting(false);
        navigate("/");
    }

    return (
        <div className={styles.right__Section}>
            <div className={styles.heading}>
                <h1>Login</h1>
            </div>
            <div className={styles.line}>&nbsp;</div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div>
                    <Link
                        style={{
                            color: "var(--Primary-800, #984014)",
                            fontFamily: "Poppins",
                            fontSize: "1.125rem",
                            fontStyle: "normal",
                            fontWeight: "500",
                            lineHeight: "normal",
                            textUnderlineOffset: ".25rem",
                            paddingTop: ".5rem",
                        }}
                        to="/signup"
                    >
                        Create account
                    </Link>
                    <button disabled={isSubmitting}>Sign in</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
