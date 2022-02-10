import c from './../../../../common/styles/Container.module.scss';
import s from './CheckSuccess.module.scss';
import Paper from '@mui/material/Paper/Paper';
import {useAppSelector} from '../../../../bll/store';
import Typography from '@mui/material/Typography/Typography';
import {useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from '../../../../utils/paths';

export const CheckSuccess = () => {

    const navigate = useNavigate()


    const {email} = useAppSelector(state => state.passRecover)


    useEffect(() => {
        const id = setTimeout(() => {
            navigate(PATH.LOGIN)
        }, 3000)
        return () => clearTimeout(id)
    }, [])


    return (
        <div className={c.mainContainer}>
            <Paper elevation={2} className={`${c.container} ${s.container}`}>
                <div className={s.item}>
                    <div className={s.imageContainer}>
                        <div className={s.image}></div>
                    </div>
                </div>
                <div className={s.item}>
                    <Typography variant={'h6'}>
                        Check your Email
                    </Typography>
                </div>
                <div className={s.item}>
                    <Typography variant={'subtitle1'} sx={{opacity: '50%'}}>
                        We've sent and Email with instructions to {email}
                    </Typography>
                </div>
            </Paper>
        </div>
    );
};