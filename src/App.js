import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Index from './components/Index';
import Templates from './components/Templates';
import MemeGenerator from './components/MemeGenerator';
import Personal from './components/PersonalPage/Personal';
import Public from './components/PublicPage/Public';
import Setting from './components/SettingPage/Setting';
import AllMemes from './components/ExplorePage/AllMemes';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/templates" component={Templates} />
        <Route path="/meme-generator" component={MemeGenerator} />
        <Route path="/personal" component={Personal} />
        <Route path="/setting" component={Setting} />
        <Route path="/public/:id" exact component={Public}></Route>
        <Route path="/explorememes" component={AllMemes}></Route>
      </Switch>
    </div>
  );
}

export default App;
