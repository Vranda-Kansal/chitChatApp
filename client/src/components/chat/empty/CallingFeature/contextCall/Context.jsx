import React, { useContext, useEffect, useRef, useState } from "react";
import { AccountContext } from "../../../../../context/AccountProvider";
import Peer from "simple-peer";

export const CallContext = React.createContext(null);

export const CallContextProvider = (props) => {
    const {socket, account} = useContext(AccountContext);

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [call, setCall] = useState({});

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((currentStream) => {
            // setMyStream(currentStream);
            setStream(currentStream);
            myVideo.current && (myVideo.current.srcObject = currentStream) ;
        });
        socket.current.on('CallHim', (data) => {
            const {signal, from, name: CallerName} = data;
            setCall({ isReceivingCall: true, from, name: CallerName, signal });
        });
        
    }, []);


    const answerCall = () => {
        setCallAccepted(true);
        
        navigator.mediaDevices.getUserMedia({
            video: {
                frameRate: 24,
                width: {
                    min: 480, ideal: 720, max: 1280
                },
                aspectRatio: 1.3333
            },
            audio: true
        }).then((currentStream) => {
            // userStream = currentStream;
            setStream(currentStream);
            // console.log("mine ", myVideo);
            myVideo.current.srcObject = currentStream;
        });
        const peer = new Peer({ initiator: false, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            socket.current.emit('answerCall', {signal: data, to: call.from});
        });

        peer.on('stream', (currentStream) => {
            // userStream.current = currentStream;
            // senders.current.push(currentStream);
            // console.log(myStream);
            userVideo.current &&  ( userVideo.current.srcObject = currentStream);
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    }

    const callUser = (data) => {
        const {from, to} = data;
        // console.log(to);
        navigator.mediaDevices.getUserMedia({
            video: {
                frameRate: 24,
                width: {
                    min: 480, ideal: 720, max: 1280
                },
                aspectRatio: 1.3333
            },
            audio: true
        }).then((currentStream) => {
            // console.log("mute stream ", myStream);
            setStream(currentStream);
            // console.log("mine ", myVideo);
            myVideo.current.srcObject = currentStream;
        });
        // console.log("mine2 ", myVideo);
        // myVideo.current.current && (myVideo.current.current.srcObject = stream);

        const peer = new Peer({ initiator: true, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            // console.log(account.name);
            socket.current.emit('CallUser', {userToCall: to, signalData: data, from: from,  account})
        });

        // socket.current.on('CallHim', (data) => {
        //     const {signal, from, name: CallerName} = data;
        //     console.log("Incoming call ", CallerName);
        //     setCall({ isReceivingCall: true, from, name: CallerName, signal });
        // });

        // console.log(stream);
        
        peer.on('stream', (currentStream) => {
            // userStream.current = currentStream;
            // senders.current.push(currentStream.getTracks());
            userVideo.current &&  (userVideo.current.srcObject = currentStream);
            // userVideo.current &&  (userVideo.current.srcObject = stream);
        });
       
        socket.current.on('CallAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }
    const leaveCall = () => {
        setCallEnded(true);

        console.log(connectionRef);
    
        connectionRef.current.destroy();
    
        window.location.reload();
    };


    return(
        <CallContext.Provider value={{
            call,
            callAccepted,
            callEnded,
            callUser,
            answerCall,
            leaveCall,
            myVideo,
            userVideo,
            stream,
            
        }}>
            {props.children}
        </CallContext.Provider>
    )
}