import { Swagger } from '../swagger';
import { EnumsDetector, EnumAnalyzer, Enum } from './core';

export class EnumsDetectorDefault extends EnumsDetector {
    constructor(private analyzer: EnumAnalyzer) {
        super();
    }

    public DetectEnumsInDefinitions(definitons: { [definitionsName: string]: Swagger.Schema }): Enum[] {
        let result: Enum[] = [];
        for (let definitionName in definitons) {
            if (definitons.hasOwnProperty(definitionName)) {
                let definition = definitons[definitionName];
                // if definition is enum
                if (definition.enum !== undefined) {
                    result.push(this.analyzer.Analyze(definitionName, definition.enum, `#/definitions/${definitionName}`));
                }
                // if definitions is array of enums
                if (definition.items !== undefined) {
                    if (definition.items instanceof Array) {
                        //TODO: check spec for this case, recursion is possible
                    } else {
                        if (definition.items.enum !== undefined) {
                            result.push(this.analyzer.Analyze(definitionName, definition.items.enum, `#/definitions/${definitionName}`));
                        }
                    }
                }
                // if definition is object, we have to check it's properties for containing enums
                if (definition.properties !== undefined) {
                    for (let propertyName in definition.properties) {
                        if (definition.properties.hasOwnProperty(propertyName)) {
                            let property = definition.properties[propertyName];
                            // for single enum in properties
                            if (property.enum !== undefined) {
                                result.push(this.analyzer.Analyze(propertyName, property.enum, `#/definitions/${definitionName}`));
                            }
                            // for array of enums in properties
                            if (property.items !== undefined) {
                                if (property.items instanceof Array) {
                                    //TODO: check spec for this case, recursion is possible
                                } else {
                                    if (property.items.enum !== undefined) {
                                        result.push(this.analyzer.Analyze(propertyName, property.items.enum, `#/definitions/${definitionName}`));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return result;
    }
    public DetectEnumsInPaths(paths: { [pathName: string]: Swagger.Path }): Enum[] {
        let result: Enum[] = [];
        for (let pathName in paths) {
            if (paths.hasOwnProperty(pathName)) {
                let path = paths[pathName];
                for (let httpVerb in path) {
                    //checking for that key is httpVerb
                    if (path.hasOwnProperty(httpVerb) && httpVerb !== '$ref' && httpVerb !== 'parameters') {
                        let operation = path[httpVerb] as Swagger.Operation;
                        if (operation.parameters !== undefined) {
                            for (let parameter of operation.parameters) {
                                if (parameter.enum !== undefined) {
                                    result.push(this.analyzer.Analyze(parameter.name, parameter.enum, `#/paths/${pathName}/${httpVerb}`));
                                }
                                if (parameter.items !== undefined) {
                                    if (parameter.items instanceof Array) {
                                        //TODO: check spec for this case, recursion is possible
                                    } else {
                                        if (parameter.items.enum !== undefined) {
                                            result.push(this.analyzer.Analyze(parameter.name, parameter.items.enum, `#/paths/${pathName}/${httpVerb}`));
                                        }
                                    }
                                }
                                if (parameter.schema !== undefined) {
                                    if (parameter.schema.enum !== undefined) {
                                        result.push(this.analyzer.Analyze(parameter.name, parameter.schema.enum, `#/paths/${pathName}/${httpVerb}`));
                                    }
                                    if (parameter.schema.items !== undefined) {
                                        if (parameter.schema.items instanceof Array) {
                                            //TODO: check spec for this case, recursion is possible
                                        } else {
                                            if (parameter.schema.items.enum !== undefined) {
                                                result.push(this.analyzer.Analyze(parameter.name, parameter.schema.items.enum, `#/paths/${pathName}/${httpVerb}`));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return result;
    }
}