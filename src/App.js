import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppHeader } from '@/features/layout';
import MemeGenerator from './components/MemeGenerator/MemeGenerator';
import Personal from './components/PersonalPage/Personal';
import Public from './components/PublicPage/Public';
import Setting from './components/SettingPage/Setting';
import Meme from './components/MemePage/Meme';
import UploadTemplate from './components/Templates/UploadTemplate';

const LandingPage = lazy(() => import('./pages/landing/landing.page'));
const PageNotFound = lazy(() => import('./pages/page-not-found/page-not-found.page'));
const ExploreMemes = lazy(() => import('./pages/explore-memes/explore-memes.page'));
const Search = lazy(() => import('./pages/search/search.page'));
const Templates = lazy(() => import('./pages/templates/templates.page'));

function App() {
  return (
    <>
      <AppHeader />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/templates" exact>
            <Templates />
          </Route>
          <Route path="/templates/:id">
            <MemeGenerator />
          </Route>
          <Route path="/personal" exact>
            <Personal />
          </Route>
          <Route path="/personal/meme-generator/:id">
            <MemeGenerator />
          </Route>
          <Route path="/setting">
            <Setting />
          </Route>
          <Route path="/meme/:id">
            <Meme />
          </Route>
          <Route path="/public/:id" exact>
            <Public />
          </Route>
          <Route path="/explore-memes">
            <ExploreMemes />
          </Route>
          <Route path="/uploadtemplate">
            <UploadTemplate />
          </Route>
          <Route path="/search/:query">
            <Search />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;