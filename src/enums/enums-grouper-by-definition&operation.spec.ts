import {  } from 'mocha';
import { expect } from 'chai';
import { EnumsGrouperByDefinitionAndOperation } from './enums-grouper-by-definition&operation';

describe('Enums grouping by definition & operation:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
