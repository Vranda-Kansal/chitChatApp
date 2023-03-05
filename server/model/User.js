import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    iss : {
        type: String
    },
    sub: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },

});

const user = mongoose.model("user", userSchema);

export default user;