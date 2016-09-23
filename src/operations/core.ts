import { Swagger } from '../swagger';

export interface Parameter {
    Name: string;
    Type: string;
    IsOptional: boolean;
    Description: string;
    Extensions: any[];
}

export interface Parameters {
    PathParameters: Parameter[];
    QueryParameters: Parameter[];
    BodyParameter: Parameter;
    Extensions: any[];
}

export interface Method {
    Id: string;
    Name: string;
    Link: string;
    HttpVerb: string;
    Parameters: Parameters;
    Response: string;
    Description: string;
    ReturnsDesc: string;
    Extensions: any[];
}

export interface Service {
    Name: string;
    Methods: Method[];
    Dependencies: any[];
    Extensions: any[];
}

export interface OperationsGrouper {
}

export interface OperationAnalyzer {
}