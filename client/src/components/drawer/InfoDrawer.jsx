import { Box, Drawer, Typography, styled } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Profile from './Profile';

const drawerStyle = {
    left: 20,
    top: 15,
    height: '96%',
    width: '29.3%',
    boxShadow: 'none'
}

const Header = styled(Box)`
    display: flex;
    background: #008069;
    height: 109px;
    color: #FFFFFF;
    & > svg, & > p{
        margin-top: auto;
        padding: 15px;
        font-weight: 600
    }
`;

const Component = styled(Box)`
    background: #ededed;
    height: 85%
`;

const Text = styled(Typography)`
    font-size: 18px;
`;

function InfoDrawer({open, setopen}) {

    const handleClose = () =>{
        setopen(false);
    }

  return (
    <Drawer
        open= {open}
        onClose= {handleClose}
        PaperProps= {{ sx: drawerStyle }}
        style= {{ zIndex: 1300 }}
    >
        <Header>
            <ArrowBackIcon onClick= { () => setopen(false)} />
            <Text>Profile</Text>
        </Header>
        <Component>
            <Profile />
        </Component>
    </Drawer>
  )
}

export default InfoDrawer;