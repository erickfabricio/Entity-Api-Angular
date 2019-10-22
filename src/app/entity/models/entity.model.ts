export class EntityModel {

    descripciones: string[];
    valores: string[];
    campos: number;
        
    constructor() {
        //this.campos = 1;
    }

    deserialize(input: any): this {
        console.log(input);
        return Object.assign(this, input);
    }

   

}
