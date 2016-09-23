import { Swagger } from '../swagger';

export interface Property {
    Name: string;
    Type: string;
    IsArray: boolean;
    IsRequired: boolean;
    Description: string;
    Dependencies: any[];
    Extensions: any[];
}

export interface Definition {
    Id: string;
    Name: string;
    Properties: Property[];
    Description: string;
    Dependencies: any[];
    Extensions: any[];
}

export interface Namespace {
    Name: string;
    Definitions: Definition[];
    Dependencies: any[];
    Extensions: any[];
}

export interface DefinitionsGrouper {
}

export interface DefinitionAnalyzer {
}