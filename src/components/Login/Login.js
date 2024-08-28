import {useState} from "react";

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passInputType, setPassInputType] = useState("password");
    const [isPassVisible, setIsPassVisible] = useState(false);

    function handlePassVisibility() {
        if(isPassVisible) {
            setPassInputType("password");
        } else {
            setPassInputType("text");
        }

        setIsPassVisible(!isPassVisible);

    }


    function handleUsernameInput(e) {
        setUsername(e.target.value);
    }

    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(username, password);
    }

    return (
        <>
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input className="login__input" type="text" placeholder="Логин" value={username} onChange={handleUsernameInput} required/>
                    <div className="login__group">
                        <input className="login__input" type={passInputType} placeholder="Пароль" value={password} onChange={handlePasswordInput} maxLength={30} required/>
                        <span className={` ${isPassVisible ? `login__icon-pass` : `login__icon-notPass`}`} onClick={handlePassVisibility}></span>
                    </div>
                    <button className="login__button" type="submit">Войти</button>
                </form>
            </section>
        </>
    );
}
