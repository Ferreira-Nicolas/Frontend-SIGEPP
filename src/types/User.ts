import { Role } from './Role';

export class User {
    id: number;
    name: string;
    role: Role;
    avatarPhoto?:string

    constructor(id: number, name: string, role: Role, avatarPhoto?:string) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.avatarPhoto = avatarPhoto
    }
}
