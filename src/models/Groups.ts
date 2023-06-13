import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from 'mongoose';

const objectId = Types.ObjectId;

class GROUP extends TimeStamps{
    // @prop({ required: true, unique: true, trim: true })
    // id: string

    @prop({ required: true })
    name: string

    @prop({ type: [String], required: true })
    usersId: string[]

    @prop({ type: [String], required: true })
    tasksId: string[]

    @prop({ type: objectId, ref: 'UserModel',required: true })
    adminId: Types.ObjectId

    // @prop({ required: true })
    // achievements: string[]
}

const GroupModel = getModelForClass(GROUP);
export default GroupModel;
