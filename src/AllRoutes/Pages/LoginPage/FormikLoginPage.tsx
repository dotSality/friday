import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {useFormik} from "formik";
import {useAppSelector} from "../../../bll/store";

import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import Container from "@mui/material/Container/Container";
import Button from "@mui/material/Button/Button";
import {Checkbox, FormControlLabel} from "@mui/material";
import {loginTC} from "../../../bll/login-reducer";

import s from './Login.module.scss'
import {PATH} from "../../../utils/paths";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const LoginPage = () => {

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
        navigate(PATH.MAIN)
    }

    return <div className={s.mainContainer}>
        <Paper elevation={2} className={s.container}>

            <form onSubmit={formik.handleSubmit} className={s.form}>
                <Typography variant={'h4'}>
                    it-incubator
                </Typography>
                <Typography variant={'h4'}>
                    Sign in
                </Typography>

                <TextField
                    sx={{width: '100%'}}
                    id='outlined-basic'
                    label='E-mail'
                    variant='standard'
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email &&
                <div style={{color: 'red', textAlign: 'center'}}>{formik.errors.email}</div>}
                <TextField
                    sx={{width: '100%'}}
                    id='outlined-basic'
                    type='password'
                    label='Password'
                    variant='standard'
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.email && formik.errors.password && <
                    div style={{color: 'red', textAlign: 'center'}}>{formik.errors.password}</div>}
                <Typography
                    variant={'subtitle2'}
                    sx={{cursor: 'pointer'}}
                    onClick={() => navigate(PATH.PASS_RECOVER)}>
                    forgot your password?
                </Typography>
                <FormControlLabel
                    label={'Remember me'}
                    control={<Checkbox
                        {...formik.getFieldProps('rememberMe')}/>}
                />
                <Button type={'submit'}
                        sx={{width: '100%'}}
                        variant={'contained'}>Login</Button>

                <Container className={s.signUp}>
                    <Typography variant={'subtitle1'} sx={{opacity: '50%'}}>
                        Don't have an account?
                    </Typography>

                    <Button onClick={() => navigate(PATH.REGISTER)}>Sign Up</Button>
                </Container>

            </form>
        </Paper>
    </div>
}