import { Route, Switch } from 'react-router-dom';

import { AppHeader } from '@/features/layout';
import { LandingPage } from '@/pages/landing';
import { PageNotFound } from '@/pages/page-not-found';
import { ExploreMemes } from '@/pages/explore-memes';
import { Search } from '@/pages/search';
import Templates from './components/Templates/Templates';
import MemeGenerator from './components/MemeGenerator/MemeGenerator';
import Personal from './components/PersonalPage/Personal';
import Public from './components/PublicPage/Public';
import Setting from './components/SettingPage/Setting';
import Meme from './components/MemePage/Meme';
import UploadTemplate from './components/Templates/UploadTemplate';

function App() {
  return (
    <>
      <AppHeader />
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
    </>
  );
}

export default App;