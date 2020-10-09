import React,{useContext} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {Slack,SignIn} from './';
import {UserContext} from '../providers/UserProviders';
const PrivateRoute=(props)=>{
    const {component:Component,isLoggedIn,...others}=props;
    return( <Route
    {...others}
    render={(newProps)=>{
        if(isLoggedIn){
            return <Component {...newProps} />
        }
        return(
            <Redirect
              to={{
                  pathname:'/login',
                  state: {
                      from: props.location,
                  },
              }}
            />
        );
    }}
    />
    );
};
function App(){
    const auth=useContext(UserContext);
    console.log('auth',auth);
    if(auth.loading){
        return <h1>Loading...</h1>
    }
    return(
        <div>
            <Switch>
                <Route exact path="/login" component={SignIn}></Route>
                <Route exact path="/signup" component={SignIn}></Route>
                <PrivateRoute 
                exact 
                path="/" 
                component={Slack} 
                isLoggedIn={auth.user ? true:false}/>
            </Switch>
        </div>
    );
}

export default App;