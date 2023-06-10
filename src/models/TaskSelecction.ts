import { prop, getModelForClass } from '@typegoose/typegoose';

class TaskSelection {
    // @prop({ required: true, unique: true, trim: true })
    // id: string

    @prop({ required: true })
    title: string

    @prop()
    description: string

    @prop()
    date: Date

    @prop()
    timeMin: number

    @prop({ required: true })
    groupId: string

    @prop()
    lengthMin: number

    @prop()
    points: number

    @prop({ required: true })
    createdAt: Date

    @prop({ required: true })
    updatedAt: Date

}

const TaskSelectionModel = getModelForClass(TaskSelection);
export default TaskSelectionModel;