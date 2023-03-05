import React from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Menu, MenuItem, styled } from '@mui/material';
import { useState } from 'react';


const Item = styled(MenuItem)`
    font-size: 14px;
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`


function HeaderMenu({ setopenDrawer }) {

    const [open, setOpen] = useState(null);

    const handleClose = () => {
        setOpen(null);
    }

    const handleClick = (e) => {
        setOpen(e.currentTarget);
    }
  return (
    <>
        <MoreVertOutlinedIcon onClick={handleClick}/>
        <Menu
            anchorEl={open}
            open={open}
            onClose={handleClose}
            getContentAnchorE1 = {null}
            anchorOrigin ={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin= {{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <Item onClick={ () => {handleClose(); setopenDrawer(true); }}>Profile</Item>
      </Menu>
    </>
  )
}

export default HeaderMenu;