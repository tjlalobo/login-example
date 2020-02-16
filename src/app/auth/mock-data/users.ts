import { UUID } from 'angular2-uuid';
import { User } from '../../login/models/user';

export const USERS: User[] = [
    {
        uuid: UUID.UUID(),
        email: "joe.bloggs@mail.com",
        password: "password123",
        firstName: "Joe",
        lastName: "Bloggs"
    }
]