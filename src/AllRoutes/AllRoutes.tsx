import {Route, Routes} from 'react-router-dom';
import {PATH} from '../utils/paths';
import {LoginPage} from './Pages/LoginPage/LoginPage';
import {RegisterPage} from './Pages/RegisterPage/RegisterPage';
import {Test} from './Pages/Test/Test';
import {NewPassCreate} from './Pages/NewPassCreate/NewPassCreate';
import {PassRecoverPage} from './Pages/PassRecoverPage/PassRecoverPage';
import {ProfilePage} from './Pages/ProfilePage/ProfilePage';
import {ErrorPage} from './Pages/ErrorPage/ErrorPage';
import s from './AllRoutes.module.scss'

export const AllRoutes = () => {
    return <div className={s.routes}>
        <Routes>
            <Route path={PATH.LOGIN} element={<LoginPage/>}/>
            <Route path={PATH.REGISTER} element={<RegisterPage/>}/>
            <Route path={PATH.TEST} element={<Test/>}/>
            <Route path={PATH.CREATE_PASS} element={<NewPassCreate/>}/>
            <Route path={PATH.PASS_RECOVER} element={<PassRecoverPage/>}/>
            <Route path={PATH.PROFILE} element={<ProfilePage/>}/>
            <Route path={PATH.ERROR} element={<ErrorPage/>}/>
        </Routes>
    </div>
}