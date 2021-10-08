import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Datasets from './Datasets';
import Featureviews from './Featureviews';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <h1>Type /datasets or /featureviews on the address</h1>
          <Route exact path='/datasets' component={Datasets}/>
          <Route exact path='/featureviews/' component={Featureviews}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
