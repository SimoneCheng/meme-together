import { lazy, Suspense, useLayoutEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PrivateRoute, checkLoginStatus } from '@/features/auth';
import { AppHeader } from '@/features/layout';
import { setUserData } from './redux/actions';
import MemeGenerator from './components/MemeGenerator/MemeGenerator';
import Public from './components/PublicPage/Public';
import Meme from './components/MemePage/Meme';

const LandingPage = lazy(() => import('@/pages/landing/landing.page'));
const PageNotFound = lazy(() => import('@/pages/page-not-found/page-not-found.page'));
const ExploreMemes = lazy(() => import('@/pages/explore-memes/explore-memes.page'));
const Search = lazy(() => import('@/pages/search/search.page'));
const Templates = lazy(() => import('@/pages/templates/templates.page'));
const TemplateUploading = lazy(() => import('@/pages/template-uploading/template-uploading.page'));
const Settings = lazy(() => import('@/pages/settings/settings.page'));
const Personal = lazy(() => import('@/pages/personal/personal.page'));
const NewPublic = lazy(() => import('@/pages/public/public.page'));

function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    checkLoginStatus((user) => {
      dispatch(setUserData(user));
    });
  }, [dispatch]);

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
          <PrivateRoute path="/personal" exact>
            <Personal />
          </PrivateRoute>
          <Route path="/personal/meme-generator/:id">
            <MemeGenerator />
          </Route>
          <PrivateRoute path="/settings">
            <Settings />
          </PrivateRoute>
          <Route path="/meme/:id">
            <Meme />
          </Route>
          <Route path="/public/:id" exact>
            {/* <Public /> */}
            <NewPublic />
          </Route>
          <Route path="/explore-memes">
            <ExploreMemes />
          </Route>
          <PrivateRoute path="/template-uploading">
            <TemplateUploading />
          </PrivateRoute>
          <Route path="/search/:query">
            <Search />
          </Route>
          <Route path="/404" exact>
            <PageNotFound />
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