
import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import DriverHome from "./Pages/DriverPanel/Home";
import CustomerHome from "./Pages/CustomerPanel/Home";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import AuthLayout from "./Layouts/AuthLayout";
import DriverPanelLayout from "./Layouts/DriverPanelLayout";
import CustomerPanelLayout from "./Layouts/CustomerPanelLayout";
import DriverProtectedRoute from "./Components/DriverProtectedRoute";
import CustomerProtectedRoute from "./Components/CustomerProtectedRoute";
import MyVehicle from "./Pages/DriverPanel/MyVehicle";

type Router = ReturnType<typeof createBrowserRouter>;

const router: Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    },
    {
        path: "/driver",
        element: <DriverProtectedRoute element={<DriverPanelLayout />} />,
        children: [
            {
                path: '',
                element: <DriverHome />
            },
            {
                path: 'my-vehicle',
                element: <MyVehicle />
            }
        ]
    },
    {
        path: "/customer",
        element: < CustomerProtectedRoute element={<CustomerPanelLayout />} />,
        children: [
            {
                path: '',
                element: <CustomerHome />
            }
        ]
    },
]);

export default router;