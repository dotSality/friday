import {Route, Routes} from 'react-router-dom';
import {PATH} from '../utils/paths';
import {RegisterPage} from './Pages/RegisterPage/RegisterPage';
import {Test} from './Pages/Test/Test';
import {NewPassCreate} from './Pages/NewPassCreate/NewPassCreate';
import {ForgotPage} from './Pages/ForgotPage/ForgotPage';
import {ProfilePage} from './Pages/ProfilePage/ProfilePage';
import {ErrorPage} from './Pages/ErrorPage/ErrorPage';
import s from './AllRoutes.module.scss'
import {LoginPage} from "./Pages/LoginPage/FormikLoginPage";
import {CheckSuccess} from './Pages/ForgotPage/CheckSuccess/CheckSuccess';


export const AllRoutes = () => {
    return <div className={s.routes}>
        <Routes>
            <Route path={PATH.LOGIN} element={<LoginPage/>}/>
            <Route path={PATH.REGISTER} element={<RegisterPage/>}/>
            <Route path={PATH.TEST} element={<Test/>}/>
            <Route path={PATH.CREATE_PASS + '/:token'} element={<NewPassCreate/>}/>
            <Route path={PATH.FORGOT} element={<ForgotPage/>}/>
            <Route path={PATH.CHECK_SUCCESS} element={<CheckSuccess/>}/>
            <Route path={PATH.MAIN} element={<ProfilePage/>}/>
            <Route path={PATH.ERROR} element={<ErrorPage/>}/>
        </Routes>
    </div>
}