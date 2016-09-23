import {  } from 'mocha';
import { expect } from 'chai';
import { EnumsDetectorDefault } from './enum-detector-default';

describe('Default enum detecting:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
