import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import { LandingPage } from '@/pages/landing';
import { PageNotFound } from '@/pages/page-not-found';
import Templates from './components/Templates/Templates';
import MemeGenerator from './components/MemeGenerator/MemeGenerator';
import Personal from './components/PersonalPage/Personal';
import Public from './components/PublicPage/Public';
import Setting from './components/SettingPage/Setting';
import AllMemes from './components/ExplorePage/AllMemes';
import Meme from './components/MemePage/Meme';
import UploadTemplate from './components/Templates/UploadTemplate';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={LandingPage} />
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
    </>
  );
}

export default App;