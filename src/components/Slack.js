import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Sidebar,MainContainer} from './';
import {auth,firestore} from '../firebase';
function useQuery(){
    return new URLSearchParams(useLocation().search);
}
function Slack(props){
    const {history}=props;
    const [channels,setChannels]=useState([]);
    const [currentChannel,setCurrentChannel]=useState({});
    const query=useQuery();
    const channelId=query.get('id');
    useEffect(() => {
        firestore
          .collection('channels')
          .where('members','array-contains',auth.currentUser.uid)
          .get()
          .then((snapshot)=>{
              const channel=snapshot.docs.map(doc=>{
                  return{
                      id:doc.id,
                      ...doc.data(),
                  }
              });
              setChannels(channel);
              console.log('Slack->channels',channel);
              if(!channelId){
                  history.push({
                      pathname:'/',
                      search:`?id=${channel[0].id}`,
                  });
                  setCurrentChannel(channel[0]);
              }
              else{
                  const filteredChannel=channel.filter((ch)=>ch.id === channelId);
                  setCurrentChannel(filteredChannel[0]);
              }
          })
          .catch((error)=>{
              console.log(error);
          });
    }, [channelId]);
        return(
            <div className="slack">
                <Sidebar channels={channels}/>
                <MainContainer channel={currentChannel}/>
            </div>
        );
}
export default Slack;