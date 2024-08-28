import {useState} from "react";

export default function CreateTask(props) {
    const [totalWithdrawalAmount, setTotalWithdrawalAmount] = useState('');
    const [minWithdrawalAmount, setMinWithdrawalAmount] = useState('');
    const [maxWithdrawalAmount, setMaxWithdrawalAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState([]);


    function handleTotalAmountInput(e) {
        setTotalWithdrawalAmount(Number(e.target.value));
    }

    function handleMinAmountInput(e) {
        setMinWithdrawalAmount(Number(e.target.value));
    }

    function handleMaxAmountInput(e) {
        setMaxWithdrawalAmount(Number(e.target.value));
    }

    function handleMethodCheckboxChange(e) {
        const checkedValue = e.target.value;

        if (e.target.checked){
            setPaymentMethod([...paymentMethod, checkedValue]);
        } else {
            setPaymentMethod(paymentMethod.filter(value => value !== checkedValue));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onCreateTask(totalWithdrawalAmount, minWithdrawalAmount, maxWithdrawalAmount, paymentMethod);
    }

    return (
        <section className="create_task">
            <p className="create_task__text">Создать новую задачу</p>
            <form className="create_task__form" name="create_task" id="create_task" onSubmit={handleSubmit}>
                <div className="input__group">
                    <label className="create_task__label" htmlFor="create_task">Общая сумма заявок</label>
                    <input className="create_task__input"
                           form="create_task"
                           name="total_withdrawal_amount"
                           type="number"
                           value={totalWithdrawalAmount}
                           onChange={handleTotalAmountInput}
                           required
                    />
                </div>
                <div className="input__group">
                    <label className="create_task__label" htmlFor="create_task">Сумма заявки от</label>
                    <input className="create_task__input"
                           form="create_task"
                           name="min_withdrawal_amount"
                           type="number"
                           value={minWithdrawalAmount}
                           onChange={handleMinAmountInput}
                           required
                    />
                </div>
                <div className="input__group">
                    <label className="create_task__label" htmlFor="create_task">Сумма заявки до</label>
                    <input className="create_task__input"
                           form="create_task"
                           name="max_withdrawal_amount"
                           value={maxWithdrawalAmount}
                           onChange={handleMaxAmountInput}
                           type="number" required
                    />
                </div>
                <p className="create_task__metods__text">Методы</p>

                <div className="create_task__metods">
                    <div className="create_task__metods__item">
                        <input className="create_task__checkbox"
                               form="create_task"
                               name="payment_method"
                               value="sbp"
                               onChange={handleMethodCheckboxChange}
                               type="checkbox"
                        />
                        <label className="create_task__label" htmlFor="create_task">СБП</label>
                    </div>
                    <div className="create_task__metods__item">
                        <input className="create_task__checkbox"
                               form="create_task"
                               name="payment_method"
                               value="mobile"
                               onChange={handleMethodCheckboxChange}
                               type="checkbox"
                        />
                        <label className="create_task__label" htmlFor="create_task">Мобильный счет</label>
                    </div>
                    <div className="create_task__metods__item">
                        <input className="create_task__checkbox"
                               form="create_task"
                               name="payment_method"
                               value="card"
                               onChange={handleMethodCheckboxChange}
                               type="checkbox"
                        />
                        <label className="create_task__label" htmlFor="create_task">Карта</label>
                    </div>
                </div>
                <button className="create_task__button" type="submit">Создать задачу</button>
            </form>
        </section>
    )
}