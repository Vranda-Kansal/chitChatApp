import { Box, Divider, styled } from '@mui/material';
import { useEffect, useState, useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider';
import { getUsers } from '../../../service/api';
import EachConversation from './EachConversation';

const Component = styled(Box)`
    height: 81vh;
    overflow: overlay;
`;

const DividerStyle = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;


const Conversation = ({ text }) => {

    const [users, setUsers] = useState([]);

    const { account , socket, setactiveUsers} = useContext(AccountContext);


    useEffect(() => {
        const fetchData = async () => {
           let response =  await getUsers();
           const filterData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
           setUsers(filterData);
        //    console.log(users);
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit("addUsers", account);
        socket.current.on("getUsers", users => {
            setactiveUsers(users);
        })
    }, [account]);


  return (
    <Component>
        {
            users.map(user => (
                user.sub !== account.sub &&
                <>
                    <EachConversation user={user} />
                    <DividerStyle />
                </>
            ))
        }
    </Component>
  )
}

export default Conversation;