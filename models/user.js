import mongoose, { Schema } from "mongoose";
//import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
    userName: {
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
        type: String,
        require: true
    },
    publications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'publicationSchema'
    }],
})

export default mongoose.model('User', userSchema);
