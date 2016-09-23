import {  } from 'mocha';
import { expect } from 'chai';
import { DefinitionsGrouperByConvention } from './definitions-grouper-by-convention';

describe('Definitions grouping by convention:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
