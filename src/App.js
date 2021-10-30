import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Index from './components/Index';
import Templates from './components/MemeGenerator/Templates';
import MemeGenerator from './components/MemeGenerator/MemeGenerator';
import Personal from './components/PersonalPage/Personal';
import Public from './components/PublicPage/Public';
import Setting from './components/SettingPage/Setting';
import AllMemes from './components/ExplorePage/AllMemes';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/templates" exact component={Templates} />
        <Route path="/templates/:id" component={MemeGenerator} />
        <Route path="/personal" exact component={Personal} />
        <Route path="/personal/meme-generator/:id" component={MemeGenerator} />
        <Route path="/setting" component={Setting} />
        <Route path="/public/:id" exact component={Public}></Route>
        <Route path="/explorememes" component={AllMemes}></Route>
      </Switch>
    </Router>
  );
}

export default App;
