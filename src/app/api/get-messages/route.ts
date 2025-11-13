import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const _user: User = session?.user;

    // ✅ Check authentication first
    if (!session || !_user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated",
            },
            { status: 401 }
        );
    }

    try {
        const userId = new mongoose.Types.ObjectId(_user._id);

        // ✅ Fetch user directly
        const user = await UserModel.findById(userId)
        .select("messages")
        .lean();

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }


        return Response.json(
            {
                success: true,
                messages: user.messages,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching messages:", error);
        return Response.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}
