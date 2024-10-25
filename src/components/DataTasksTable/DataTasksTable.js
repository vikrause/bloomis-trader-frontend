import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';

export default function DataTasksTable(props) {
    const [tableData, setTableData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const getTaskList = useCallback(async (limit, offset) => {
        const data = await props.getTaskList(limit, offset);
        const preparedTableData = [];

        data.task_list.forEach(task => {
            preparedTableData.push({
                'id': task.id,
                'created_at': (new Date(task.created_at).toLocaleString()),
                'status': task.status.toUpperCase(),
                'total_withdrawal_amount': task.total_withdrawal_amount.toLocaleString() + ' ₽',
                'withdrawal_amount': task.min_withdrawal_amount.toLocaleString() + ' ₽ - ' + task.max_withdrawal_amount.toLocaleString() + ' ₽',
                'payment_method': task.payment_method.join(', ').toUpperCase(),
                'exclude_sber': task.exclude_sber ? 'Да' : 'Нет',
                'withdrawals_taken': task.withdrawals_taken,
                'withdrawals_taken_amount': task.withdrawals_taken_amount.toLocaleString() + ' ₽',
                'missed_withdrawals': task.missed_withdrawals,
                'missed_withdrawals_amount': task.missed_withdrawals_amount.toLocaleString(),
            });
        })

        setTotalRows(data.total_count)
        setTableData(preparedTableData);
    }, [props.getTaskList]);

    useEffect(() => {
        getTaskList(paginationModel.pageSize, paginationModel.page * paginationModel.pageSize);
    }, [paginationModel]);

    const columns = [
        {field: 'id', headerName: 'ID', width: 80},
        {field: 'created_at', headerName: 'Время создания', width: 170},
        {field: 'status', headerName: 'Статус', width: 110},
        {field: 'total_withdrawal_amount', headerName: 'Общая сумма', width: 130},
        {field: 'withdrawal_amount', headerName: 'Лимиты', width: 170},
        {field: 'payment_method', headerName: 'Способ', width: 160},
        {field: 'exclude_sber', headerName: 'Искл. Сбер', width: 90},
        {field: 'withdrawals_taken', headerName: 'Взято', width: 90},
        {field: 'withdrawals_taken_amount', headerName: 'Взято сумма', width: 110},
        {field: 'missed_withdrawals', headerName: 'Пропущено', width: 120},
        {field: 'missed_withdrawals_amount', headerName: 'Пропущено сумма', width: 150},
    ];

    return (

        <div style={{height: 600, width: '100%'}}>
            <DataGrid
                initialState={{
                    pagination: {
                        paginationModel: {pageSize: 25, page: 0},
                    },
                }}
                paginationMode="server"
                rowCount={totalRows}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rows={tableData}
                columns={columns}
            />
        </div>
    );
}
