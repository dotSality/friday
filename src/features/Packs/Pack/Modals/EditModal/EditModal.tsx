import s from './EditModal.module.scss';
import Typography from '@mui/material/Typography';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button/Button';
import {Modal} from '../../../../Modal/Modal';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useAppSelector} from '../../../../../bll/store';

type PropsType = {
    _id: string;
    isEditable: boolean;
    updatePack: (name: string, _id: string) => void,
}

export const EditModal = ({isEditable, updatePack, _id}: PropsType) => {

    const {status} = useAppSelector(state => state.app)
    const [active, setActive] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const setModalOn = () => setActive(true)

    const onUpdatePackHandler = () => updatePack(value, _id)
    const onEnterUpdateHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') updatePack(value, _id)
    }

    return (
        <>
            <Button size={'small'} variant={'text'} color={'primary'} disabled={status === 'loading'} onClick={setModalOn}>Edit</Button>
            <Modal active={active} setActive={setActive}>
                <div className={s.modalContent}>
                    {isEditable
                        ? <>
                            <Typography variant={'subtitle1'} className={s.title}>Edit your pack's name</Typography>
                            <div className={s.actions}>
                                <TextField
                                    variant={'standard'}
                                    label={'New title'}
                                    onKeyPress={onEnterUpdateHandler}
                                    value={value}
                                    placeholder={'Edit title'}
                                    onChange={onInputChange}
                                />
                                <Button sx={{marginTop: '20px'}} size={'small'} variant={'text'} color={'primary'} onClick={onUpdatePackHandler}>Apply</Button>
                            </div>
                        </>
                        : <>
                            <div className={s.modalContent}>
                                <span className={s.title}>That is not your pack</span>
                                <Button size={'small'} variant={'text'} color={'primary'} onClick={() => setActive(false)}>OK</Button>
                            </div>
                        </>}
                </div>
            </Modal>
        </>
    )
}