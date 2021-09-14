import CategoryInterface from "./Component/CategoryInterface"
import DisplayAllCategory from './Component/DisplayAllCategories'
import AdminLogin from "./Component/AdminLogin"
import AdminDashBoard from "./Component/AdminDashBoard"
import SubCategoryInterface from "./Component/SubCategoryInterface"
import DisplayAllSubCategories from './Component/DisplayAllSubCategories'
import GameInterface from "./Component/GameInterface"
import DisplayGames from './Component/DisplayGames'
import AccessoriesInterface from "./Component/AccessoriesInterface"
import DisplayAccessories from './Component/DisplayAccessories'
import TermAndCondition from "./Component/TermAndCondition"
import DisplayTermAndCondition from './Component/DisplayTermAndCondition'
import Documents from "./Component/Documents"
import DisplayDocuments from './Component/DisplayDocuments'
import ConsolePicture from "./Component/ConsolePicture"
import DisplayConsolePicture from "./Component/DisplayConsolePicture"
import GamesPicture from "./Component/GamesPicture"
import DisplayGamesPicture from "./Component/DisplayGamesPicture"
import AccessoriesPicture from "./Component/AccessoriesPicture"
import DisplayAccessoriesPicture from "./Component/DisplayAccessoriesPicture"


import Header from './Component/ClientView/Header'
import Home from './Component/ClientView/Home'
import Footer from './Component/ClientView/Footer'
import ConsoleList from './Component/ClientView/ConsoleList'
import QtySpinner from './Component/ClientView/QtySpinner'
import ProductView from './Component/ClientView/ProductView'
import MobileRegistration from './Component/ClientView/MobileRegistration'
import SignUpForm from './Component/ClientView/SignUpForm'
import ShowCart from './Component/ClientView/ShowCart'
import PaymentGateWay from './Component/ClientView/PaymentGateWay'

import {BrowserRouter as Router,Route} from "react-router-dom"

function App(props) {
  return (

    <div>
      
      <Router>
        <Route
        strict
        exact
        component={CategoryInterface}
        path="/categoryinterface"
        history={props.history}>
        </Route>
      
        <Route
        strict
        exact
        component={DisplayAllCategory}
        path="/displayallcategory"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={AdminLogin}
        path="/adminlogin"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={AdminDashBoard}
        path="/admindashboard"
        history={props.history}>
        </Route>
      
        
        <Route
        strict
        exact
        component={SubCategoryInterface}
        path="/subcategoryinterface"
        history={props.history}>
        </Route>

        
        <Route
        strict
        exact
        component={DisplayAllSubCategories}
        path="/displayallsubcategories"
        history={props.history}>
        </Route>

         
        <Route
        strict
        exact
        component={GameInterface}
        path="/gameinterface"
        history={props.history}>
        </Route>
         
        <Route
        strict
        exact
        component={DisplayGames}
        path="/displaygames"
        history={props.history}>
        </Route>


         
        <Route
        strict
        exact
        component={AccessoriesInterface}
        path="/accessoriesinterface"
        history={props.history}>
        </Route>

         
        <Route
        strict
        exact
        component={DisplayAccessories}
        path="/displayaccessories"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={TermAndCondition}
        path="/termandcondition"
        history={props.history}>
        </Route>
      
        <Route
        strict
        exact
        component={DisplayTermAndCondition}
        path="/displaytermandcondition"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={Documents}
        path="/documents"
        history={props.history}>
        </Route>
      
        <Route
        strict
        exact
        component={DisplayDocuments}
        path="/displaydocuments"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={ConsolePicture}
        path="/consolepicture"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayConsolePicture}
        path="/displayconsolepicture"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={GamesPicture}
        path="/gamespicture"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayGamesPicture}
        path="/displaygamespicture"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={AccessoriesPicture}
        path="/accessoriespicture"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={DisplayAccessoriesPicture}
        path="/displayaccessoriespicture"
        history={props.history}>
        </Route>


        
        <Route
        strict
        exact
        component={Header}
        path="/header"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={Home}
        path="/home"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={Footer}
        path="/footer"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={ConsoleList}
        path="/consolelist"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={QtySpinner}
        path="/qtyspinner"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={ProductView}
        path="/productview"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={MobileRegistration}
        path="/mobileregistration"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={SignUpForm}
        path="/signupform"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={ShowCart}
        path="/showcart"
        history={props.history}>
        </Route>

        <Route
        strict
        exact
        component={PaymentGateWay}
        path="/paymentgateway"
        history={props.history}>
        </Route>



      </Router>
      
    
    </div>
  );
}

export default App;
