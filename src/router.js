import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';
import Admin from './admin';
//单据
import Invoices from './pages/invoices';
//单据详情
import InvoicesReimbursement from './pages/invoices/pages/reimbursement';
import InvoicesBorrow from './pages/invoices/pages/borrow';
import InvoicesEvection from './pages/invoices/pages/evection';
import InvoicesRepay from './pages/invoices/pages/repay';
//账户
import Financechange from './pages/finance/change';
import Financeme from './pages/finance/me';
import Financelist from './pages/finance/list';
//报表
import Reportpersonal from './pages/report/personal';
import Reportcompany from './pages/report/company'
//管理设置
import Aamcost from './pages/aam/cost';
import Aaminvoices from './pages/aam/invoices';
import Aamjourney from './pages/aam/journey';
//记住设置
import Basdepa from './pages/basics/depa';
import Basmenu from './pages/basics/menu';
import Basrole from './pages/basics/role';
import Basuser from './pages/basics/user';



class IRouter extends Component{
    render(){
        return(
            <Router>
                <App>
                    <Route path="/login" exact component={Admin}/>
                    <Route path="/index" render={()=>
                        <Admin>
                            <Route path="/index/invoices" render={()=>
                                <Invoices>
                                    <Route path="/index/invoices/borrow/:id" exact component={InvoicesBorrow}/>
                                    <Route path="/index/invoices/evection/:id" exact component={InvoicesEvection}/>
                                    <Route path="/index/invoices/reimbursement/:id" exact component={InvoicesReimbursement}/>
                                    <Route path="/index/invoices/repay/:id" exact component={InvoicesRepay}/>
                                </Invoices>
                            }/>

                            <Route path="/index/finance/me" exact component={Financeme}/>
                            <Route path="/index/finance/change" exact component={Financechange}/>
                            <Route path="/index/finance/list" exact component={Financelist}/>

                            <Route path="/index/report/personal" exact component={Reportpersonal}/>
                            <Route path="/index/report/company" exact component={Reportcompany}/>

                            <Route path="/index/aam/invoices" exact component={Aaminvoices}/>
                            <Route path="/index/aam/cost" exact component={Aamcost}/>
                            <Route path="/index/aam/journey" exact component={Aamjourney}/>

                            <Route path="/index/basics/user" exact component={Basuser}/>
                            <Route path="/index/basics/depa" exact component={Basdepa}/>
                            <Route path="/index/basics/role" exact component={Basrole}/>
                            <Route path="/index/basics/menu" exact component={Basmenu}/>
                        </Admin>
                    }/>
                </App>
            </Router>
        )
    }
}

export default IRouter;