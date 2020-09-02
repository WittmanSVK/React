import React, {Component} from 'react';
import Layout from '../hoc/Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import Logout from '../containers/Auth/Logout/Logout';
import Auth from '../containers/Auth/Auth';
import {Route} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <div>
            <Layout>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/logout" component={Logout}/>
            </Layout>
            </div>
        );
    }
}

export default App;
