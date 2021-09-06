import { useContext, useRef } from 'react';
import AuthContext from '../../Store/Cart-context';
import { useHistory } from 'react-router-dom';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext)
  const history=useHistory();
  const token = authCtx.token
  const passwordRef=useRef();
  async function submitHandler (event) {
    event.preventDefault();

    const enteredNewPassword = passwordRef.current.value;

  try {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCw436B57QFRRB-tv1gbHWXcmkPgKOnqTM',
      {
        method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
      })       
    const data=await response.json();
    if (response.ok) {
      console.log("Password Changed Sucessfully")
      history.replace('/');
    }
    else {

      let errorMessage = "Some error ocurred";
       
        alert(errorMessage)

      
    }
   
  }catch (error) {
      
    }
  }

  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
