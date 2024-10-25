import {Link, useLocation} from "react-router-dom";


export default function Header(props) {
    const location = useLocation();
    return (
        <header className="header">
            <Link to="/" className="header__name">bloomis trader bot</Link>

            <div className="header__links">
                {location.pathname === "/history" &&
                    <>
                        <Link to="/" className="header__link" type="button">Создать задачу</Link>
                        <Link to="/priority" className="header__link">Приоритет</Link>
                    </>
                }
                {location.pathname === "/priority" &&
                    <>
                        <Link to="/history" className="header__link">История задач</Link>
                        <Link to="/" className="header__link" type="button">Создать задачу</Link>
                    </>
                }
                {location.pathname === "/" &&
                    <>
                        <Link to="/history" className="header__link">История задач</Link>
                        <Link to="/priority" className="header__link">Приоритет</Link>
                    </>
                }

                <Link to="/login" className="header__link" type="button" onClick={props.onClick}>Выход</Link>
            </div>
        </header>

    )
}