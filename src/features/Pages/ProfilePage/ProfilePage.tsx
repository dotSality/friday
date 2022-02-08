import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {changeUserDataTC, ProfileType} from '../../../bll/profile-reducer';
import {logoutTC} from '../../../bll/login-reducer';
import {PATH} from '../../../utils/paths';
import s from './ProfilePage.module.scss'
import UserPhoto from '../../../common/img/photo_2022-02-06_16-28-54.png'
import Button from '@mui/material/Button/Button';
import {initializeApp} from '../../../bll/app-reducer';
import {EditableSpan} from '../../EditableSpan/EditableSpan';


export const ProfilePage = React.memo(() => {

    const [myName, setMyName] = useState<string>('nastya')
    const [myAvatar, setMyAvatar] = useState<string | undefined>(undefined)

    const user = useAppSelector<ProfileType>(state => state.profile)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const {avatar, name, email} = user

    const dispatch = useAppDispatch()

    useEffect(() => {
            dispatch(initializeApp())
    }, [])

    useEffect(() => {
        setMyName(name)
        if (avatar) {
            setMyAvatar(avatar)
        }
    }, [name, avatar])

    const onBlurHandler = async (newValue: string) => {
        await dispatch(changeUserDataTC({name: newValue, avatar: myAvatar}))
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    const changeNameHandler = (newValue: string) => {
        setMyName(newValue)
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }


    return (

        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.content}>
                    <div className={s.avatar}>
                        <img src={avatar ? avatar : UserPhoto}/>
                    </div>

                    <div>
                        <EditableSpan
                            onBlur={onBlurHandler}
                            onChange={changeNameHandler}
                            value={myName}/>
                    </div>
                    <Button onClick={logoutHandler}>log out</Button>
                    <div>{email ? email : 'Not email'}</div>
                </div>
            </div>
        </div>


    );
}
);

