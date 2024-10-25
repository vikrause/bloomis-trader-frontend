import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {useCallback} from "react";

import 'react-notifications-component/dist/theme.css'
import {Store} from "react-notifications-component";
import TradersTable from "../TradersTable/TradersTable";

export default function Priority(props) {

const onChangePriority = useCallback(
    async (priority) => {
        const data = await props.changePriority(priority);
        if (data) {
            dispatchSuccessNotification(data.priority);
        }
    }, [props.changePriority]);

    function dispatchSuccessNotification(message) {
        Store.addNotification({
            title: "Приоритет изменен: ",
            message: message,
            type: "success",
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

    return (
        <section className="priority">
            <div className="priority__change">
            <p className="priority__title">Установить приоритет</p>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup variant="outlined" aria-label="Basic button group" size="large">
                    <Button type="button" onClick={() => {onChangePriority(1)}}>1</Button>
                    <Button type="button" onClick={() => {onChangePriority(2)}}>2</Button>
                    <Button type="button" onClick={() => {onChangePriority(3)}}>3</Button>
                    <Button type="button" onClick={() => {onChangePriority(4)}}>4</Button>
                    <Button type="button" onClick={() => {onChangePriority(5)}}>5</Button>
                </ButtonGroup>
            </Box>
            </div>
            <p className="priority__title">Список трейдеров</p>

            <TradersTable getTradersList={props.getTradersList}/>
        </section>
    )
}