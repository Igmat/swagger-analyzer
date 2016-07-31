import {EnumGeneration} from './enumViewGenerator';
import {ModelGeneration} from './modelViewGenerator';

export namespace ServiceGeneration {

    export class ParameterView {
        public name: string;
        public type: string;
        public optional: boolean;
        public description: string;

        constructor() {

        }
    }

    export class MethodView {
        public operationId: string;
        public link: string;
        public httpVerb: string;
        public description: string;
        public returns: string;
        public pathParameters: ParameterView[];
        public queryParameters: ParameterView[];
        public bodyParameter: ParameterView;
        public response: string;

        constructor() {
            this.pathParameters = [];
            this.queryParameters = [];
        }
    }

    export class ServiceView {
        public name: string;
        public methods: MethodView[];
        public enums: EnumGeneration.EnumViewCollection;

        constructor() {
            this.methods = [];
            this.enums = new EnumGeneration.EnumViewCollection;
        }
    }

    export class ServiceViewCollection {
        [serviceName: string]: ServiceView;
        constructor() {
        }
    }

    export class Component {
        public name: string;
        public service: ServiceView;
        public models: ModelGeneration.ModelViewCollection;
        public enums: EnumGeneration.EnumViewCollection;

        constructor() {
            this.models = new ModelGeneration.ModelViewCollection();
            this.enums = new EnumGeneration.EnumViewCollection;
        }
    }

    //internal class for working with inlined enums TODO: remove code smell
    class MethodAndEnums {
        public method: MethodView;
        public enums: EnumGeneration.EnumViewCollection;

        constructor() {
            this.enums = new EnumGeneration.EnumViewCollection;
        }
    }

    export class ServiceGenerator {
        constructor(
            private enumGenerator: EnumGeneration.EnumGenerator = new EnumGeneration.EnumGenerator(),
            private modelGenerator: ModelGeneration.ModelGenerator = new ModelGeneration.ModelGenerator(enumGenerator)) {
        }

        public GenerateComponents(swagger: Swagger.Spec): Component[] {
            var models = this.modelGenerator.GenerateModelCollection(swagger.definitions);
            var services = this.GenerateServiceViews(swagger.paths);
            var result: Component[] = [];
            for (let serviceName in services) {
                let service = services[serviceName];
                let component = new Component();
                component.name = service.name;
                component.service = service;
                let modelCount = 0;
                for (let enumName in service.enums) {
                    component.enums[enumName] = service.enums[enumName];
                }
                for (let i = 0; i < service.methods.length; i++) {
                    let method = service.methods[i];
                    if (method.response != 'string' &&
                        method.response != 'number' &&
                        method.response != 'boolean' &&
                        method.response != 'any') {
                        let model = models[method.response];
                        let singleEnum = this.enumGenerator.enums[method.response];
                        if (!model && !singleEnum) throw new Error('There is no Enum or Model with name ' + method.response + ' for method: ' + component.name + '.' + method.operationId);
                        if (model) {
                            component.models[model.name] = model;
                            modelCount++;
                            for (let enumName in model.enums) {
                                component.enums[enumName] = model.enums[enumName];
                            }
                        }
                        if (singleEnum) {
                            component.enums[method.response] = singleEnum;
                        }
                    }

                    if (method.bodyParameter) {
                        if (method.bodyParameter.type != 'string' &&
                            method.bodyParameter.type != 'number' &&
                            method.bodyParameter.type != 'boolean' &&
                            method.bodyParameter.type != 'any') {
                            let model = models[method.bodyParameter.type];
                            let singleEnum = this.enumGenerator.enums[method.bodyParameter.type];
                            if (!model && !singleEnum) throw new Error('There is no Enum or Model with name ' + method.bodyParameter.type + ' for method: ' + component.name + '.' + method.operationId);
                            if (model) {
                                component.models[model.name] = model;
                                for (let enumName in model.enums) {
                                    component.enums[enumName] = model.enums[enumName];
                                }
                            }
                            if (singleEnum) {
                                component.enums[method.bodyParameter.type] = singleEnum;
                            }
                        }
                    }

                    for (let j = 0; j < method.pathParameters.length; j++) {
                        var parameter = method.pathParameters[j];
                        if (parameter.type != 'string' &&
                            parameter.type != 'number' &&
                            parameter.type != 'boolean' &&
                            parameter.type != 'any') {
                            let model = models[parameter.type];
                            let singleEnum = this.enumGenerator.enums[parameter.type];
                            if (!model && !singleEnum) throw new Error('There is no Enum or Model with name ' + parameter.type + ' for method: ' + component.name + '.' + method.operationId);
                            if (model) {
                                modelCount++;
                                component.models[model.name] = model;
                                for (let enumName in model.enums) {
                                    component.enums[enumName] = model.enums[enumName];
                                }
                            }
                            if (singleEnum) {
                                component.enums[parameter.type] = singleEnum;
                            }
                        }
                    }

                    for (let j = 0; j < method.queryParameters.length; j++) {
                        var parameter = method.queryParameters[j];
                        if (parameter.type != 'string' &&
                            parameter.type != 'number' &&
                            parameter.type != 'boolean' &&
                            parameter.type != 'any') {
                            let model = models[parameter.type];
                            let singleEnum = this.enumGenerator.enums[parameter.type];
                            if (!model && !singleEnum) throw new Error('There is no Enum or Model with name' + parameter.type + ' for method: ' + component.name + '.' + method.operationId);
                            if (model) {
                                modelCount++;
                                component.models[model.name] = model;
                                for (let enumName in model.enums) {
                                    component.enums[enumName] = model.enums[enumName];
                                }
                            }
                            if (singleEnum) {
                                component.enums[parameter.type] = singleEnum;
                            }
                        }
                    }
                }

                //Code for recursive check of links from one model to another
                let isNewLinkedModelExists = true;
                while (isNewLinkedModelExists) {
                    let modelAndLinkedModelCount = modelCount;
                    for (let modelName in component.models) {
                        let model = component.models[modelName];
                        for (let i = 0; i < model.linkedModels.length; i++) {
                            let linkedModelName = model.linkedModels[i];
                            if (!component.models[linkedModelName]) {
                                modelAndLinkedModelCount++;
                                let model = models[linkedModelName];
                                component.models[linkedModelName] = model;
                                for (let enumName in model.enums) {
                                    component.enums[enumName] = model.enums[enumName];
                                }
                            }
                        }
                    }
                    isNewLinkedModelExists = modelAndLinkedModelCount > modelCount;
                }

                result.push(component);
            }
            return result;
        }

