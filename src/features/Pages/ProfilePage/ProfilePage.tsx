import React, {useCallback, useEffect, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {changeUserDataTC, ProfileType} from '../../../bll/profile-reducer';
import {initializeApp} from '../../../bll/app-reducer';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import UserPhoto from '../../../common/img/photo_2022-02-06_16-28-54.png'
import Avatar from '@mui/material/Avatar/Avatar';
import {PATH} from '../../../utils/paths';


export const ProfilePage = React.memo(() => {

        const [myName, setMyName] = useState<string>('')
        const [myAvatar, setMyAvatar] = useState<string | undefined>(undefined)

        const user = useAppSelector<ProfileType>(state => state.profile)
        const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
        const {avatar, name, email} = user

        const dispatch = useAppDispatch()
        const navigate = useNavigate()

        useEffect(() => {
            dispatch(initializeApp())
        }, [])

        useEffect(() => {
            setMyName(name)
            if (avatar) {
                setMyAvatar(avatar)
            }
        }, [name, avatar])


        const onBlurHandler = useCallback( async (newValue: string) => {
            await dispatch(changeUserDataTC({name: newValue, avatar: myAvatar}))
        },[])

        const changeNameHandler = useCallback((newValue: string) => {
            setMyName(newValue)
        },[])

        const navigateToMainHandler = useCallback(() => {
            navigate(PATH.MAIN)
        },[])

        if (!isLoggedIn) {
            return <Navigate to={PATH.LOGIN}/>
        }

        return (

            <Card sx={{maxWidth: 410, width: '100%', padding: '20px 30px', textAlign: 'center'}}>
                <Avatar src={avatar ? avatar : UserPhoto} alt={'avatar'}
                        sx={{width: 250, height: 250, margin: '50px auto'}}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <EditableSpan
                            onBlur={onBlurHandler}
                            onChange={changeNameHandler}
                            value={myName}/>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {email ? email : 'Not email'}
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent:'center'}}>
                    <Button onClick={navigateToMainHandler}
                            sx={{color:'black'}}
                        size="small"> НУ OK</Button>
                </CardActions>
            </Card>
        );
    }
);

