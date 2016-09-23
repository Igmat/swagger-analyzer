import { EnumAnalyzer, Enum } from './core';

export class EnumAnalyzerDefault implements EnumAnalyzer {
    public Analyze(name: string, content: [string | boolean | number | Object], context: string): Enum {
        let result: Enum = {
            Name: name,
            Context: context,
            Length: 0,
            Entities: {},
            Extensions: []
        };

        for (let enumEntity of content) {
            result.Length++;
            result.Entities[enumEntity.toString()] = enumEntity.toString();
        }

        return result;
    }
}