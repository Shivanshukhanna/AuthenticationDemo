import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './Store/Cart-context';

function App() {
 const useCtx=useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!useCtx&&(
          <Route path='/auth'>
          <AuthPage />
        </Route>
        )}
        {useCtx.isLoggedIn &&(<Route path='/profile'>
          <UserProfile />
        </Route>)}
      </Switch>
    </Layout>
  );
}

export default App;
