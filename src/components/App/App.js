import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import React, {useCallback, useEffect, useState} from "react";
import {ReactNotifications, Store} from 'react-notifications-component'

import 'react-notifications-component/dist/theme.css'
import api from "../../api/Api";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


import Login from "../Login/Login";
import Main from "../Main/Main";
import HistoryTasks from "../HistoryTasks/HistoryTasks";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AppLayout from "../AppLayout/AppLayout";
import {createTheme, ThemeProvider} from "@mui/material";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dataActiveTask, setDataActiveTask] = useState({});
    const [currentUser, setCurrentUser] = React.useState({});

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const navigate = useNavigate();

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
            dispatchErrorNotification(errorResponse.message);
        }
    }

    const getToken = useCallback(async () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            try {
                const userData = await api.checkToken(jwt);
                if (userData) {
                    api.setHeadersAuth(jwt);
                    setCurrentUser(userData);
                    setIsLoggedIn(true);
                    getActiveTask();
                    navigate("/")
                }
            } catch (errorResponse) {
                validateError(errorResponse);
            }
        }
    }, [])

    useEffect(() => {
        getToken();
    }, [isLoggedIn, getToken]);


    async function createTask(
        totalWithdrawalAmount,
        minWithdrawalAmount,
        maxWithdrawalAmount,
        paymentMethod,
        excludeSber
    ) {
        try {
            const dataTask = await api.createTask(
                totalWithdrawalAmount,
                minWithdrawalAmount,
                maxWithdrawalAmount,
                paymentMethod,
                excludeSber
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
                    "exclude_sber": dataTask.exclude_sber,
                    "withdrawals_taken": dataTask.withdrawals_taken,
                    "withdrawals_taken_amount": dataTask.withdrawals_taken_amount,
                    "missed_withdrawals": dataTask.missed_withdrawals,
                    "missed_withdrawals_amount": dataTask.missed_withdrawals_amount,
                });
            }
        } catch (errorResponse) {
            setDataActiveTask({});
            if (errorResponse.status === 401) {
                signOut();
            }
        }
    }

    async function getTaskList(limit, offset) {
        try {
            return await api.getTaskList(limit, offset);
        } catch (errorResponse) {
            validateError(errorResponse);
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
        setCurrentUser({});
        localStorage.removeItem("jwt");
        api.setHeadersAuth("");
        navigate("/login");
    }

    return (

        <ThemeProvider theme={darkTheme}>
            <div className="app">
                <ReactNotifications/>
                <CurrentUserContext.Provider value={currentUser}>

                    <Routes>
                        <Route path="/"
                               element={
                                   <AppLayout
                                       isLoggedIn={isLoggedIn}
                                       onClick={signOut}
                                   />
                               }
                        >
                            <Route index
                                   element={
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
                                   }
                            />
                            <Route path='/history'
                                   element={
                                       <ProtectedRoute
                                           component={HistoryTasks}
                                           isLoggedIn={isLoggedIn}
                                           getTaskList={getTaskList}
                                       />
                                   }
                            />
                        </Route>
                        <Route path="/login"
                               element={
                                   <Login onLogin={login}/>
                               }
                        />
                    </Routes>
                </CurrentUserContext.Provider>
            </div>
        </ThemeProvider>

    );
}

export default App;
