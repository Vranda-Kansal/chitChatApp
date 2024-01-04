import { Avatar, Box, styled, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

const Image = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 25px 0px;
`;

const BoxWrapper = styled(Box)`
  background: #ffffff;
  padding: 12px 30px 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  &: first-child {
    font-size: 13px;
    color: #009688;
    font-weight: 200;
  }

  &: last-child {
    margin: 14px 0;
    color: #4a4a4a;
  }
`;

const DescriptionContainer = styled(Box)`
  padding: 15px 20px 28px 30px;
  & > p {
    font-size: 13px;
    color: #8696a0;
    font-weight: 400;
  }
`;

function Profile() {
  const { account } = useContext(AccountContext);
  return (
    <>
      <Image>
        <Avatar
          src={account.picture}
          alt="dp"
          sx={{ width: 200, height: 200 }}
        />
      </Image>
      <BoxWrapper>
        <Typography>Your name</Typography>
        <Typography>{account.name}</Typography>
      </BoxWrapper>
      <DescriptionContainer>
        <Typography>
          This is not your username or pin. This name will be visible to your
          ChitChat friends.
        </Typography>
      </DescriptionContainer>
      <BoxWrapper>
        <Typography>About</Typography>
        <Typography>Eat! Sleep! Code!</Typography>
      </BoxWrapper>
    </>
  );
}

export default Profile;
