
export function Paginator(props) {
    const totalCards = props.totalCards
    const maxCards = 6
    const totalPages = Math.ceil(totalCards / maxCards)

    const showNums = [1, 2, 3, 4, 5]
    return (
        <div className="paginator-wrap">
            {showNums.map(n => <a className="d-flex" href="#">{n}</a>)}
        </div>
    )
}