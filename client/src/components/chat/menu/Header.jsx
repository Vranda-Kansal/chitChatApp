import { Avatar, Box, styled } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import {AccountContext} from '../../../context/AccountProvider';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/InfoDrawer';
import { useState } from 'react';

const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    padding: 8px 16px;
    display: flex;
    align-items: center;
`;

const Wrapper = styled(Box)`
    margin-left: auto;
    color: #54656f;
    & > *{
        margin-left: 2px;
        padding: 8px;
        font-size: 22px;
        margin-right: 8px;
    }
`;


function Header() {

    const [openDrawer, setopenDrawer] = useState(false);

    const {account} = useContext(AccountContext);

    const toggleDrawer = () => {
        setopenDrawer(true);
    }
  return (
    <div>
        <>
            <Component>
                <Avatar alt='Profile picture' src={account.picture} onClick= {() => toggleDrawer()} />
                <Wrapper>
                    <GroupsIcon/>
                    <DonutLargeOutlinedIcon />
                    <ChatIcon />
                    <HeaderMenu setopenDrawer={setopenDrawer}/>
                </Wrapper>
            </Component>
            {/* jo yha names se props pass kiye same usi se access hoge */}
            <InfoDrawer open={openDrawer} setopen={setopenDrawer} />
        </>
    </div>
  )
}

export default Header;