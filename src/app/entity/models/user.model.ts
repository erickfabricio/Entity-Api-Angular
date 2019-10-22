import { EntityModel } from './entity.model';

export class UserModel extends EntityModel {
        
    public id: string;
    public name: string;
    
    constructor(){
        super();
    }
}