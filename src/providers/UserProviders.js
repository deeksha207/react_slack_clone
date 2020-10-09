import { auth,createOrGetUserProfileDocument} from '../firebase';
import React,{Component,createContext} from 'react';

const initializeUserState={users:null,loading: true};
export const UserContext=createContext(initializeUserState);
class UserProviders extends Component {
    state=initializeUserState;
    async componentDidMount(){
        // fired whenever
        auth.onAuthStateChanged(async (userAuth)=>{
            console.log('UserProviders->componentDidMount->userAuth',userAuth);
            if(userAuth){
                const userRef=await createOrGetUserProfileDocument(userAuth);
                console.log('userRef',userRef);
                userRef.onSnapshot(snapshot=>{
                   console.log('snapshot',snapshot);
                   console.log('snapshot data',snapshot.data());
                   this.setState({
                       user: {uid: snapshot.id,...snapshot.data()},
                       loading: false,
                   }); 
                });
            }
            this.setState({user:userAuth, loading:false});
        });
    }
    render() {
        const {user,loading}=this.state;
        const {children}=this.props;
        return (
        <UserContext.Provider value={{user,loading}} >
            {children}
        </UserContext.Provider>
        );
    }
}
 export default UserProviders;