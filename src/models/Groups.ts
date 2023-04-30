import { prop } from "@typegoose/typegoose";

class GROUP{
    @prop({ required: true, unique: true, trim: true })
    id: string

    @prop({ required: true })
    name: string

    @prop({ required: true })
    createdAt: Date

    @prop({ required: true })
    updatedAt: Date

    @prop({ required: true })
    membersId: string[]

    @prop({ required: true })
    tasksCompleted: string[]

    @prop({ required: true })
    tasks: string[]

    @prop({ required: true })
    idAdmin: string
}
