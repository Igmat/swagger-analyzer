import {  } from 'mocha';
import { expect } from 'chai';
import { Test } from './index';

describe('Unit Tests:', () => {
    describe('2 + 4', () => {

        it('should be 6', (done) => {
            var s = new Test('s');
            expect(1).to.equals(1);
            done();
        });
    });
});
