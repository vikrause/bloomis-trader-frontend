import Login from "../Login/Login";
import Main from "../Main/Main";
import {Route, Routes, useNavigate} from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute";
import React, {useEffect, useState} from "react";
import Header from "../Header/Header";
import {ReactNotifications, Store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import api from "../../api/Api";

function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [dataActiveTask, setDataActiveTask] = useState({});
    const [isDataActiveTask, setIsDataActiveTask] = useState(false);
    const [isActiveTaskPaused, setIsActiveTaskPaused] = useState(false);

    function validateError(err) {
        switch (err.status) {
            case 401:
                signOut();
                break;
            default:
                err.then((err) => {
                    dispatchErrorNotification(err.detail);
                });
                break;
        }
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

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            api.getToken(jwt).then((res) => {
                if (res) {
                    api.setHeadersAuth(jwt);
                    setLoggedIn(true);
                    getActiveTask();
                }
            }).catch((errorResponse) => {
                validateError(errorResponse);
            });
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn, navigate]);

    function login(username, password) {
        api.loginUser(username, password).then((res) => {
            localStorage.setItem("jwt", res.token);
            api.setHeadersAuth(res.token);
            setLoggedIn(true);
            navigate("/");
        }).catch((errorResponse) => {
            validateError(errorResponse);
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getActiveTask()
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    function getActiveTask() {
        api.getActiveTask().then((res) => {
            setDataActiveTask({
                "status": res.status,
                "created_at": res.created_at,
                "total_withdrawal_amount": res.total_withdrawal_amount,
                "min_withdrawal_amount": res.min_withdrawal_amount,
                "max_withdrawal_amount": res.max_withdrawal_amount,
                "payment_method": res.payment_method,
                "withdrawals_taken": res.withdrawals_taken,
                "withdrawals_taken_amount": res.withdrawals_taken_amount
            });

            setIsDataActiveTask(true);

            if (res.status === 'new' || res.status === 'processing') {
                setIsActiveTaskPaused(false);
            } else {
                setIsActiveTaskPaused(true);
            }
        }).catch((errorResponse) => {
            setIsDataActiveTask(false);
            if (errorResponse.status === 401) {
                signOut();
            }
        });
    }

    function cancelActiveTask() {
        api.cancelTask().then(() => {
            setIsDataActiveTask(false)
        }).catch((errorResponse) => {
            validateError(errorResponse);
        });
    }

    function startActiveTask() {
        api.startTask().then(() => {
            setIsDataActiveTask(true)
            setIsActiveTaskPaused(false);
            getActiveTask();
        }).catch((errorResponse) => {
            validateError(errorResponse);
        });
    }

    function pauseActiveTask() {
        api.pauseTask().then(() => {
            setIsDataActiveTask(true)
            setIsActiveTaskPaused(true);
            getActiveTask();
        }).catch((errorResponse) => {
            validateError(errorResponse);
        });
    }

    function clearCreateTaskForm() {

    }

    function createTask(totalWithdrawalAmount, minWithdrawalAmount, maxWithdrawalAmount, paymentMethod) {
        api.createTask(
            totalWithdrawalAmount,
            minWithdrawalAmount,
            maxWithdrawalAmount,
            paymentMethod
        ).then(() => {
            clearCreateTaskForm();
            getActiveTask();
        }).catch((errorResponse) => {
            validateError(errorResponse);
        });
    }

    function signOut() {
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        api.setHeadersAuth("");
        navigate("/login");
    }

    return (
        <div className="page">
            <ReactNotifications/>
            <Header
                loggedIn={loggedIn}
                onClick={signOut}
            />
            <Routes>
                <Route path="/login" element={
                    <Login onLogin={login}/>
                }/>
                <Route exact path='/' element={
                    <ProtectedRoute
                        component={Main}
                        loggedIn={loggedIn}
                        onCreateTask={createTask}
                        onCancelTask={cancelActiveTask}
                        onStartTask={startActiveTask}
                        onPauseTask={pauseActiveTask}
                        activeTask={dataActiveTask}
                        isDataActiveTask={isDataActiveTask}
                        isActiveTaskPaused={isActiveTaskPaused}
                    />
                }/>
            </Routes>
        </div>
    );
}

export default App;
