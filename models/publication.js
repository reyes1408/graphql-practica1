import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
})

export default mongoose.model('Publication', publicationSchema);
