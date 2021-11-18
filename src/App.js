import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Index from './components/Index';
import Templates from './components/Templates/Templates';
import MemeGenerator from './components/MemeGenerator/MemeGenerator';
import Personal from './components/PersonalPage/Personal';
import Public from './components/PublicPage/Public';
import Setting from './components/SettingPage/Setting';
import AllMemes from './components/ExplorePage/AllMemes';
import Meme from './components/MemePage/Meme';
import UploadTemplate from './components/Templates/UploadTemplate';
import PageNotFound from './components/404';

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
        <Route path="/uploadtemplate" component={UploadTemplate} />
        <Route path="/search" component={AllMemes} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
