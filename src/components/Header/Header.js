import {Link, useLocation} from "react-router-dom";


export default function Header(props) {
    const location = useLocation();
    return (
        <header className="header">
            <Link to="/" className="header__name">bloomis trader bot</Link>

            <div className="header__links">
                        <Link to="/" className={`header__link ${location.pathname === "/" ? "header__link_active" : ""}`}>Создать задачу</Link>
                        <Link to="/history" className={`header__link ${location.pathname === "/history" ? "header__link_active" : ""}`}>История задач</Link>

                <Link to="/login" className="header__link" type="button" onClick={props.onClick}>Выход</Link>
            </div>
        </header>

    )
}