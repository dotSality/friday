import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../../bll/store';
import UserPhoto from './../../../common/img/photo_2022-02-06_16-28-54.png'
import {ProfileType} from '../../../bll/profile-reducer';


export const ProfilePage = () => {
    const user = useAppSelector<ProfileType>(state => state.profile)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }

    return (
        <div>
            <div>
                {user.avatar ? user.avatar : <img style={{height: '200px', width: '200px'}} src={UserPhoto} alt=""/>}

            </div>
            <div>
                {user.name}
            </div>
            <div>
                {user.email}
            </div>
            <div>
                {user.publicCardPacksCount}
            </div>
        </div>
    );
};