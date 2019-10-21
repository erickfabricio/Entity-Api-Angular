export class EntityApiModel {

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
