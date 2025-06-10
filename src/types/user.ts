export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    gender?: "Male" | "Female" | "Other";
    bio?: string;
    profile_image?: string;
    registration_date?: string;
    is_admin: boolean;
};