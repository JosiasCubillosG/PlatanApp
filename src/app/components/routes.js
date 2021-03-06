import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Layout from "./Layout";
import Login from "../views/login";
import Recover from "./recoverPass";
import ChooseOption from "../views/chooseOption";
import Diseases from "../views/diseases";
import DetailDisease from "../views/detailDisease";
import Accounting from "../views/accounting";
import Income from "../views/income";
import Outlay from "../views/outlay";
import Useful from "./useful";
import ListCrops from "../views/listCrops";
import AddCrop from "../views/addCrop";
import DetailCrop from "../views/detailCrop";
import Menu from "../views/menu";
import App from "../views/app";
import { WithAuth } from "../views/withAuth";
import PrivateRoute from "./privateRoute";
import Context from '../Context'
import Register from '../views/register';

function Routes (){

    return(
        <BrowserRouter>
            <Layout>
                <Context.Consumer>
                    {
                        ({isAuth,currentUser}) => {
                            return(
                                <Switch>
                                <Route exact path="/" component={isAuth ? WithAuth(ChooseOption, currentUser) : Login}/>
                                <Route exact path="/recover" component={Recover} />
                                <Route exact path="/register" component={Register} />
                                <PrivateRoute exact path="/options/diseases" component={Diseases} />
                                <PrivateRoute exact path="/options/diseases/:id" component={DetailDisease} />
                                <PrivateRoute exact path="/options/accounting" component={Accounting} />
                                <PrivateRoute exact path="/options/accounting/income" component={() => <Income currentUser={currentUser} />} />
                                <PrivateRoute exact path="/options/accounting/outlay" component={() => <Outlay currentUser={currentUser} />} />
                                <PrivateRoute exact path="/options/accounting/useful" component={() => <Useful currentUser={currentUser} />} />
                                <PrivateRoute exact path="/options/crops" component={() => <ListCrops currentUser={currentUser} />} />
                                <PrivateRoute exact path="/options/addCrop" component={(props) => <AddCrop {...props} currentUser={currentUser} />} />
                                <PrivateRoute exact path="/options/detailCrop/:id" component={DetailCrop} />
                                <PrivateRoute exact path="/menu" component={Menu} />
                                </Switch>
                            )
                        }
                    }
                </Context.Consumer>
            </Layout>
        </BrowserRouter>
    )
}

export default Routes