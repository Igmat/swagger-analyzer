import { Swagger } from '../swagger';
import { Service } from '../operations';
import { Namespace } from '../definitions';

export interface Component {
    Name: string;
    Services: Service[];
    Namespaces: Namespace[];
    Dependencies: any[];
    Extensions: any[];
}

export interface ComponentsGrouper {
}