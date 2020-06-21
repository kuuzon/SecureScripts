//Import React components
import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import custom components
import Home from './components/Home';
import NotFound from './components/NotFound';

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
            <Route component={NotFound}></Route>
          </Switch>
        </Router>
      </Layout>
      <BottomNav />
    </Fragment>
  );
}

export default App;