import Header from "../Header/Header";
import {Outlet, useLocation} from "react-router-dom";

export default function AppLayout({ onClick, isLoggedIn }) {
    return (
        <>
            <Header onClick={onClick} isLoggedIn={isLoggedIn} />
            <Outlet />
        </>
    )
}