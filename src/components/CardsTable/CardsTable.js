import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';

export default function CardsTable(props) {
    const [tableData, setTableData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 100,
        page: 0,
    });

    const getCardsList = useCallback(async (limit, offset) => {
        const data = await props.getCardsList(limit, offset);
        const preparedTableData = [];

        data.card_list.forEach(card => {
            preparedTableData.push({
                'id': card.id,
                'number': card.number,
                'trader_id': card.trader_id,
                'balance': card.balance.toLocaleString() + ' ₽',
                'active': card.active ? 'Да' : 'Нет',
                'name': card.name,
                'phone_number': card.phone_number,
                'creation_time': (new Date(card.creation_time).toLocaleString()),
                'is_paused': card.is_paused ? 'Да' : 'Нет',
                'archive': card.archive  ? 'Да' : 'Нет',
                'is_sbp': card.is_sbp  ? 'Да' : 'Нет',
                'bank': card.bank,
                'is_using_account_number': card.is_using_account_number ? 'Да' : 'Нет',
                'account_number': card.account_number,
            });
        })

        setTotalRows(data.total_count)
        setTableData(preparedTableData);
    }, [props.getCardsList]);

    useEffect(() => {
        getCardsList(paginationModel.pageSize, paginationModel.page * paginationModel.pageSize);
    }, [paginationModel]);

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'number', headerName: 'Номер', width: 150},
        {field: 'trader_id', headerName: 'Трейдер', width: 80},
        {field: 'balance', headerName: 'Баланс', width: 120},
        {field: 'active', headerName: 'Активно', width: 90},
        {field: 'name', headerName: 'Имя', width: 160},
        {field: 'phone_number', headerName: 'Телефон', width: 120},
        {field: 'creation_time', headerName: 'Создан', width: 170},
        {field: 'is_paused', headerName: 'На паузе', width: 90},
        {field: 'archive', headerName: 'Архив', width: 90},
        {field: 'is_sbp', headerName: 'СБП', width: 70},
        {field: 'bank', headerName: 'Банк', width: 90},
        {field: 'is_using_account_number', headerName: 'По номеру счета', width: 140},
        {field: 'account_number', headerName: 'Номер счета', width: 120},
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
