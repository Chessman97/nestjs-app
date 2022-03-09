export interface UserData {
    id: number
    phone: string
    email: string
    token: string
}

export interface UserRO {
    user: UserData
}
