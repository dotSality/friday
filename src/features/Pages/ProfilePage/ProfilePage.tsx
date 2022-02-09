import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {changeUserDataTC, ProfileType} from '../../../bll/profile-reducer';
import {initializeApp} from '../../../bll/app-reducer';
import {PATH} from '../../../utils/paths';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import s from './ProfilePage.module.scss'
import UserPhoto from '../../../common/img/photo_2022-02-06_16-28-54.png'


export const ProfilePage = React.memo(() => {

        const [myName, setMyName] = useState<string>('')
        const [myAvatar, setMyAvatar] = useState<string | undefined>(undefined)

        const user = useAppSelector<ProfileType>(state => state.profile)
        const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
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
                            <img src={avatar ? avatar : UserPhoto} alt={'photo'}/>
                        </div>

                        <div>
                            <EditableSpan
                                onBlur={onBlurHandler}
                                onChange={changeNameHandler}
                                value={myName}/>
                        </div>
                        <div>{email ? email : 'Not email'}</div>
                    </div>
                </div>
            </div>
        );
    }
);

