import CardsTable from "../CardsTable/CardsTable";

export default function Cards(props) {
    return (
        <section className="cards">
            <CardsTable getCardsList={props.getCardsList} />
        </section>
    )
}