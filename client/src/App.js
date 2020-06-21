//Import React components
import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import custom components
import Home from './components/views/Home';
import Pharmacies from './components/views/pharmacies/Pharmacies';
import PharmaciesNew from './components/views/pharmacies/PharmaciesNew';
import NotFound from './components/views/NotFound';

//Import layouts
import './App.css';
import Layout from './components/layout/Layout';
import NavigationBar from './components/layout/NavigationBar';
import BottomNav from './components/layout/BottomNav';
import Jumbotron from './components/layout/Jumbotron';

//Main routing & display
function App() {
  return (
    <Fragment>
      <NavigationBar />
      <Jumbotron />
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/pharmacies' component={Pharmacies}></Route>
              <Route exact path='/pharmaciesnew' component={PharmaciesNew}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Router>
      </Layout>
      <BottomNav />
    </Fragment>
  );
}

export default App;