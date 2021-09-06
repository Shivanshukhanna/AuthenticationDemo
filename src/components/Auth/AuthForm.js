import { useContext, useRef, useState } from 'react';
import AuthContext from '../../Store/Cart-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const authCtx=useContext(AuthContext)
  const [isLoading, setisLoading] = useState(false);
  const emailIdRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  async function submitButtonHandler (event) {
    event.preventDefault();
    const enteredEmail = emailIdRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setisLoading(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCw436B57QFRRB-tv1gbHWXcmkPgKOnqTM'
    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCw436B57QFRRB-tv1gbHWXcmkPgKOnqTM'
    }
    try {
      const response = await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      setisLoading(false)        
      const data=await response.json();
      if (response.ok) {
        authCtx.login(data.idToken)
      }
      else {

        let errorMessage = "Signup Failed";
          if(data && data.error && data.error.message){
            errorMessage=data.error.message
          }
          alert(errorMessage)

        
      }
     
    }catch (error) {
        
      }
    
  }

return (
  <section className={classes.auth}>
    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
    <form onSubmit={submitButtonHandler}>
      <div className={classes.control}>
        <label htmlFor='email'>Your Email</label>
        <input type='email' id='email' required ref={emailIdRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Your Password</label>
        <input type='password' id='password' required ref={passwordRef} />
      </div>
      <div className={classes.actions}>
        {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
        {isLoading && <p>"Loading"</p>}
        <button
          type='button'
          className={classes.toggle}
          onClick={switchAuthModeHandler}
        >
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </button>
      </div>
    </form>
  </section>
);
};

export default AuthForm;
