import PaymentsTable from "../PaymentsTable/PaymentsTable";

export default function Payments(props) {
    return (
        <section className="payments">
            <PaymentsTable getPaymentsList={props.getPaymentsList} />
        </section>
    )
}