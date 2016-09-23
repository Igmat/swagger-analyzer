import {  } from 'mocha';
import { expect } from 'chai';
import { OperationsGrouperByTag } from './operations-grouper-by-tag';

describe('Operations grouping by tag:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
