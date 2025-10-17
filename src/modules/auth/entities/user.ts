import { Company } from "./company"

export interface User {
    userId: number
    userCode: string
    userName: string
    token: string
    company: Company[]
}