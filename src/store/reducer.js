import {combineReducers} from 'redux-immutable';
import headerReducer from '../components/header/store/reducer';
import menusReducer from '../components/menus/sotre/reducer';
import costReducer from '../pages/aam/cost/sotre/reducer';
import userReaducer from '../pages/basics/user/store/reducer';
import invoicesReaducer from '../pages/invoices/store/reducer';
import deptReaducer from '../pages/basics/depa/store/reducer';

const redux = combineReducers({
    header: headerReducer,
    menus: menusReducer,
    costs: costReducer,
    users: userReaducer,
    invoices: invoicesReaducer,
    dept: deptReaducer,
})

export default redux;