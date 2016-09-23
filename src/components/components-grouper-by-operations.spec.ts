import {  } from 'mocha';
import { expect } from 'chai';
import { ComponentsGrouperByOperations } from './components-grouper-by-operations';

describe('Components grouping by operations:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
