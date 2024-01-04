import { Box, Dialog, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import ChatBox from "./empty/ChatBox";
import EmptyChat from "./empty/EmptyChat";
import Menu from "./menu/Menu";

//handle Box style
const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)`
  min-width: 450px;
`;

const RightComponent = styled(Box)`
  width: 73%;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid #cab8d4;
`;

//handle Dialog css..
const dialogStyle = {
  height: "96%",
  width: "100%",
  margin: "20px",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
  borderRadius: "0",
};

function ChatDialog() {
  const { person, socket, account } = useContext(AccountContext);

  useEffect(() => {
    socket.current.emit("sender", { account });
  }, []);
  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={true}
      maxWidth={"md"}
    >
      <Component>
        {/* all contact will show up here..  */}
        <LeftComponent>
          <Menu />
        </LeftComponent>
        {/* individual chat would be look up here...  */}
        <RightComponent>
          {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
        </RightComponent>
      </Component>
    </Dialog>
  );
}

export default ChatDialog;
