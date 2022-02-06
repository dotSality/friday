import React from 'react'
import {Navigate, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {RootStateType} from '../../../bll/store';
import {registrationTC} from '../../../bll/register-reducer';
import {Button, TextField, FormControl, FormGroup, FormLabel, Grid, InputAdornment, IconButton} from '@mui/material';
import s from './RegisterPage.module.css'
import Visibility from './../../../common/img/eye.svg';
import VisibilityOff from './../../../common/img/eye_off.svg';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegisterPage = () => {

    const error = useSelector<RootStateType, string>(state => state.register.error)
    const isRegistrationSuccess = useSelector<RootStateType, boolean>(state => state.register.isRegistrationSuccess)
    const dispatch = useDispatch()


    interface State {
        showPassword: boolean
        showConfirmPassword: boolean
    }

    const [values, setValues] = React.useState<State>({
        showPassword: false,
        showConfirmPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: values => {
            dispatch(registrationTC(values.email, values.password))
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password required';
            } else if (values.password.length < 7) {
                errors.password = 'Password must be 7 or more characters';
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password different';
            }
            return errors;
        },
    })

    if (isRegistrationSuccess) {
        return <Navigate to={'/'}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>

                <form onSubmit={formik.handleSubmit}>
                    <FormControl>

                        <FormLabel className={s.formLabel}>
                            <div className={s.nameForm}>Sign Up</div>
                            <div className={s.descriptionForm}> create a new account</div>
                        </FormLabel>

                        <div className={s.registrationError}>
                            {error &&
                            <div>{error}</div>}
                        </div>

                        <FormGroup className={s.formGroup}>
                            <TextField className={s.textField}
                                       id='standard-basic'
                                       label='Email'
                                       variant='standard'
                                       error={!!(formik.touched.email && formik.errors.email)}
                                       helperText={formik.errors.email}
                                       {...formik.getFieldProps('email')}/>

                            <TextField className={s.textField}
                                       id='standard-basic'
                                       variant='standard'
                                       label='Password'
                                       type={values.showPassword ? 'text' : 'password'}
                                       error={!!(formik.touched.password && formik.errors.password)}
                                       helperText={formik.errors.password}
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

                            <TextField className={s.textField}
                                       id='standard-basic'
                                       variant='standard'
                                       label='Confirm password'
                                       type={values.showConfirmPassword ? 'text' : 'password'}
                                       error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                       helperText={formik.errors.confirmPassword}
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
                                                                  width='16' height='16' alt="Visibility"/>}
                                                   </IconButton>
                                               </InputAdornment>
                                           ),
                                       }}
                                       {...formik.getFieldProps('confirmPassword')}/>
                        </FormGroup>

                        <Button type={'submit'} variant='contained'>Register</Button>

                        <div className={s.navigateToLogin}>
                            Already have an account?
                            <NavLink to={'/login'}>
                                <Button variant='text'>Sign in</Button>
                            </NavLink>
                        </div>
                    </FormControl>
                </form>

            </Grid>
        </Grid>
    )
}
