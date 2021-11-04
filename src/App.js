import './App.css';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Datasets, FeatureViews } from './pages';

const Menu = () => { return (
    <>
      <h1>Type /datasets or /featureviews on the address</h1>
      <h1>or click on one of the buttons below</h1>
      <Link to='/datasets'>
        <button>Datasets</button>
      </Link>
      <Link to='/feature-views'>
        <button>Feature Views</button>
      </Link>
    </>
  );
};

const goBackButton = ({ location, history }) => 
  location.pathname !== '/'
  ? <>
      <button onClick={() => { history.goBack(); }}>
        Previous
      </button>
    </>
  : null;

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Menu}/>

        <Switch>
          <Route path='/datasets' component={Datasets}/>
          <Route path='/feature-views' component={FeatureViews}/>
        </Switch>
        
        <Route component={goBackButton}/>
      </Router>
    </div>
  );
}

export default App;
