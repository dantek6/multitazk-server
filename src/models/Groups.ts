import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class GROUP extends TimeStamps{
    // @prop({ required: true, unique: true, trim: true })
    // id: string

    @prop({ required: true })
    name: string

    @prop({ required: true })
    usersId: string[]

    @prop({ required: true })
    tasksId: string[]

    @prop({ required: true })
    AdminId: string

    @prop({ required: true })
    achievements: string[]
}

const GroupModel = getModelForClass(GROUP);
export default GroupModel;
