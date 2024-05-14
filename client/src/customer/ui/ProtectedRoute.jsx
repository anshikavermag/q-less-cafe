import Cookies from "universal-cookie";
import AppLayout from "./AppLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/user/userSlice";

function ProtectedRoute() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const token = cookies.get("TOKEN");

    useEffect(
        function () {
            if (token) {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                dispatch(updateUser(userInfo));
            } else {
                navigate("/login");
            }
        },
        [token, navigate, dispatch]
    );

    if (token) return <AppLayout />;
}

export default ProtectedRoute;
