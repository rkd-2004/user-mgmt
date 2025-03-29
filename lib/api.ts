const BASE_URL = "https://reqres.in/api"

// Types
interface LoginResponse {
  token: string
}

interface UserData {
  first_name: string
  last_name: string
  email: string
}

interface UsersResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: any[]
}

// Authentication
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return response.json()
}

// Users
export async function fetchUsers(page = 1): Promise<UsersResponse> {
  const response = await fetch(`${BASE_URL}/users?page=${page}`)

  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }

  return response.json()
}

export async function updateUser(id: number, userData: UserData): Promise<any> {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Failed to update user")
  }

  return response.json()
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete user")
  }
}