        public GenerateServiceViews(paths: { [pathName: string]: Swagger.Path }): ServiceViewCollection {
            var serviceViews = new ServiceViewCollection();
            for (var pathName in paths) {
                var path = paths[pathName];
                //generating methods for all operations in this path
                for (var key in path) {
                    //checking for that key is httpVerb
                    if (key != '$ref' && key != 'parameters') {
                        var httpVerb: string = key;
                        var operation = path[key] as Swagger.Operation;
                        var serviceName = operation.tags[0];
                        //we are using first tag of operation to group operations from different paths into one service
                        if (!serviceViews[serviceName]) {
                            serviceViews[serviceName] = new ServiceView();
                            serviceViews[serviceName].name = serviceName;
                        }
                        //process operation
                        var methodAndEnums = this.generateMethod(httpVerb, pathName, operation);
                        //Adding a method
                        serviceViews[serviceName].methods.push(methodAndEnums.method);
                        for (var enumName in methodAndEnums.enums) {
                            serviceViews[serviceName].enums[enumName] = methodAndEnums[enumName];
                        }
                    }
                }
            }
            return serviceViews;
        }

        private generateMethod(httpVerb: string, link: string, operation: Swagger.Operation): MethodAndEnums {
            var result = new MethodAndEnums();
            var methodView = new MethodView();
            methodView.httpVerb = httpVerb.toUpperCase();
            methodView.link = link;
            methodView.operationId = operation.operationId.slice(operation.operationId.lastIndexOf('.') + 1);//workaround for ids with dot, but it could be wrong swagger generation or may need more work
            methodView.description = operation.summary;
            methodView.returns = operation.description;

            if (operation.parameters) {
                for (var i = 0; i < operation.parameters.length; i++) {//checking all parameters
                    var parameter = operation.parameters[i];
                    var parameterView = new ParameterView();
                    parameterView.name = parameter.name;
                    if (parameter.description) {
                        parameterView.description = parameter.description;
                    }

                    switch (parameter.in) {

                        case 'body':
                            if (parameter.schema.$ref) {//for reference types
                                parameterView.type = parameter.schema.$ref.slice('#/definitions/'.length);
                            } else {
                                if (parameter.schema.enum) {//for inline enum
                                    var enumView = this.enumGenerator.GenerateEnum(parameter.name, parameter.schema.enum, methodView.operationId);
                                    parameterView.type = enumView.name;
                                    result.enums[enumView.name] = enumView;
                                } else {
                                    switch (parameter.schema.type) {//for primitives
                                        case 'boolean':
                                            parameterView.type = 'boolean';
                                            break;
                                        case 'string':
                                            parameterView.type = 'string';
                                            break;
                                        case 'number':
                                            parameterView.type = 'number';
                                            break;
                                        case 'integer':
                                            parameterView.type = 'number';
                                            break;
                                        default:
                                            throw new Error('Unsupported type of body parameter');
                                    }
                                }
                            }
                            parameterView.optional = !parameter.required;
                            methodView.bodyParameter = parameterView;
                            break;

                        case 'path':
                            if (parameter.enum) {//for inline enum
                                var enumView = this.enumGenerator.GenerateEnum(parameter.name, parameter.enum, methodView.operationId);
                                parameterView.type = enumView.name;
                                result.enums[enumView.name] = enumView;
                            } else {
                                //TODO: may be reference type are needed (for example: defined enums(but they could have string type))
                                switch (parameter.type) {//for primitives
                                    case 'boolean':
                                        parameterView.type = 'boolean';
                                        break;
                                    case 'string':
                                        parameterView.type = 'string';
                                        break;
                                    case 'number':
                                        parameterView.type = 'number';
                                        break;
                                    case 'integer':
                                        parameterView.type = 'number';
                                        break;
                                    default:
                                        throw new Error('Unsupported type of path parameter');
                                }
                            }
                            parameterView.optional = false;//path parametrs always are required
                            methodView.pathParameters.push(parameterView);
                            break;

                        case 'query':
                            //next isn't implemented fully by spec, but uses some sort of mixing OpenAPI 2.0 and OpenAPI 3.0 spec instead
                            //it supports https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#parameterObject (schema.$ref part) from OpenApi.next
                            //but also supports https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#parameterObject from OpenApi.master
                            if (parameter.schema && parameter.schema.$ref) {
                                parameterView.type = parameter.schema.$ref.slice('#/definitions/'.length);
                            } else {
                                if (parameter.enum) {//for inline enum
                                    var enumView = this.enumGenerator.GenerateEnum(parameter.name, parameter.enum, methodView.operationId);
                                    parameterView.type = enumView.name;
                                    result.enums[enumView.name] = enumView;
                                } else {
                                    //TODO: may be reference type are needed (for example: defined enums(but they could have string type))
                                    switch (parameter.type) {//for primitives
                                        case 'boolean':
                                            parameterView.type = 'boolean';
                                            break;
                                        case 'string':
                                            parameterView.type = 'string';
                                            break;
                                        case 'number':
                                            parameterView.type = 'number';
                                            break;
                                        case 'integer':
                                            parameterView.type = 'number';
                                            break;
                                        default:
                                            throw new Error('Unsupported type of query parameter');
                                    }
                                }
                            }
                            parameterView.optional = !parameter.required;//I am not sure that our logic is affected if query parameter is required TODO: check it
                            methodView.queryParameters.push(parameterView);
                            break;
                        default://TODO: add support for formData
                            throw new Error('Unsupported parameter appearance');
                    }
                }
            }

            //RESPONSES
            if (operation.responses) {
                for (var responseName in operation.responses) {
                    var response = operation.responses[responseName];
                    if (response.schema) {
                        if (response.schema.$ref) {
                            methodView.response = response.schema.$ref.slice('#/definitions/'.length);
                        } else {
                            switch (response.schema.type) {//for primitives
                                case 'boolean':
                                    methodView.response = 'boolean';
                                    break;
                                case 'string':
                                    methodView.response = 'string';
                                    break;
                                case 'number':
                                    methodView.response = 'number';
                                    break;
                                case 'integer':
                                    methodView.response = 'number';
                                    break;
                                default:
                                    throw new Error('Unsupported type of response');
                            }
                        }
                    } else {
                        methodView.response = 'any';
                    }
                }
            }
            result.method = methodView;

            return result;
        }
    }
}
