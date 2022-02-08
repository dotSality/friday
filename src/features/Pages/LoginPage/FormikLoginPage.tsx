import React, {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";

import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import Container from "@mui/material/Container/Container";
import Button from "@mui/material/Button/Button";
import {Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment} from "@mui/material";

import {useAppSelector} from "../../../bll/store";
import {loginTC} from "../../../bll/login-reducer";

import {PATH} from "../../../utils/paths";
import Visibility from "../../../common/img/eye.svg";
import VisibilityOff from "../../../common/img/eye_off.svg";
import s from './Login.module.scss'


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const LoginPage = React.memo(() => {

        const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

        const navigate = useNavigate()
        const dispatch = useDispatch()


        type State = {
            showPassword: boolean
            showConfirmPassword: boolean
        }

        const [values, setValues] = useState<State>({
            showPassword: false,
            showConfirmPassword: false,
        });

        const handleClickShowPassword = () => {
            setValues({
                ...values,
                showPassword: !values.showPassword,
            });
        };

        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };

        const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
                rememberMe: false,
            },
            validate: values => {
                const errors: FormikErrorType = {}
                if (!values.email) {
                    errors.email = 'email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'password is required'
                } else if (values.password.length < 5) {
                    errors.password = 'Must be 5 characters or more'
                }
                return errors;
            },
            onSubmit: values => {
                dispatch(loginTC(values))
                formik.resetForm()
            }
        })

        if (isLoggedIn) {
            return <Navigate to={PATH.MAIN}/>
        }

        return <div className={s.mainContainer}>
            <Paper elevation={2} className={s.container}>
                <Grid container justifyContent={'center'}>
                    <Grid item justifyContent={'center'}>
                        <form onSubmit={formik.handleSubmit} className={s.form}>
                            <FormControl className={s.formControl}>
                                <Typography variant={'h4'} className={s.typography}>
                                    Sign in
                                </Typography>
                                <div className={s.descriptionForm}>
                                    Use your Cards Application
                                </div>
                                <FormGroup className={s.formGroup}>
                                    <TextField
                                        className={s.textField}
                                        sx={{width: '100%'}}
                                        margin={'normal'}
                                        id='outlined-basic'
                                        label='E-mail'
                                        variant='standard'
                                        error={!!(formik.touched.email && formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        {...formik.getFieldProps('email')}
                                    />

                                    <TextField
                                        className={s.textField}
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
                                        {...formik.getFieldProps('password')}
                                    />

                                    <Typography className={s.text}
                                                variant={'subtitle2'}
                                                sx={{cursor: 'pointer'}}
                                                onClick={() => navigate(PATH.FORGOT)}>
                                        Forgot password
                                    </Typography>
                                    <FormControlLabel
                                        label={'Remember me'}
                                        control={<Checkbox
                                            {...formik.getFieldProps('rememberMe')}/>}
                                    />
                                </FormGroup>
                                <Button type={'submit'}
                                        sx={{width: '100%'}}
                                        variant={'contained'}>
                                    Login
                                </Button>

                                <Container className={s.signUp}>
                                    <Typography variant={'subtitle1'}>
                                        Don't have an account?
                                    </Typography>

                                    <Button onClick={() => navigate(PATH.REGISTER)}>Sign Up</Button>
                                </Container>
                            </FormControl>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    }
)