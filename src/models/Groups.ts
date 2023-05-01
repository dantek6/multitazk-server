import { prop, getModelForClass } from "@typegoose/typegoose";

class GROUP{
    @prop({ required: true, unique: true, trim: true })
    id: string

    @prop({ required: true })
    name: string

    @prop({ required: true })
    createdAt: Date

    @prop({ required: true })
    membersId: string[]

    @prop({ required: true })
    pastTasks: string[]

    @prop({ required: true })
    tasks: string[]

    @prop({ required: true })
    idAdmin: string

    @prop({ required: true })
    achievements: string[]
}

const GroupModel = getModelForClass(GROUP);
export default GroupModel;
