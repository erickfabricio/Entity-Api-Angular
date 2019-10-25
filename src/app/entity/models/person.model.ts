import { EntityModel } from './entity.model';

export class PersonModel extends EntityModel {

    static entity: string = "people";

    public id: string;
    public name: string;    

    constructor() {
        super();        
    }

}