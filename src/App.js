import './App.css';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Datasets, FeatureViews } from './pages';

function App() {
  return (
    <div className="App">
      <h1>Type /datasets or /featureviews on the address</h1>
      <h1>or click on one of the buttons below</h1>
      
      <BrowserRouter>
        <Link to='/datasets'>
          <button>Datasets</button>
        </Link>
        <Link to='/featureviews'>
          <button>Feature Views</button>
        </Link>

        <Switch>
          <Route exact path='/datasets' component={Datasets}/>
          <Route exact path='/featureviews' component={FeatureViews}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
