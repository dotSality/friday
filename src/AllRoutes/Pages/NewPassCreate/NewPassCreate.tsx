import c from './../../../common/styles/Container.module.scss'
import s from './NewPassCreate.module.scss';
import Paper from '@mui/material/Paper/Paper';
import {useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography/Typography';
import {useFormik} from 'formik';
import {IconButton, InputAdornment, TextField} from '@mui/material';
import Visibility from '../../../common/img/eye.svg';
import VisibilityOff from '../../../common/img/eye_off.svg';
import React, {useState} from 'react';
import Fab from '@mui/material/Fab/Fab';
import Container from '@mui/material/Container/Container';

type FormikValuesType = {
    password: string,
    confirmPassword: string,
}

type StateType = {
    showPassword: boolean
    showConfirmPassword: boolean
}

export const NewPassCreate = () => {

    const {token} = useParams<'token'>()

    const [values, setValues] = useState<StateType>({
        showPassword: false,
        showConfirmPassword: false,
    });

    const handleClickShowPassword = () => setValues({...values, showPassword: !values.showPassword,});
    const handleClickShowConfirmPassword = () => setValues({...values, showConfirmPassword: !values.showConfirmPassword,});

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: (values: FormikValuesType) => {
            const errors: Partial<FormikValuesType> = {};
            if (!values.password) errors.password = 'Password is required'
            else if (values.password.length < 5)
                errors.password = 'Password must be more than 5 characters'
            if (values.password !== values.confirmPassword)
                errors.confirmPassword = 'Passwords are incorrect'
            return errors
        },
        onSubmit: (values: FormikValuesType) => {
            console.log(values)
        }
    })

    return <div className={c.mainContainer}>

        <Paper elevation={2} className={`${c.container} ${s.container}`}>
            <Typography variant={'h5'} sx={{textAlign: 'center'}}>
                Create new password
            </Typography>
            <form onSubmit={formik.handleSubmit} className={s.form}>


                <Container className={s.contentContainer}>
                    <TextField
                        sx={{width: '100%'}}
                        margin={'normal'}
                        id='outlined-basic'
                        type={values.showPassword ? 'text' : 'password'}
                        label='Password'
                        variant='standard'
                        error={!!(formik.touched.password && formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {values.showPassword
                                            ? <img src={Visibility}
                                                width='16' height='16' alt="Visibility"/>
                                            : <img src={VisibilityOff}
                                                width='16' height='16' alt="VisibilityOff"/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...formik.getFieldProps('password')}/>

                    <TextField
                        sx={{width: '100%'}}
                        margin={'normal'}
                        id='outlined-second'
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        label='Confirm password'
                        variant='standard'
                        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword &&formik.errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {values.showConfirmPassword
                                            ? <img src={Visibility}
                                                width='16' height='16' alt="Visibility"/>
                                            : <img src={VisibilityOff}
                                                width='16' height='16' alt="VisibilityOff"/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        {...formik.getFieldProps('confirmPassword')}/>

                    <Typography variant={'subtitle1'} sx={{opacity: '50%'}}>
                        Create new password and we will send you further instructions
                    </Typography>


                </Container>
                <Fab sx={{padding: '0 40px', margin: '0 20px 50px'}} type={'submit'}
                    variant="extended" size="medium" color={'primary'} aria-label="add">
                    Create new password
                </Fab>

            </form>
        </Paper>

    </div>
}