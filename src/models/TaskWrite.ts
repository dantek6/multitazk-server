import { Schema, model } from 'mongoose';

const taskWriteSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: Date,
    timeMin: Number,
    groupId: String,
    lengthMin: Number,
    points: Number,
},{
    timestamps: true
})

export default model('TaskWrite', taskWriteSchema)