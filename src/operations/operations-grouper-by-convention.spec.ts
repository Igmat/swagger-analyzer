import {  } from 'mocha';
import { expect } from 'chai';
import { OperationsGrouperByConvention } from './operations-grouper-by-convention';

describe('Operations grouping by convention:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
