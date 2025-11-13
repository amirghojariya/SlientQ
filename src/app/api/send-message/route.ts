import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect()

    const { username, content } = await request.json()
    try {
        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },

                { status: 404 }
            )
        }

        // is user accepting the messages

        if (!user.isAcceptingMessages) {
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting the messages"
                },

                { status: 403 }
            )
        }

        const newMessage = { content, createdAT: new Date() }
        user.messages.push(newMessage as unknown as Message)
        await user.save()

        return Response.json(
            {
                success: true,
                message: "Message send sucessfully"
            },

            { status: 200 }
        )

    } catch (error) {
        console.log("Error adding mesages", error)
        return Response.json(
            {
                success: false,
                message: "Internal server error"
            },

            { status: 500 }
        )
    }
}