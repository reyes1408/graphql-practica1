import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    createDate: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        default: 0
    },
})

export default mongoose.model('Publication', publicationSchema);
