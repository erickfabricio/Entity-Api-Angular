import { EntityModel } from './entity.model';
import { EntityInterface } from './entity.interface';

export class UserModel extends EntityModel {
        
    public id: string;
    public name: string;
    
    constructor() {        
        super();
        super.descripciones = ["id", "name"];
        super.valores = ["1", "A"];
        this.campos = 2;
        
    }

}