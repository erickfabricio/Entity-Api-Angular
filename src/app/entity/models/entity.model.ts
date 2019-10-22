export class EntityModel {
            
    public values: any[];

    constructor(){
        this.values = [];
    }

    public deserialize(input: any): this {
        
        this.values = Object.keys(input).map(function(_) { return input[_]; })

        console.log(input);        
        console.log(Object.assign(this, input));

        return Object.assign(this, input);
    }

    

   

}
