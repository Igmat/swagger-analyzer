import {  } from 'mocha';
import { expect } from 'chai';
import { DefinitionsGrouperByAppearance } from './definitions-grouper-by-appearance';

describe('Definitions grouping by appearance:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
