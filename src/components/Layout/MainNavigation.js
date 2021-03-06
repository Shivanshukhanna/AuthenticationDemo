import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Store/Cart-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const logoutHandeler=()=>{
    authCtx.logout()
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {
            isLoggedIn && (
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
            )
          }
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandeler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
