import { Box } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { getConversation } from '../../../service/api';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import axios from 'axios';


function ChatBox() {
    const {person, account} = useContext(AccountContext);

    const [options, setOptions] = useState([]);

    const [conversation, setConveration] = useState({});

    useEffect(() => {
      const getConversationDetails = async () => {
        let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
        console.log(data);
        setConveration(data);
      }
      getConversationDetails();
      
    }, [person.sub]);

    useEffect(() => {
      axios
        .get('https://libretranslate.de/languages', {
          headers: { accept: 'application/json' },
        })
        .then((res) => {
          console.log(res.data);
          setOptions(res.data);
        });
    }, [person.sub]);

  return (
    <Box>
        <ChatHeader  person={person} options = {options} />
        <Messages person={person} conversation={conversation} />
    </Box>
  )
}

export default ChatBox;