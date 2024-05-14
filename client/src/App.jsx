import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu from "./customer/features/menu/Menu";
import Cart from "./customer/features/cart/Cart";
import Order from "./customer/features/order/Order";
import CreateOrder from "./customer/features/order/CreateOrder";
import Outlets from "./customer/features/outlets/Outlets";
import AppLayout from "./customer/ui/AppLayout";
import Home from "./customer/ui/Home";
import { loader as outletsLoader } from "./customer/features/outlets/Outlets";
import { loader as orderLoader } from "./customer/features/order/Order";
import { action as orderAction } from "./customer/features/order/CreateOrder";
import ErrorMessage from "./customer/ui/ErrorMessage";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorMessage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/outlets",
                element: <Outlets />,
                loader: outletsLoader,
                errorElement: <ErrorMessage />,
            },
            {
                path: "outlets/:slug/menu",
                element: <Menu />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/order/new",
                element: <CreateOrder />,
                action: orderAction,
            },
            {
                path: "/order/:orderId",
                element: <Order />,
                loader: orderLoader,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
