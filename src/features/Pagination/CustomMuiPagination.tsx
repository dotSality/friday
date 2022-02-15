import React, {FC} from "react";

import {Pagination} from '@mui/material'

import {useAppSelector} from "../../bll/store";



type PropsType = {
    onSetNewPage: (page: number) => void
}

export const CustomMuiPagination: FC<PropsType> = React.memo(({onSetNewPage,}) => {

        const {cardPacksTotalCount, pageCount, page: currentPage} = useAppSelector(state => state.cards)
        const {status} = useAppSelector(state => state.app)

        const totalAmountOfPages = Math.ceil(cardPacksTotalCount / pageCount)
        console.log(pageCount)

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
)