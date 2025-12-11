import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },


},{ Timestamps: true })

export const Subsrription = mongoose.model("Subscription", subscriptionSchema); 