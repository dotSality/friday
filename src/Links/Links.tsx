import {NavLink} from 'react-router-dom';
import s from './Links.module.scss'
import {PATH} from '../utils/paths';

export const Links = () => {
    return <div className={s.links}>
        <NavLink className={({isActive}) => `${s.link} ${isActive ? s.active : ''}`}
            to={PATH.LOGIN}>Login page</NavLink>
        <NavLink className={({isActive}) => `${s.link} ${isActive ? s.active : ''}`}
            to={PATH.MAIN}>Profile page</NavLink>
        <NavLink className={({isActive}) => `${s.link} ${isActive ? s.active : ''}`}
            to={PATH.CREATE_PASS}>Create pass page</NavLink>
        <NavLink className={({isActive}) => `${s.link} ${isActive ? s.active : ''}`}
            to={PATH.FORGOT}>Pass recover page</NavLink>
        <NavLink className={({isActive}) => `${s.link} ${isActive ? s.active : ''}`}
            to={PATH.REGISTER}>Register page</NavLink>
        <NavLink className={({isActive}) => `${s.link} ${isActive ? s.active : ''}`}
            to={PATH.ERROR}>404</NavLink>
        <NavLink className={({isActive}) => `${s.link} ${isActive ? s.active : ''}`}
            to={PATH.TEST}>Test</NavLink>
    </div>
}