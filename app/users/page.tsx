"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Search, LogOut } from "lucide-react"
import UserCard from "@/components/user-card"
import EditUserDialog from "@/components/edit-user-dialog"
import DeleteConfirmDialog from "@/components/delete-confirm-dialog"
import type { User } from "@/lib/types"
import { fetchUsers, deleteUser } from "@/lib/api"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    loadUsers()
  }, [isAuthenticated, currentPage, router])

  useEffect(() => {
    if (users.length > 0) {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredUsers(filtered)
    }
  }, [searchQuery, users])

  const loadUsers = async () => {
    setIsLoading(true)
    try {
      const data = await fetchUsers(currentPage)
      setUsers(data.data)
      setFilteredUsers(data.data)
      setTotalPages(data.total_pages)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteUser = async () => {
    if (!selectedUser) return

    try {
      await deleteUser(selectedUser.id)
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      toast({
        title: "User deleted",
        description: "User has been deleted successfully.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setIsEditDialogOpen(false)
    setSelectedUser(null)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">User Management</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => handleEditUser(user)}
                onDelete={() => handleDeleteUser(user)}
              />
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <Card className="mt-4">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No users found</p>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
            >
              Previous
            </Button>
            <span className="flex items-center px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || isLoading}
            >
              Next
            </Button>
          </div>
        </>
      )}

      {selectedUser && (
        <>
          <EditUserDialog
            user={selectedUser}
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            onUserUpdated={handleUserUpdated}
          />
          <DeleteConfirmDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={confirmDeleteUser}
            userName={`${selectedUser.first_name} ${selectedUser.last_name}`}
          />
        </>
      )}
    </div>
  )
}

