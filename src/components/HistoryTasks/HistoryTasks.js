import TasksTable from "../TasksTable/TasksTable";

export default function HistoryTasks(props) {
    return (
        <section className="historyTask">
            <TasksTable getTaskList={props.getTaskList}/>
        </section>
    )
}
