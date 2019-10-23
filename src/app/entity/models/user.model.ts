import { EntityModel } from './entity.model';

export class UserModel extends EntityModel {

    static entity: string = "users";

    public id: string;
    public name: string;
    public age: number;
    public mail: string;
    public password: string;
    public description: string;
    public state: string;
    public date: Date;

    constructor() {
        super();        
    }

}