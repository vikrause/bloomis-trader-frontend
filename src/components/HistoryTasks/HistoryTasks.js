import DataTasksTable from "../DataTasksTable/DataTasksTable";

export default function HistoryTasks(props) {
    return (
        <section className="historyTask">
            <DataTasksTable getTaskList={props.getTaskList}/>
        </section>
    )
}
