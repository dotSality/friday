import {useFormik} from "formik";
import {useAppSelector} from "../../../bll/store";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginTC} from "../../../bll/login-reducer";
import s from './Login.module.scss'
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField/TextField";
import Fab from "@mui/material/Fab/Fab";
import Container from "@mui/material/Container/Container";
import Button from "@mui/material/Button/Button";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";


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
        validate: () => {

        },
        onSubmit: values => {
            dispatch(loginTC(values))
        }
    })

    if (isLoggedIn) {
        navigate('/')
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
                <TextField
                    sx={{width: '100%'}}
                    id='outlined-basic'
                    type='password'
                    label='Password'
                    variant='standard'
                    {...formik.getFieldProps('password')}
                />
                <Typography
                    variant={'subtitle2'}
                    sx={{cursor:'pointer'}}
                    onClick={() => navigate('/pass-recover')}>
                    forgot your password?
                </Typography>
                <FormControlLabel
                    label={'Remember me'}
                    control={<Checkbox
                        {...formik.getFieldProps('rememberMe')}/>}
                />
                <Button type={'submit'} variant={'contained'}>Login</Button>

                <Container className={s.signUp}>
                    <Typography variant={'subtitle1'} sx={{opacity: '50%'}}>
                        Don't have an account?
                    </Typography>

                    <Button onClick={() => navigate('/register')}>Sign Up</Button>
                </Container>

            </form>
        </Paper>
    </div>
}