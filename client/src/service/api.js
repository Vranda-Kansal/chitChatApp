import axios from 'axios';

//backend ki api localhost8000 pr run krra h... express ka toh vo url h

const url = "http://localhost:8000";

//axios post api for adding data to the backend;

export const addUser = async (data) => {
    try{
        //decide krna h end point kha pe hit krega..
        await axios.post(`${url}/add`, data);
    }catch(err){
        console.log("Error will calling axios addUser", err.message);
    }
};

export const getUsers = async () => {
    try{
        let result = await axios.get(`${url}/users`);
        // console.log(result);
        return result.data;
    }catch(err){
        console.log("Error in fetching all the users", err.message);
    }
};

export const setConversation = async (data) => {
    try{
        await axios.post(`${url}/conversation/add`, data);
    }catch(err){
        console.log("Error in setConveration all the users", err.message);
    }
};

export const getConversation = async (data) => {
    try{
       let response =  await axios.post(`${url}/conversation/get`, data);
       return response.data;
    }catch(err){
        console.log("Error while getting conversation", err.message);
    }
};

export const newMessage = async (data) => {
    try{
        await axios.post(`${url}/message/add`, data);
    }catch(err){
        console.log("Error while push the mesaage in database", err.message);
    }
};

export const getMessage = async (id) => {
    try{
      let messages =  await axios.get(`${url}/message/get/${id}`);
      return messages.data;
    }catch(err){
        console.log("Error while fetching messages", err.message);
    }
};

export const updateFile = async (data) => {
    try{
       return await axios.post(`${url}/file/upload`, data);
    }catch(err){
        console.log("Error in update the file", err.message);
    }
};