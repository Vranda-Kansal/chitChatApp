import { Box, styled  } from "@mui/material";
import React, { useContext } from "react";
import { CallContext } from "./contextCall/Context";
import CallEndIcon from '@mui/icons-material/CallEnd';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';

const VCall = styled(Box)`
    position: absolute;
    top: 54px;
    left: 30%;
    width: 50%;
    height: 70%;
`;

const MyVideo = {

    position: "absolute",
    top: "0",
    left: "0",
    margin: "16px",
    borderRadius: "16px",
    width: "30%",
    height: "40%",
    background: "#fff",
}

const UserVideo = {

    background: "#000000",
    width: "100%",
    height: "100%",
    borderRadius: "16px",
}


const CallEnd = styled(Box)`
    position: absolute;
    bottom: 30px;
    left: 50%;
    &> svg {
        padding: 6px;
        margin: 5px;
        color: white;
        border-radius: 50%

    }
`;


const Calling = () =>  {
    const { myVideo, userVideo, leaveCall, stream, callAccepted, callEnded, shareScreen} = useContext(CallContext);
    

  return (

    
 <VCall>
        {
            <video playsInline ref={myVideo} autoPlay style={MyVideo} />
        }
		{
            <video playsInline ref={userVideo} autoPlay style={UserVideo} />
        }
        <PresentToAllIcon onClick={shareScreen} />
        <CallEnd>
            <CallEndIcon sx={{background: "red"}} onClick={leaveCall} />
          
        </CallEnd>

  </VCall> 

  )
}
export default Calling

