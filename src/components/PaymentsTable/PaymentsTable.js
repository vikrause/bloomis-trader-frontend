import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';

export default function PaymentsTable(props) {
    const [tableData, setTableData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 100,
        page: 0,
    });

    const getPaymentsList = useCallback(async (limit, offset) => {
        const data = await props.getPaymentsList(limit, offset);
        const preparedTableData = [];

        data.payment_list.forEach(payment => {
            preparedTableData.push({
                'id': payment.id,
                'payment_id': payment.payment_id,
                'user_id': payment.user_id,
                'amount': payment.amount.toLocaleString() + ' ₽',
                'card_number': payment.card_number,
                'creation_time': (new Date(payment.creation_time).toLocaleString()),
                'status': payment.status,
                'merchant_id': payment.merchant_id,
                'currency': payment.currency,
                'commission': payment.commission,
                'real_amount': payment.real_amount.toLocaleString() + ' ₽',
                'card_name': payment.card_name,
                'phone_number': payment.phone_number,
                'user_paid': payment.user_paid  ? 'Да' : 'Нет',
                'is_sbp': payment.is_sbp  ? 'Да' : 'Нет',
                'is_using_account_number': payment.is_using_account_number ? 'Да' : 'Нет',
                'trader_id': payment.trader_id,

            });
        })

        setTotalRows(data.total_count)
        setTableData(preparedTableData);
    }, [props.getPaymentsList]);

    useEffect(() => {
        getPaymentsList(paginationModel.pageSize, paginationModel.page * paginationModel.pageSize);
    }, [paginationModel]);

    const columns = [
        {field: 'payment_id', headerName: 'ID платежа', width: 120},
        {field: 'user_id', headerName: 'ID юзера', width: 120},
        {field: 'trader_id', headerName: 'Трейдер', width: 90},
        {field: 'amount', headerName: 'Сумма', width: 120},
        {field: 'card_number', headerName: 'Карта', width: 160},
        {field: 'creation_time', headerName: 'Создан', width: 170},
        {field: 'status', headerName: 'Статус', width: 80},
        {field: 'merchant_id', headerName: 'Мерчант', width: 140},
        {field: 'currency', headerName: 'Валюта', width: 90},
        {field: 'commission', headerName: 'Коммиссия', width: 110},
        {field: 'real_amount', headerName: 'Реал сумма', width: 120},
        {field: 'card_name', headerName: 'Имя на карте', width: 150},
        {field: 'phone_number', headerName: 'Телефон', width: 150},
        {field: 'user_paid', headerName: 'Юзер оплатил', width: 120},
        {field: 'is_sbp', headerName: 'СБП', width: 70},
        {field: 'is_using_account_number', headerName: 'По номеру счета', width: 150},
    ];

    return (

        <div style={{height: 600, width: '100%'}}>
            <DataGrid
                initialState={{
                    pagination: {
                        paginationModel: {pageSize: 100, page: 0},
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
