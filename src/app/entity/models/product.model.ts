import { EntityModel } from './entity.model';

export class ProductModel extends EntityModel {

    static entity: string = "products";

    public id: string;
    public name: string;

    constructor() {
        super();        
    }

}