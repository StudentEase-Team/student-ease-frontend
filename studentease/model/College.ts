import { Subject } from "./Subject";

export interface College {
    id: number,
    name: string,
    abbreviation: string,
    address: string,
    phoneNumber: string,
    email: string,
    subjects: Subject[]
}