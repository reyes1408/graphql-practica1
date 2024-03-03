import mongoose, { Schema } from "mongoose";
//import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
    nameUser: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    publications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'publicationSchema'
    }],
})

export default mongoose.model('User', userSchema);
