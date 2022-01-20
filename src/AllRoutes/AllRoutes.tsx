import {Route, Routes} from 'react-router-dom';
import {PATH} from '../utils/paths';
import {LoginPage} from './Pages/LoginPage';
import {RegisterPage} from './Pages/RegisterPage';
import {Test} from './Pages/Test';
import {NewPassCreate} from './Pages/NewPassCreate';
import {PassRecoverPage} from './Pages/PassRecoverPage';
import {ProfilePage} from './Pages/ProfilePage';
import {ErrorPage} from './Pages/ErrorPage';

export const AllRoutes = () => {
    return <div>
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