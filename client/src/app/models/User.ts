import { Basket } from '../models/Basket'

export interface User {
    email: string;
    token: string;
    basket?: Basket;
    roles?: string[];
}