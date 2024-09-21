import mem from '../../images/mem.gif'
import {useEffect} from "react";

export default function ActiveTask({
    activeTask,
    onCancelTask,
    onStartTask,
    onPauseTask,
    isLoggedIn,
    getActiveTask
}) {
    useEffect(() => {
        const interval = setInterval(() => {
            if (isLoggedIn) {
                getActiveTask();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="active_task">
            <p className="active_task__text">Активное задание</p>
            {Object.keys(activeTask).length === 0 ? (
                <>
                    <p className="active_task__text">Нет активного задания</p>
                    <img className="active_task__gif" src={mem} alt=""></img>
                </>
            ) : (
                <>
                    <table className="active_task__table">
                        <tbody className="active_task__table_body">
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Статус</td>
                            <td className={`active_task__info_text ${activeTask.status === 'paused' ? 'active_task__info_text_paused' : 'active_task__info_text_active'}`}>{activeTask.status.toUpperCase()}</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Создано</td>
                            <td className="active_task__info_text">{(new Date(activeTask.created_at).toLocaleString())}</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Общая сумма</td>
                            <td className="active_task__info_text">{activeTask.total_withdrawal_amount.toLocaleString()} руб.</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Сумма заявки</td>
                            <td className="active_task__info_text">от {activeTask.min_withdrawal_amount.toLocaleString()} до {activeTask.max_withdrawal_amount.toLocaleString()} руб.</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Способы</td>
                            <td className="active_task__info_text">{activeTask.payment_method.join(', ').toUpperCase()}</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Исключить Сбербанк</td>
                            <td className="active_task__info_text">{activeTask.exclude_sber ? 'Да' : 'Нет'}</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Взято</td>
                            <td className="active_task__info_text">{activeTask.withdrawals_taken}</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Взято на сумму</td>
                            <td className="active_task__info_text">{activeTask.withdrawals_taken_amount.toLocaleString()} руб.</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Пропущено</td>
                            <td className="active_task__info_text">{activeTask.missed_withdrawals}</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Пропущено на сумму</td>
                            <td className="active_task__info_text">{activeTask.missed_withdrawals_amount.toLocaleString()} руб.</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="active_task__buttons">
                        {activeTask.status === 'paused' ? (
                            <button className="active_task__button active_task__button__start" onClick={onStartTask}
                                    type="button">Старт</button>
                        ) : (
                            <button className="active_task__button active_task__button__pause" onClick={onPauseTask}
                                    type="button">Пауза</button>
                        )}
                        <button className="active_task__button active_task__button__cancel" onClick={onCancelTask}
                                type="button">Отменить
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}
