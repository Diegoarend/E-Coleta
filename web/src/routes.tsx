import React from 'react';
//utilizando o Route e o Browser Router para realizar as trocas entre os recursos.
import { Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
const Routes = () => {
    return (
        <BrowserRouter>
            < Route component={Home} path="/" exact/>
            < Route component={CreatePoint} path="/create-point"/>
        </BrowserRouter>
    )
}

export default Routes