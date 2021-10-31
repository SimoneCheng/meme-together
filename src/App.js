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
import Meme from './components/MemePage/Meme';

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
        <Route path="/meme/:id" component={Meme} />
        <Route path="/public/:id" exact component={Public} />
        <Route path="/explorememes" component={AllMemes} />
      </Switch>
    </Router>
  );
}

export default App;
