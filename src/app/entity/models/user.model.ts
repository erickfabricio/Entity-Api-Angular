import { EntityModel } from './entity.model';

export class UserModel extends EntityModel {

    static entity: string = "users";

    public id: string;
    public name: string;

    constructor() {
        super();
    }

}