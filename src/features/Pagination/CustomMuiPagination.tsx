import {Pagination} from '@mui/material'
import {useAppSelector} from "../../bll/store";
import {FC} from "react";


type PropsType = {
    onSetNewPage: (page: number) => void

}

export const CustomMuiPagination: FC<PropsType> = ({onSetNewPage, }) => {

    const {cardPacksTotalCount, pageCount, page: currentPage} = useAppSelector(state => state.cards)
    const {status} = useAppSelector(state => state.app)

    const totalAmountOfPages = Math.ceil(cardPacksTotalCount / pageCount)


    return (
        <>
            <Pagination
                count={totalAmountOfPages}
                page={currentPage}
                onChange={(_, num) => onSetNewPage(num)}
                disabled={status === 'loading'}
                sx={{marginY: '15px'}}
            variant={'outlined'}
                boundaryCount={2}
            />
        </>
    )
}