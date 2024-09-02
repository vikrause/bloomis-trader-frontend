import {Link} from "react-router-dom";


export default function Header(props) {
    return (
        <header className="header">
            <p className="header__name">bloomis trader bot</p>
            {props.isLoggedIn &&
                <div className="header__links">
                    <Link to="/history" className="header__link">История задач</Link>
                    <Link to="/" className="header__link" type="button" onClick={props.onClick}>Выход</Link>
                </div>
            }

        </header>

    )
}