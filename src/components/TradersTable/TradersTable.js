import {DataGrid} from "@mui/x-data-grid";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";


export default function  TradersTable(props) {
    const [tableData, setTableData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });

    const getTradersList = useCallback(async (limit, offset) => {
        const data = await props.getTradersList(limit, offset);
        const preparedTableData = [];

        data.trader_list.forEach(trader => {
            preparedTableData.push({
                'id': trader.id,
                'active_cards': trader.active_cards,
                'priority': trader.priority,
                'frozen_balance': trader.frozen_balance.toLocaleString() + ' ₽',
                'active': trader.active ? 'Да' : 'Нет',
                'username': trader.username,
                'password': trader.password,
                'name': trader.name,
                'phone': trader.phone,
                'auth_token_hash': trader.auth_token_hash,
                'withdraw_success': trader.withdraw_success ? 'Да' : 'Нет',
                'limits': trader.limits,
                'insurance_deposit': trader.insurance_deposit.toLocaleString() + ' ₽',
                'percent_deposit': trader.percent_deposit.toLocaleString() + '%',
                'referrer_id': trader.referrer_id,
                'ban_time': trader.ban_time,
                'updated_at': (new Date(trader.created_at).toLocaleString()),
            });
        })

        setTotalRows(data.total_count)
        setTableData(preparedTableData);
    }, [props.getTradersList]);

    useEffect(() => {
        getTradersList(paginationModel.pageSize, paginationModel.page * paginationModel.pageSize);
    }, [paginationModel]);

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'active_cards', headerName: 'Карт', width: 70},
        {field: 'priority', headerName: 'Приор.', width: 70},
        {field: 'frozen_balance', headerName: 'Заморозка', width: 100},
        {field: 'active', headerName: 'Активен', width: 80},
        {field: 'username', headerName: 'Юзер', width: 160},
        {field: 'password', headerName: 'Пароль', width: 90},
        {field: 'name', headerName: 'Имя', width: 120},
        {field: 'phone', headerName: 'Телефон', width: 110},
        {field: 'auth_token_hash', headerName: 'Токен', width: 120},
        {field: 'withdraw_success', headerName: 'Вывод', width: 70},
        {field: 'limits', headerName: 'Лимиты', width: 150},
        {field: 'insurance_deposit', headerName: 'Депозит', width: 110},
        {field: 'percent_deposit', headerName: 'Депозит %', width: 90},
        {field: 'referrer_id', headerName: 'Реферал', width: 90},
        {field: 'ban_time', headerName: 'Бан', width: 120},
        {field: 'updated_at', headerName: 'Обновлен', width: 150},
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
