import React, { useEffect, useState } from 'react';
import { firestore,auth } from '../firebase';

function MainContainer(props){
    const {channel}=props;
    const [messages,setMessages]=useState([]);
    const [userMessage,setUserMessage]=useState('');
    function fetchMessages(){
        if(!channel.id){
            return;
        }
        firestore
            .collection('messages')
            .where('channel','==',channel.id)
            .orderBy('created_at','asc')
            .get()
            .then((snapshot)=>{
                const messages=snapshot.docs.map((doc)=>{
                    return {id:doc.id,...doc.data()};
                });
                setMessages(messages);
            })
            .catch((error)=>{
                console.error(error);
            });
    }
    //eslint-disable-next-line
    useEffect(()=>{
        fetchMessages();
    },[channel]);
    function handleUserMess(e){
        setUserMessage(e.target.value);
    }
    function onEnter(e){
         if(e.keyCode === 13 && channel.id && userMessage){
             const data={
                 from:{
                     id:auth.currentUser.uid,
                     name: auth.currentUser.displayName,
                 },
                 text:userMessage,
                 channel:channel.id,
                 created_at:new Date(),
             };
             firestore
                .collection('messages')
                .add(data)
                .then(()=>{
                    setUserMessage('');
                    fetchMessages();
                });
         }
    }
    return(
        <div className="MainContainer">
            <div className="channelDes">
                <div className="name">#</div>
                <div className="description"></div>
                <hr style={{color:"grey"}}></hr>
            </div>
            <div className="msgList">
                {messages.map((message)=>(
            <div className="message">
                <div className="left-block"><img src="https://www.flaticon.com/svg/static/icons/svg/2698/2698198.svg" alt="#"></img></div>
                <div className="right-block">
                    <div className="user">
                <div style={{fontSize:"18px", marginBottom:"15px"}}>{message.from.name}</div>
                        <span style={{fontSize:"12px",width:"100px"}}>2:22 PM</span>
                    </div>
                <div className="message-user">{message.text}</div>
                </div>
            </div>
                ))}
                </div>
            <footer>
            <div className="writeBox">
                <textarea 
                     placeholder="Type something..."
                     value={userMessage}
                     onChange={handleUserMess}
                     onKeyDown={onEnter}
                     ></textarea>
            </div>
            </footer>
        </div>
    );
}
export default MainContainer;