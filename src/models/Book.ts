import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
});


export default model('Books', BookSchema);