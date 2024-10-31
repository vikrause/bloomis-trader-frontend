import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import SubHeader from "../SubHeader/SubHeader";

export default function AppLayout({ onClick, isLoggedIn }) {
    return (
        <>
            <Header onClick={onClick} isLoggedIn={isLoggedIn} />
            <SubHeader/>
            <Outlet />
        </>
    )
}