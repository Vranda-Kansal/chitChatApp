
import Conservation from "../model/Conversation.js";

export const newConversation = async (req, res) => {
    try{
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;

        const exist = await Conservation.findOne({ members: {$all : [receiverId, senderId]} });

        // console.log(exist);
        
        if(exist){
            return res.status(200).json("Conversation already exist");
        }

        const newConversation = new Conservation({
            members: [senderId, receiverId]
        })

        await newConversation.save();
        return res.status(200).json("Conversation saved successfully");
    }catch(err){
        return res.status(500).json(err.message);
    }
};

export const getConversation = async (req, res) => {
    try{
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
        
       let conversation = await Conservation.findOne({ members: {$all: [receiverId, senderId]} });
       return res.status(200).json(conversation);
    }catch(err){
        return res.status(500).json(err.message);
    }
};
