export default function ActiveTask({activeTask, isDataActiveTask}) {

    return (
        <section className="active_task">
            <p className="active_task__text">Активное задание</p>
            {!isDataActiveTask &&
                <p className="active_task__text">Нет активного задания</p>
            }
            {isDataActiveTask &&
                <>
                    <table className="active_task__table">
                        <tbody className="active_task__table_body">
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Статус</td>
                            <td className="active_task__info_text">{activeTask.status.toUpperCase()}</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Создано</td>
                            <td className="active_task__info_textt">{(new Date(activeTask.created_at).toLocaleString())}</td>
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
                            <td className="active_task__info_text">Заявок взято</td>
                            <td className="active_task__info_text">{activeTask.withdrawals_taken}</td>
                        </tr>
                        <tr className="active_task__table_row">
                            <td className="active_task__info_text">Заявок взято на сумму</td>
                            <td className="active_task__info_text">{activeTask.withdrawals_taken_amount.toLocaleString()} руб.</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="active_task__buttons">
                        <button className="active_task__button active_task__button__start" type="button">Старт</button>
                        <button className="active_task__button active_task__button__pause" type="button">Пауза</button>
                        <button className="active_task__button active_task__button__cancel" type="button">Отменить
                        </button>
                    </div>
                </>
            }
        </section>
    )
}