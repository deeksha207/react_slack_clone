import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { signOut } from '../firebase';

class Sidebar extends Component{
    render(){
    const {channels}=this.props;
    return(
        <div className="sidebar">
            <div className="user">
                <div className="user-icon">
                    <img src="https://www.flaticon.com/svg/static/icons/svg/3237/3237472.svg" alt="#"></img>
                </div>
                <div className="ronal">Ronald</div>
                <div className="logout" onClick={signOut}><img src="https://www.flaticon.com/svg/static/icons/svg/3308/3308738.svg" alt="#"></img></div>
                </div>
                <hr></hr>
                <div className="channel">
                <div>Channels</div>
                <ul className="channelsList">
                    {channels.map((channel)=>(
                        <li key={channel.id}>
                            <Link to={`/?id=${channel.id}`}>#{channel.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
    }
}
export default Sidebar;