import {useCallback, useEffect, useState} from "react";
import React from "react";

export default function CreateTask(props) {
    const [totalWithdrawalAmount, setTotalWithdrawalAmount] = useState('');
    const [minWithdrawalAmount, setMinWithdrawalAmount] = useState('');
    const [maxWithdrawalAmount, setMaxWithdrawalAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState([]);

    const [paymentMethodCheckboxState, setPaymentMethodCheckboxState] = useState({
        mobile: false,
        sbp: false,
        card: false,
    });

    const {mobile, sbp, card} = paymentMethodCheckboxState;

    const handleChange = (event) => {
        setPaymentMethodCheckboxState({
            ...paymentMethodCheckboxState,
            [event.target.value]: event.target.checked,
        });
    };

    useEffect(() => {
        const filteredPaymentMethods = Object.keys(paymentMethodCheckboxState).filter(function (key) {
            return paymentMethodCheckboxState[key]
        });
        setPaymentMethod(filteredPaymentMethods);
    }, [paymentMethodCheckboxState]);


    const onCreateTaskSubmit = useCallback(
        async (
            paymentMethod,
            totalWithdrawalAmount,
            minWithdrawalAmount,
            maxWithdrawalAmount
        ) => {
            const dataTask = await props.onCreateTask(
                totalWithdrawalAmount,
                minWithdrawalAmount,
                maxWithdrawalAmount,
                paymentMethod
            );
            if (dataTask) {
                setTotalWithdrawalAmount('');
                setMinWithdrawalAmount('');
                setMaxWithdrawalAmount('');
                setPaymentMethodCheckboxState({
                    mobile: false,
                    sbp: false,
                    card: false,
                })
            }
        }, [props.onCreateTask])

    function handleSubmit(e) {
        e.preventDefault();
        onCreateTaskSubmit(
            paymentMethod,
            totalWithdrawalAmount,
            minWithdrawalAmount,
            maxWithdrawalAmount
        );
    }

    return (
        <section className="create_task">
            <p className="create_task__text">Создать новую задачу</p>
            <form className="create_task__form" name="create_task" id="create_task" onSubmit={handleSubmit}>
                <div className="input__group">
                    <label className="create_task__label" htmlFor="create_task_total_withdrawal_amount">Общая сумма заявок</label>
                    <input className="create_task__input"
                           form="create_task"
                           id="create_task_total_withdrawal_amount"
                           name="total_withdrawal_amount"
                           type="number"
                           min="5000"
                           value={totalWithdrawalAmount || ''}
                           onChange={(e) => setTotalWithdrawalAmount(Number(e.target.value))}
                           required
                    />
                </div>
                <div className="input__group">
                    <label className="create_task__label" htmlFor="create_task_min_withdrawal_amount">Сумма заявки от</label>
                    <input className="create_task__input"
                           form="create_task"
                           id="create_task_min_withdrawal_amount"
                           name="min_withdrawal_amount"
                           type="number"
                           min="5000"
                           value={minWithdrawalAmount || ''}
                           onChange={(e) => setMinWithdrawalAmount(Number(e.target.value))}
                           required
                    />
                </div>
                <div className="input__group">
                    <label className="create_task__label" htmlFor="create_task_max_withdrawal_amount">Сумма заявки до</label>
                    <input className="create_task__input"
                           id="create_task_max_withdrawal_amount"
                           form="create_task"
                           name="max_withdrawal_amount"
                           value={maxWithdrawalAmount || ''}
                           min="5000"
                           onChange={(e) => setMaxWithdrawalAmount(Number(e.target.value))}
                           type="number"
                           required
                    />
                </div>
                <p className="create_task__methods__text">Методы</p>

                <div className="create_task__methods">
                    <div className="create_task__methods__items">
                        <input className="create_task__checkbox"
                               id="payment_method_sbp"
                               form="create_task"
                               name="payment_method"
                               value="sbp"
                               onChange={handleChange}
                               checked={sbp}
                               type="checkbox"
                        />
                        <label className="create_task__label" htmlFor="payment_method_sbp">СБП</label>
                    </div>
                    <div className="create_task__methods__items">
                        <input className="create_task__checkbox"
                               id="payment_method_mobile"
                               form="create_task"
                               name="payment_method"
                               value="mobile"
                               onChange={handleChange}
                               checked={mobile}
                               type="checkbox"
                        />
                        <label className="create_task__label" htmlFor="payment_method_mobile">Мобильный счет</label>
                    </div>
                    <div className="create_task__methods__items">
                        <input className="create_task__checkbox"
                               id="payment_method_card"
                               form="create_task"
                               name="payment_method"
                               value="card"
                               onChange={handleChange}
                               checked={card}
                               type="checkbox"
                        />
                        <label className="create_task__label" htmlFor="payment_method_card">Карта</label>
                    </div>
                </div>
                <button className="create_task__button" type="submit">Создать задачу</button>
            </form>
        </section>
    )
}