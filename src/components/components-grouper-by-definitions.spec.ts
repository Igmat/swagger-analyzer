import {  } from 'mocha';
import { expect } from 'chai';
import { ComponentsGrouperByDefinitions } from './components-grouper-by-definitions';

describe('Components grouping by definitions:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
