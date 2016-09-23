import {  } from 'mocha';
import { expect } from 'chai';
import { EnumsGrouperByOperation } from './enums-grouper-by-operation';

describe('Enums grouping by operation:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
