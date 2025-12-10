import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,// URL to the user's avatar image
            required: true
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }

    }, { timestamps: true }
);

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function () {
    jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )

}
userSchema.methods.generateRefreshToken = function () {
    jwt.sign({
        _id: this._id,
    },
    process.env.REFERESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFERESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", UserSchema);