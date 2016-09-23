import { Swagger } from './swagger';
import { ComponentsGrouper } from './components';
import { DefinitionsGrouper } from './definitions';
import { EnumsGrouper } from './enums';
import { OperationsGrouper } from './operations';

export class SwaggerAnalyzer {
    constructor(
        private operationsGrouper: OperationsGrouper,
        private definitionsGrouper: DefinitionsGrouper,
        private enumsGrouper: EnumsGrouper,
        private componentsGrouper: ComponentsGrouper,
        private componentsGroupingStrategy: any,
        private extensionsParsers: any
    ) {
    }

    public GenerateComponents(swagger: Swagger.Spec) {
    }
}