import { Box, Dialog, Typography, List, ListItem, styled } from "@mui/material";
import { React, useContext } from "react";

import { qrCodeImage } from "../constants/data";

import { GoogleLogin } from "@react-oauth/google";

import jwt_decode from "jwt-decode";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";

//handle Dialog css..
const dialogStyle = {
  height: "96%",
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
};

//handle Box style
const Component = styled(Box)`
  display: flex;
`;

const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;

const QRCode = styled("img")({
  height: 264,
  width: 264,
  margin: "50px 0 50px 50px",
});

const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

//style List

const StyleList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

function LoginDialog() {
  //set the value of account...
  const { setAccount } = useContext(AccountContext);

  //on successful login..
  const onLoginSuccess = async (res) => {
    // console.log(res);
    const decode = jwt_decode(res.credential);
    // console.log(decode);
    setAccount(decode);

    //call the api addUser on sucessfull login..
    await addUser(decode);
  };

  const onLoginError = (err) => {
    console.log("Login failed", err);
  };

  return (
    //Import Dialog
    //using paperprops for handling the css..
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
      <Component>
        <Container>
          <Title>To use ChillChat on your computer:</Title>
          <StyleList>
            <ListItem>1. Open ChillChat on your phone</ListItem>
            <ListItem>2. Tap Menu or and select Linked Devices</ListItem>
            <ListItem>3. Tap on Link a Device</ListItem>
            <ListItem>
              4. Point your phone to this screen to capture the code
            </ListItem>
          </StyleList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QRCode src={qrCodeImage} alt="qr Code" />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateX(25%)",
            }}
          >
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
}

export default LoginDialog;
