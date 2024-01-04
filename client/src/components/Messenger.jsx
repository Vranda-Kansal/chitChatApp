import { React, useContext } from "react";
import LoginDialog from "./account/LoginDialog";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import { AccountContext } from "../context/AccountProvider";
import ChatDialog from "./chat/ChatDialog";

//Styling the header..
const Header = styled(AppBar)`
  height: 220px;
  background-color: #cab8d4;
  box-shadow: none;
`;
const Component = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

//styling the Chat Header...
const ChatHeader = styled(AppBar)`
  height: 125px;
  background-color: #cab8d4;
  box-shadow: none;
`;

function Messenger() {
  const { account } = useContext(AccountContext);

  return (
    <Component>
      {/* if user is logged in then show ChatDialog else show LoginDialog */}
      {account ? (
        <>
          <ChatHeader>
            <Toolbar></Toolbar>
          </ChatHeader>
          <ChatDialog />
        </>
      ) : (
        <>
          <Header>
            <Toolbar></Toolbar>
          </Header>
          <LoginDialog />
        </>
      )}
    </Component>
  );
}

export default Messenger;
