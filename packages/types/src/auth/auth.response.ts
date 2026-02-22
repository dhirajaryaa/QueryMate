export interface SignupData {
    user: {
        id: string
        email: string
        provider: "google" | "github" | "email" | "link" | null
    }
    token: string
}