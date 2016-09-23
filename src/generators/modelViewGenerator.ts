import { Swagger } from '../swagger';
import { EnumGeneration } from './enumViewGenerator';

export namespace ModelGeneration {

    export class ModelView {
        public name: string;
        public properties: PropertyView[];
        public enums: EnumGeneration.EnumViewCollection;
        public linkedModels: string[];

        constructor() {
            this.properties = [];
            this.linkedModels = [];
            this.enums = new EnumGeneration.EnumViewCollection;
        }
    }

    export class ModelViewCollection {
        [modelName: string]: ModelView;
        constructor() {
        }
    }

    export class PropertyView {
        public name: string;
        public description: string;
        public type: string;
        public isArray: boolean;
        public isRequired: boolean;

        constructor() {
            this.isArray = false;
            this.isRequired = false;
        }
    }

    export class ModelGenerator {
        constructor(private enumGenerator: EnumGeneration.EnumGenerator = new EnumGeneration.EnumGenerator) {
        }

        public GenerateModel(name: string, definition: Swagger.Schema): ModelView {

            var modelView: ModelView = new ModelView();
            modelView.name = name;

            for (var property in definition.properties) {
                if (definition.properties.hasOwnProperty(property)) {
                    var propertyView: PropertyView = new PropertyView();
                    propertyView.name = property;
                    var propertyDesc = definition.properties[property];
                    switch (propertyDesc.type) {//for primitives
                        case 'boolean':
                            propertyView.type = 'boolean';
                            break;
                        case 'string':
                            propertyView.type = 'string';
                            //propertyDesc.format;
                            break;
                        case 'number':
                            propertyView.type = 'number';
                            break;
                        case 'integer':
                            propertyView.type = 'number';
                            break;
                        default:
                            propertyView.type = propertyDesc.type;
                            break;
                    }
                    if (propertyDesc.$ref) {
                        propertyView.type = propertyDesc.$ref.slice('#/definitions/'.length);
                        modelView.linkedModels.push(propertyView.type);
                    }

                    var propertyItems: Swagger.Schema = propertyDesc.items;

                    if (propertyDesc.enum) {
                        var enumView = this.enumGenerator.GenerateEnum(property, propertyDesc.enum, modelView.name);

                        propertyView.type = enumView.name;
                        modelView.enums[enumView.name] = enumView;
                    }

                    if (propertyView.type === 'array') {
                        var propertyItems: Swagger.Schema = propertyDesc.items;
                        propertyView.isArray = true;
                        if (propertyItems.$ref) {
                            propertyView.type = propertyItems.$ref.slice('#/definitions/'.length);
                            modelView.linkedModels.push(propertyView.type);
                        }
                        if (propertyItems.type) {
                            switch (propertyItems.type) {//for primitives
                                case 'boolean':
                                    propertyView.type = 'boolean';
                                    break;
                                case 'string':
                                    propertyView.type = 'string';
                                    break;
                                case 'number':
                                    propertyView.type = 'number';
                                    break;
                                case 'integer':
                                    propertyView.type = 'number';
                                    break;
                                default:
                                    throw new Error('Unsupported type of property');
                            }
                        }
                        if (propertyItems.enum) {
                            var enumView = this.enumGenerator.GenerateEnum(property, propertyItems.enum, modelView.name);

                            propertyView.type = enumView.name;
                            modelView.enums[enumView.name] = enumView;
                        }
                    }
                    propertyView.description = propertyDesc.description;
                    propertyView.isRequired = (definition.required && definition.required.indexOf(property) !== -1);
                    modelView.properties.push(propertyView);
                }
            }

            return modelView;
        }

        public GenerateModelCollection(definitions: { [definitionsName: string]: Swagger.Schema }): ModelViewCollection {
            var result = new ModelViewCollection();
            for (var modelName in definitions) {
                if (definitions.hasOwnProperty(modelName)) {
                    result[modelName] = this.GenerateModel(modelName, definitions[modelName]);
                }
            }
            return result;
        }
    }
}