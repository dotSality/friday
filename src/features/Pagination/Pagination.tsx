import {useAppSelector} from "../../bll/store";
import {FC, useState} from "react";
import s from'./Pagination.module.css'


type PropsType = {
    portionSize: number
    onSetNewPage: (page: number) => void
}

export const Pagination: FC<PropsType> = ({portionSize, onSetNewPage}) => {

    const cardPacksTotalCount = useAppSelector<number>(state => state.cards.cardPacksTotalCount)
    const pageCount = useAppSelector<number>(state => state.cards.pageCount)
    const currentPage = useAppSelector<number>(state => state.cards.page)

    let [portionNumber, setPortionNumber] = useState(1)


    const totalAmountOfPages = Math.ceil(cardPacksTotalCount / pageCount)

    const pages: number [] = []

    for (let i = 1; i <= totalAmountOfPages; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(totalAmountOfPages / portionSize)
    const currentPortion = Math.ceil(currentPage / portionSize)

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    const onPageChanged = (page: number) => {
        onSetNewPage(page)
    }


    return (
        <div>
            <div>
                {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>prev</button>}
                {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page => {
                        return <span className={currentPage === page ? s.active : s.neactive}
                            key={page}
                            onClick={() => onPageChanged(page)}
                        >{page} </span>
                    })}
                {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>next</button>}
            </div>
        </div>
    )
}