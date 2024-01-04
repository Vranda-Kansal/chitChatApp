

import { Avatar, Box, Typography, styled, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import Call from './CallingFeature/Call';
import { CallContextProvider } from './CallingFeature/contextCall/Context';

const Header = styled(Box)`
    height: 44px;
    background: #ededed;
    padding: 8px 16px;
    display: flex;
    align-items: center;
`;

const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const Status = styled(Typography)`
    margin-left: 12px !important;
    font-size: 12px;
    color: rgb(0, 0, 0, 0.6);
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    color: #54656f;
    & > svg {
        padding: 8px;
        font-size: 24px;
    }
`;

const ChatHeader = ({person, options}) => {

    const {activeUsers, setTo, to} = useContext(AccountContext);

    const handleChange = (e) => {
        setTo(e.target.value);
    }

  return (
    <CallContextProvider>
    <Header>
        <Avatar src={person.picture} alt="dp" sx = {{ width: 40, height: 40 }}/>
        <Box>
            <Name>{ person.name }</Name>
            <Status>{ activeUsers?.find(user => user.sub === person.sub) ? 'Online' : 'Offline' }</Status>
        </Box>
        <RightContainer>
            <Call />
            <SearchIcon />
            <MoreVertIcon />
            <FormControl size = "small" sx={{ minWidth: 160 }}>
            <InputLabel >Translate picker</InputLabel>
            <Select
                value={to}
                label="Translate picker"
                onChange={handleChange}
            >
                {
                    options.map( (opt) => (
                        <MenuItem key={opt.code} value={opt.code}>{opt.name}</MenuItem>
                    ))
                }
            </Select>
            </FormControl>
        </RightContainer>
    </Header>
    </CallContextProvider>
  )
}

export default ChatHeader;