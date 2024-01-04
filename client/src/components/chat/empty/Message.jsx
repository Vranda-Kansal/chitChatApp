import { Box, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { formatDate, downloadMedia } from '../../../utils/common-utils';
import GetAppIcon from '@mui/icons-material/GetApp';
import {iconPDF} from "../../constants/data.js";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSpeechSynthesis } from 'react-speech-kit';
import axios from 'axios';

const Own = styled(Box)`
    background: #dcf8c6;
    max-width: 60%;
    margin-left:auto;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;
const Wrapper = styled(Box)`
    background: #FFFFFF;
    max-width: 60%;
    padding: 5px;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;
const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;
const Speaker = styled(VolumeUpIcon)`
    font-size: 16px;
    color: #919191;
    background: white;
    border-radius: 5px;
    padding: 2px 2px 2px 2px
`;

const Message = ({ message }) => {
    const {account, to} = useContext(AccountContext);

    const { speak, voices } = useSpeechSynthesis();



  return (
    <>
        {
            account.sub === message.senderId ?

                <Own>
                    {
                        message.type === 'file' ? <ImageMessage message = {message} /> : <>
                        <TextMessage message={message}
                        />
                        {/* {show.length ? <TextMessage message={show} /> : <TextMessage message={message} onMouseOver={() => translate()} />} */}
                        <Speaker onClick={() => speak({ text: message.text, voice: voices[1]})}/>
                        </> 
                    }
                    
                </Own>
            :
                <Wrapper>
                    {
                        message.type === 'file' ? <ImageMessage message = {message} /> : 
                        <>
                        <TextMessage message={message}/>
                        <Speaker onClick={() => speak({ text: message.text, voice: voices[1]})}/>
                        </>
                    }
                </Wrapper>

        }
    </>
  )
}

const ImageMessage = ({message}) => {


    return(
        <Box style={{position: 'relative'}}>
            {
                message?.text?.includes('.pdf') ? 
                <Box style={{display: 'flex'}}>
                    <img src={iconPDF} alt="pdf" style={{width: 80}} />
                    <Typography style={{fontsize: 14}}>{message.text.split('/').pop()}</Typography>
                </Box>
                :
                <img style={{ width: 300, height: '100%', objectFit: 'cover'}} src={message.text} alt = {message.text} />
            }
            <Time style={{position: 'absolute', bottom: 0, right: 0}} >
            <GetAppIcon 
                onClick={(e) => downloadMedia(e, message.text)}
                style={{marginRight: 10, border: '1px solid grey', borderRadius: '50%'}}
                fontSize = 'small'
            />
            {formatDate(message.createdAt)}</Time>
        </Box>
    )
}

const TextMessage  = ({ message}) => {

    const { to} = useContext(AccountContext);

    const [show, setShow] = useState('');
    const [flag, setFlag] = useState(false);

    const handleMouseOver = () => {
        translate();
    }

    const handleMouseOut = () => {
        setFlag(false);
        // setShow(message.text);
    }

    const translate = () => {
        // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
       console.log("Captured")
        const params = new URLSearchParams();
        params.append('q', message.text);
        params.append('source', 'auto');
        params.append('target', to);
        params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    
        axios.post('https://libretranslate.de/translate',params, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(res=>{
          console.log(res.data)
        //   message = res.data.translatedText
            setFlag(true);
          setShow(res.data.translatedText);
          console.log(show);
        })
      };
    return (
        <>
        {
            !flag ?
            <>
                <Text onMouseOver={handleMouseOver}>{message.text}</Text>
                <Time>{formatDate(message.createdAt)}</Time>
            </>
             :
            <>
                <Text onMouseOut={handleMouseOut}>{show}</Text>
                <Time>{formatDate(message.createdAt)}</Time>
            </>
        }
        </>
    )
}

export default Message;