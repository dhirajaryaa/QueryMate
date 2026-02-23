// signup request 
export interface SignupRequest {
    email: string;
    password: string;
    name?: string;
};
// login request 
export interface LoginRequest {
    email: string;
    password: string;
}; 