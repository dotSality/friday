import React, {useState} from 'react';
import {loginTC} from '../../../bll/login-reducer';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../../bll/store';


export const LoginPage = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const addItem = () => {
        dispatch(loginTC({email, password, rememberMe}))
    }
    if (isLoggedIn) {
        navigate('/')
    }

        return <div>
            <div>
                <input type="text"
                       placeholder={'enter email...'}
                       value={email}
                       onChange={(e) => setEmail(e.currentTarget.value)}/>
            </div>
            <div>
                <input type="password"
                       placeholder={'enter password'}
                       value={password}
                       onChange={(e) => setPassword(e.currentTarget.value)}/>
            </div>
            <div>
                <input type={'checkbox'}
                       onChange={(e) => setRememberMe(e.currentTarget.checked)}
                       checked={rememberMe}/>
            </div>

            <button onClick={addItem}>login</button>
        </div>
}