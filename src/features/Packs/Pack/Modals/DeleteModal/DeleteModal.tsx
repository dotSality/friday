import {Modal} from '../../../../Modal/Modal';
import React, {useState} from 'react';
import Button from '@mui/material/Button/Button';
import {useAppSelector} from '../../../../../bll/store';
import Typography from '@mui/material/Typography';
import s from './DeleteModal.module.scss';

type PropsType = {
    packName: string,
    onRemovePackHandler: () => void,
}

export const DeleteModal = ({onRemovePackHandler, packName}: PropsType) => {

    const {status} = useAppSelector(state => state.app)
    const [active, setActive] = useState<boolean>(false)
    const onShowModalHandler = () => setActive(true)
    const onHideModalHandler = () => setActive(false)

    return (
        <>
            <Button
                sx={{marginLeft: '10px'}}
                size={'small'}
                variant={'text'}
                color={'error'}
                disabled={status === 'loading'}
                onClick={onShowModalHandler}>Delete</Button>
            <Modal active={active} setActive={setActive}>
                <div className={s.content}>
                    <Typography variant={'h6'}>
                        Do you really want to remove <b>{packName}</b> pack?
                        All cards will be excluded from this course
                    </Typography>
                    <div className={s.buttons}>
                        <Button size={'small'} color={'primary'} onClick={onHideModalHandler}>Cancel</Button>
                        <Button size={'small'} color={'error'} onClick={onRemovePackHandler}>Remove</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}