import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './style/App.css';
import Home from './views/Home'
import Navigation from './components/Navigation'

function App() {
  return (
    <BrowserRouter>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route path='/' component={ Home } />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
