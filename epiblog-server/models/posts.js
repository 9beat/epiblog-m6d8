import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    img : {
        type: String,
        required: false,
        default: "https://picsum.photos/400/400"
    },
    title: {
        type: String,
        required: true,
        max: 30
    },
    content: {
        type: String,
        required: true, 
    },
    author:{
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        max: 5,
        min: 0,
        default: 0
    },
})

const postModel = mongoose.model("postModel", PostSchema, "posts");

export default postModel