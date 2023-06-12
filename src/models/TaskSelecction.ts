import { prop, getModelForClass } from '@typegoose/typegoose';
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class TaskSelection extends TimeStamps {
    // @prop({ required: true, unique: true, trim: true })
    // id: string

    @prop({ required: true })
    title: string

    @prop()
    instruction: string

    @prop()
    date: Date

    // @prop()
    // timeMin: number

    @prop({ required: true })
    groupId: string

    @prop()
    lengthMin: number

    @prop()
    points: number

}

const TaskSelectionModel = getModelForClass(TaskSelection);
export default TaskSelectionModel;