export class EntityModel {
    
    constructor(){
    }

    deserialize(input: any): this {        
        return Object.assign(this, input);
    }

}
