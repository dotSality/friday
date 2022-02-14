import {useAppSelector} from "../../bll/store";
import {ChangeEvent, FC, KeyboardEvent, useEffect, useState} from "react";
import s from './Pagination.module.css'


type PropsType = {
    portionSize: number
    onSetNewPage: (page: number) => void
}

export const Pagination: FC<PropsType> = ({portionSize, onSetNewPage}) => {

    const {cardPacksTotalCount, pageCount, page: currentPage} = useAppSelector(state => state.cards)

    let [portionNumber, setPortionNumber] = useState(1)
    let [inputPage, setInputPage] = useState<number | string>('')


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
    const onSetNewPageFromInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setInputPage(value)
    }

    const onSetNewPageByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSetNewPage(+inputPage)
            setInputPage('')
        }
    }

    const onSetNewPageByButton = (inputPage: number) => {
        onSetNewPage(inputPage)
        setInputPage('')
    }

    useEffect(() => {
        setPortionNumber(currentPortion)
    }, [currentPortion])

    return (
        <div>
            <div>
                {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                    onSetNewPage((currentPortion - 1) * portionSize)

                }}>prev</button>}
                {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                    .map(page => {
                        return <span className={currentPage === page ? s.active : s.neactive}
                                     key={page}
                                     onClick={() => onPageChanged(page)}
                        >{page} </span>
                    })}
                {currentPage !== pages[pages.length - 1]
                    ?
                    <span className={currentPage === pages[pages.length - 1] ? s.active : s.neactive}
                          onClick={() => {
                              onSetNewPage(pages[pages.length - 1])
                          }}>...{pages[pages.length - 1]}</span>
                    : ''
                }
                {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                    onSetNewPage(portionSize + currentPage)
                }}>next</button>}
            </div>
            <input style={{
                border: '1px solid',
                width: '40px',
                marginLeft: '20px',
                marginRight: '5px'
            }}
                   onChange={onSetNewPageFromInput}
                   value={inputPage}
                   placeholder={'page'}
                   onKeyPress={onSetNewPageByEnter}/>
            <button onClick={() => {
                onSetNewPageByButton(+inputPage)
            }}>＞
            </button>
        </div>
    )
}