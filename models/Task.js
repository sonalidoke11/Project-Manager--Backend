import mongoose from 'mongoose'

//here using named export since we need exact same schema in project model
export const taskSchema = new mongoose.Schema({
    projectId:{
        type: mongoose.Types.ObjectId,
        ref: 'Task', // use to connect Task and Project Model together
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},{timestamp:true})

const Task = new mongoose.model('Task',taskSchema)

export default Task;