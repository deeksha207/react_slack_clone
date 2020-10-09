import React,{useContext} from 'react';
import {Redirect} from 'react-router-dom'
import {signInWithGoogle} from '../firebase';
import { UserContext } from '../providers/UserProviders';
function SignIn(){
        //console.log(this.state.user);
        const auth=useContext(UserContext);
        if(auth.user){
            return <Redirect to="/" />;
        }
        return(
            <div>
                <h1>Sign IN</h1>
                <button onClick={signInWithGoogle}>Sign in</button>
                <br></br>
                
            </div>
        );
    }

export default SignIn;