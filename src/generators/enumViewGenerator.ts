export namespace EnumGeneration {
    export class EnumView {
        public name: string;
        public length: number;
        public entities: { [entityName: string]: string };

        public Equals(another: EnumView): boolean {
            var result = this.length == another.length;
            if (result) {
                for (let key in this.entities) {
                    result = result && (this.entities[key] == another.entities[key]);
                }
            }

            return result;
        }

        constructor() {
            this.length = 0;
            this.entities = {};
        }
    }

    export class EnumViewCollection {
        [enumName: string]: EnumView;
        constructor() {
        }
    }

    export class EnumGenerator {
        public enums: EnumViewCollection;

        constructor() {
            this.enums = new EnumViewCollection();
        }

        public GenerateEnum(name: string, content: [string | boolean | number | Object], optionalPrefix: string): EnumView {
            var enumView: EnumView = new EnumView();
            enumView.name = name + 'Enum';

            for (var en in content) {
                var enumEntity = content[en].toString();
                enumView.length++;
                enumView.entities[enumEntity] = enumEntity;
            }

            //check for already existed name
            if (this.enums[enumView.name]) {
                if (enumView.Equals(this.enums[enumView.name])) {
                    enumView = this.enums[enumView.name];
                    return enumView;
                } else {
                    enumView.name = optionalPrefix + enumView.name;
                    if (this.enums[enumView.name]) {
                        if (enumView.Equals(this.enums[enumView.name])) {
                            enumView = this.enums[enumView.name];
                            return enumView;
                        } else {
                            throw new Error('Unable to add enum because of already existed names');
                        }
                    }
                }
            }

            //check for already existed content
            for (var enumName in this.enums) {
                if (enumView.Equals(this.enums[enumName])) {
                    enumView = this.enums[enumName];
                    return enumView;
                }
            }
            this.enums[enumView.name] = enumView;
            return enumView;
        }
    }
}
