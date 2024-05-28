import { lazy, Suspense, useLayoutEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  PrivateRoute,
  checkLoginStatus,
  useIsAuthenticated,
  useAuthId
} from '@/features/auth';
import { AppHeader } from './_app-header';

// pages
const Landing = lazy(() => import('./landing/page'));
const PageNotFound = lazy(() => import('./not-found/page'));
const ExploreMemes = lazy(() => import('./explore-memes/page'));
const Search = lazy(() => import('./search/page'));
const Templates = lazy(() => import('./templates/page'));
const TemplateUploading = lazy(() => import('./template-uploading/page'));
const Settings = lazy(() => import('./settings/page'));
const Personal = lazy(() => import('./personal/page'));
const Public = lazy(() => import('./public/page'));
const Meme = lazy(() => import('./meme/page'));
const PersonalMemeGenerator = lazy(() => import('./personal/meme-generator/[id]/page'));
const TemplateMemeGenerator = lazy(() => import('./templates/[id]/page'));

function App() {
  const dispatch = useDispatch();
  const [, setIsAuthenticated] = useIsAuthenticated();
  const [, setAuthId] = useAuthId();
  useLayoutEffect(() => {
    checkLoginStatus((user) => {
      setIsAuthenticated(!!user);
      setAuthId(user.user_id);
    });
  }, [dispatch, setAuthId, setIsAuthenticated]);

  return (
    <>
      <AppHeader />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (<Landing />)}
          />
          <Route
            path="/templates"
            exact
            render={() => (<Templates />)}
          />
          <Route
            path="/templates/:id"
            render={() => (<TemplateMemeGenerator />)}
          />
          <PrivateRoute
            path="/personal"
            exact
            render={() => (<Personal />)}
          />
          <Route
            path="/personal/meme-generator/:id"
            render={() => (<PersonalMemeGenerator />)}
          />
          <PrivateRoute
            path="/settings"
            render={() => (<Settings />)}
          />
          <Route
            path="/meme/:id"
            render={() => (<Meme />)}
          />
          <Route
            path="/public/:id"
            exact
            render={() => (<Public />)}
          />
          <Route
            path="/explore-memes"
            render={() => (<ExploreMemes />)}
          />
          <PrivateRoute
            path="/template-uploading"
            render={() => (<TemplateUploading />)}
          />
          <Route
            path="/search/:query"
            render={() => (<Search />)}
          />
          <Route
            path="/404"
            exact
            render={() => (<PageNotFound />)}
          />
          <Route
            path="*"
            render={() => (<PageNotFound />)}
          />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
