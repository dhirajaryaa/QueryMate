export interface SignupData {
    user: {
        id: string
        email: string
        name: string
        role: "user" | "admin"
    }
    token: string
}