"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { User } from "@/lib/types"

interface UserCardProps {
  user: User
  onEdit: () => void
  onDelete: () => void
}

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gray-100 p-4 flex justify-center">
        <div className="relative h-24 w-24 rounded-full overflow-hidden">
          <Image
            src={user.avatar || "/placeholder.svg"}
            alt={`${user.first_name} ${user.last_name}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <CardContent className="p-4 text-center">
        <h3 className="text-lg font-semibold">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={onDelete} className="text-red-500 hover:text-red-700">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

