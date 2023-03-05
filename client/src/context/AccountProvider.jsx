//To check whether the user is login or not..
//to access that info in any component we need to globally declare it..
// for that the context is created..

import { useState, useRef } from "react";
import { useEffect } from "react";
import { createContext } from "react";

import {io} from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = (props) => {

    //account info
    const [account, setAccount] = useState();
    const [person, setPerson] = useState({});
    const [activeUsers, setactiveUsers] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);

    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:9000')
    }, [])

    return (
        <AccountContext.Provider value={{
            account,
            setAccount,
            person,
            setPerson,
            socket,
            activeUsers,
            setactiveUsers,
            newMessageFlag,
            setNewMessageFlag
        }}>
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;