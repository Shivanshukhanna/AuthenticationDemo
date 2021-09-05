import { useRef, useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLoading,setisLoading]=useState(true);
  const emailIdRef=useRef();
  const passwordRef=useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitButtonHandler=(event)=>{
    event.preventDefault();
    const enteredEmail=emailIdRef.current.value;
    const enteredPassword=passwordRef.current.value;

    if(isLogin){

    }
    else{
      {isLoading}
      let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCw436B57QFRRB-tv1gbHWXcmkPgKOnqTM'
      fetch(url,
        {
          method:'POST',
          body :JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
          }),
           headers:{
             'Content-Type':'application/json'
           }
        }).then(res=>{
          {setisLoading(false)}
          if(res.ok){

          }
          else{
            return res.json().then(data=>{
              const errorMessage="Signup Failed";
              if(data && data.error && data.error.message){
                errorMessage=data.error.message
              }
              console.log(data);
            })
          }
        })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitButtonHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailIdRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading &&<p>"Loading"</p>}
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
