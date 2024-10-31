import {Link, useLocation} from "react-router-dom";

export default function SubHeader(){
    const location = useLocation();

    return (
       <section className="subHeader">
           <Link to="/priority" className={`header__link ${location.pathname === "/priority" ? "header__link_active" : ""}`}>Приоритет</Link>
           <Link to="/payments" className={`header__link ${location.pathname === "/payments" ? "header__link_active" : ""}`}>Платежи</Link>
           <Link to="/cards" className={`header__link ${location.pathname === "/cards" ? "header__link_active" : ""}`}>Карты</Link>

       </section>
    )
}