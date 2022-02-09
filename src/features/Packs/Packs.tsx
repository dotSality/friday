import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/paths";
import React from "react";
import {useAppSelector} from "../../bll/store";


export  const Packs =() => {
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return <div style={{minHeight: '91vh'}}>
        PACKS
    </div>
}