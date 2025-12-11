import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // Registration logic here
    const { fullName, email, username, password } = req.body; // Access user data from req.body
    if([fullName, email, username, password].some((field)=> field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const exitedUser = await User.findOne({ 
        $or: [{ email }, { username }] })

        if (exitedUser) {
            throw new ApiError(409, "User with this email or username already exists");
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;
        // const coverImageLocalPath = req.files?.coverImage[0]?.path;
        let coverImageLocalPath;
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            coverImageLocalPath = req.files.coverImage[0].path;
        }

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar image is required");
        }

        const avatar = await uploadToCloudinary(avatarLocalPath);
        const coverImage = await uploadToCloudinary(coverImageLocalPath);

        if (!avatar) {
            throw new ApiError(500, "Failed to upload avatar image");
        }

        const newUser = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage ? coverImage.url : "",
            email,
            password,
            username: username.toLowerCase()
        });

        const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Failed to create user");
        }

        return res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        );

});

export { registerUser };