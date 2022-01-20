import s from './App.module.scss'
import {Links} from './Links/Links';
import {AllRoutes} from './AllRoutes/AllRoutes';

function App() {

    return (
        <div className={s.app}>
            <Links/>
            <AllRoutes/>
        </div>
    )
}

export default App;
