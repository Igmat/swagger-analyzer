import { Swagger } from '../swagger';

export interface Enum {
    Name: string;
    Length: number;
    Entities: { [entityName: string]: string };
    Context: string;
    Extensions: any[];
}

export interface EnumGroup extends Enum {
    EnumsIds: string[];
}

export interface EnumsGrouper {
    GenerateGroups(enums: Enum[]): EnumGroup[];
}

export interface EnumAnalyzer {
    Analyze(name: string, content: [string | boolean | number | Object], context: string): Enum;
}

export abstract class EnumsDetector {
    public abstract DetectEnumsInDefinitions(definitons: { [definitionsName: string]: Swagger.Schema }): Enum[];
    public abstract DetectEnumsInPaths(paths: { [pathName: string]: Swagger.Path }): Enum[];
    public DetectEnums(swagger: Swagger.Spec): Enum[] {
        var result: Enum[] = [];
        result = result.concat(
            this.DetectEnumsInDefinitions(swagger.definitions),
            this.DetectEnumsInPaths(swagger.paths));

        return result;
    }
}