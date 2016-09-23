import {  } from 'mocha';
import { expect } from 'chai';
import { EnumsGrouperByDefinition } from './enums-grouper-by-definition';

describe('Enums grouping by definition:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
