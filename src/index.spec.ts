import {  } from 'mocha';
import { expect } from 'chai';
import { Test } from './index';

describe('Unit Tests:', () => {
    describe('2 + 4', () => {
        it('should be 6', (done) => {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
