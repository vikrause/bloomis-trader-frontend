import CreateTask from "../CreateTask/CreateTask";
import ActiveTask from "../ActiveTask/ActiveTask";

export default function Main(props) {
    return (
        <main className="main">
            <CreateTask
                onCreateTask ={props.onCreateTask}
            />
            <ActiveTask
                activeTask = {props.activeTask}
                isDataActiveTask = {props.isDataActiveTask}
                isActiveTaskPaused={props.isActiveTaskPaused}
                onCancelTask ={props.onCancelTask}
                onStartTask ={props.onStartTask}
                onPauseTask ={props.onPauseTask}
            />
        </main>
    )
}