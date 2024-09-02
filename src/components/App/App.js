import Login from "../Login/Login";
import Main from "../Main/Main";
import {Route, Routes, useNavigate} from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import React, {useEffect, useState} from "react";
import Header from "../Header/Header";
import {ReactNotifications, Store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import api from "../../api/Api";

function App() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dataActiveTask, setDataActiveTask] = useState({});

    async function login(username, password) {
        try {
            const userData = await api.loginUser(username, password)
            if (userData) {
                localStorage.setItem("jwt", userData.token);
                api.setHeadersAuth(userData.token);
                setIsLoggedIn(true);
                navigate("/");
            }
        } catch (errorResponse) {
            console.log(errorResponse);
            dispatchErrorNotification(errorResponse.message);
        }
    }

    async function getToken() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            try {
                const token = await api.getToken(jwt);
                if (token) {
                    api.setHeadersAuth(jwt);
                    setIsLoggedIn(true);
                    getActiveTask();
                }
            } catch (errorResponse) {
                validateError(errorResponse);
            }
        }
    }

    useEffect(() => {
        getToken();
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    async function createTask(
        totalWithdrawalAmount,
        minWithdrawalAmount,
        maxWithdrawalAmount,
        paymentMethod
    ) {
        try {
            const dataTask = await api.createTask(
                totalWithdrawalAmount,
                minWithdrawalAmount,
                maxWithdrawalAmount,
                paymentMethod
            )
            if (dataTask) {
                getActiveTask();
                return dataTask;
            }
        } catch (errorResponse) {
            validateError(errorResponse);
        }
    }

    function validateError(err) {
        err.then((err) => {
            if (err.code === 401) {
                signOut();
                dispatchErrorNotification(err.message);
            } else {
                dispatchErrorNotification(err.detail);
            }
        });
    }

    function dispatchErrorNotification(message) {
        Store.addNotification({
            title: "Ошибка!",
            message: message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    async function getActiveTask() {
        try {
            const dataTask = await api.getActiveTask();
            if (dataTask) {
                setDataActiveTask({
                    "status": dataTask.status,
                    "created_at": dataTask.created_at,
                    "total_withdrawal_amount": dataTask.total_withdrawal_amount,
                    "min_withdrawal_amount": dataTask.min_withdrawal_amount,
                    "max_withdrawal_amount": dataTask.max_withdrawal_amount,
                    "payment_method": dataTask.payment_method,
                    "withdrawals_taken": dataTask.withdrawals_taken,
                    "withdrawals_taken_amount": dataTask.withdrawals_taken_amount
                });
            }
        } catch (errorResponse) {
            setDataActiveTask({});
            if (errorResponse.status === 401) {
                signOut();
            }
        }
    }

    async function cancelActiveTask() {
        try {
            const dataTask = await api.cancelTask();
            if (dataTask) {
                setDataActiveTask({});
            }
        } catch (errorResponse) {
            validateError(errorResponse);
        }
    }

    async function startActiveTask() {
        try {
            const dataTask = await api.startTask();
            if (dataTask) {
                getActiveTask();
            }
        } catch (errorResponse) {
            validateError(errorResponse);
        }
    }

    async function pauseActiveTask() {
        try {
            const dataTask = await api.pauseTask();
            if (dataTask) {
                getActiveTask();
            }
        } catch (errorResponse) {
            validateError(errorResponse);
        }
    }

    function signOut() {
        setIsLoggedIn(false);
        localStorage.removeItem("jwt");
        api.setHeadersAuth("");
        navigate("/login");
    }

    return (
        <div className="page">
            <ReactNotifications/>
            <Header
                isLoggedIn={isLoggedIn}
                onClick={signOut}
            />
            <Routes>
                <Route path="/login" element={
                    <Login onLogin={login}/>
                }/>
                <Route exact path='/' element={
                    <ProtectedRoute
                        component={Main}
                        isLoggedIn={isLoggedIn}
                        onCreateTask={createTask}
                        onCancelTask={cancelActiveTask}
                        onStartTask={startActiveTask}
                        onPauseTask={pauseActiveTask}
                        activeTask={dataActiveTask}
                        getActiveTask={getActiveTask}
                    />
                }/>
            </Routes>
        </div>
    );
}

export default App;
