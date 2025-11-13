'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Message } from "@/model/User"
import { useToast } from "./ui/use-toast"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
}

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {

    const { toast } = useToast()

    const handleDeleteConfirm = async () => {
        const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
        toast({
            title: response.data.message,
        })
        onMessageDelete(message._id)
    }

    return (
        <Card>
            <CardHeader className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg font-semibold">
                        {message.content}
                    </CardTitle>
                    <CardDescription>
                        {new Date(message.createdAT).toLocaleString()}
                    </CardDescription>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                            <X className="w-5 h-5" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Message?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. The message will be permanently deleted.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardHeader>

            <CardContent></CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}
