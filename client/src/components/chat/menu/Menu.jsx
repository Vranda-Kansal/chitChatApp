import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Conversation from './Conversation'
import Header from './Header'
import Search from './Search'

function Menu() {

  const [text, setText] = useState('');

  return (
    <Box>
        <Header />
        <Search setText = {setText} />
        <Conversation  text = {text} />
    </Box>
  )
}

export default Menu