describe('human-readable options test suite', () => {

    it('tests a successful automatic conversion to mega-bytes - options: none', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650)).toBe('35.90 MB');
        expect(hr.fromBytes(35899650, { mode: 'IEC' })).toBe('34.24 MiB');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes - options: number-only', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650, { numberOnly: true })).toBe('35.90');
        expect(hr.fromBytes(35899650, { mode: 'IEC', numberOnly: true })).toBe('34.24');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes - options: no-whitespace', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650, { noWhitespace: true })).toBe('35.90MB');
        expect(hr.fromBytes(35899650, { mode: 'IEC', noWhitespace: true })).toBe('34.24MiB');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes - options: number-only overriding no-whitespace', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650, { numberOnly: true, noWhitespace: true })).toBe('35.90');
        expect(hr.fromBytes(35899650, { mode: 'IEC', numberOnly: true, noWhitespace: true })).toBe('34.24');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes - options: full-precision', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650, { fullPrecision: true })).toBe('35.89965 MB');
        expect(hr.fromBytes(35899650, { mode: 'IEC', fullPrecision: true })).toBe('34.23657417297363 MiB');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes - options: fixed-precision = 3', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650, { fixedPrecision: 3 })).toBe('35.900 MB');
        expect(hr.fromBytes(35899650, { mode: 'IEC', fixedPrecision: 3 })).toBe('34.237 MiB');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes - options: fixed-precision NaN, ignored', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650, { fixedPrecision: 'ttt' })).toBe('35.90 MB');
        expect(hr.fromBytes(735, { fixedPrecision: 'ttt' })).toBe('735 B');
        expect(hr.fromBytes(35899650, { mode: 'IEC', fixedPrecision: 'ttt' })).toBe('34.24 MiB');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes - options: fixed-precision = 0', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650, { fixedPrecision: 0 })).toBe('36 MB');
        expect(hr.fromBytes(35899650, { mode: 'IEC', fixedPrecision: 0 })).toBe('34 MiB');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes - options: full-precision overriding fixed-precision', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650, { fullPrecision: true, fixedPrecision: 3 })).toBe('35.89965 MB');
        expect(hr.fromBytes(35899650, { mode: 'IEC', fullPrecision: true, fixedPrecision: 3 })).toBe('34.23657417297363 MiB');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes - options: full-precision, number-only overriding fixed-precision and no-whitespace', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650, { fullPrecision: true, fixedPrecision: 3, numberOnly: true, noWhitespace: true })).toBe('35.89965');
        expect(hr.fromBytes(35899650, { mode: 'IEC', fullPrecision: true, fixedPrecision: 3, numberOnly: true, noWhitespace: true })).toBe('34.23657417297363');
        done();
    });

});