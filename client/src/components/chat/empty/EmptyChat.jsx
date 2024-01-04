import { Box, Typography, styled } from "@mui/material";
import React from "react";
import emptyChatImage from "../../constants/ChatLogo.png";

const Component = styled(Box)`
  background: #f8f9fa;
  padding: 30px 0px;
  text-align: center;
  height: 100vh;
`;

const Container = styled(Box)`
  padding: 0 200px;
`;

const Image = styled("img")({
  width: 400,
  marginTop: 100,
});

const Title = styled(Typography)`
  font-size: 32px;
  margin: 25px 0 10px 0;
  font-family: inherit;
  font-weight: 300;
  color: #41525d;
`;

const SubTitle = styled(Typography)`
  font-size: 14px;
  color: #667781;
  font-weight: 400;
  font-family: inherit;
`;

function EmptyChat() {
  return (
    <Component>
      <Container>
        <Image src={emptyChatImage} alt="empty chat" />
        <Title>ChitChat Web</Title>
        <SubTitle>
          Send and receive messages without keeping your phone online.
        </SubTitle>
      </Container>
    </Component>
  );
}

export default EmptyChat;
