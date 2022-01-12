describe('human-readable conversion test suite for decimal and IEC units', () => {

    it('tests a successful automatic conversion to bytes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(999)).toBe('999 B');
        expect(hr.fromBytes(999, { mode: 'IEC' })).toBe('999 B');
        done();
    });

    it('tests a successful automatic conversion to kilo-bytes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(58000)).toBe('58 kB');
        expect(hr.fromBytes(58000, { mode: 'IEC' })).toBe('56.64 KiB');
        done();
    });

    it('tests a successful automatic conversion to mega-bytes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(35899650)).toBe('35.90 MB');
        expect(hr.fromBytes(35899650, { mode: 'IEC' })).toBe('34.24 MiB');
        done();
    });

    it('tests a successful automatic conversion to giga-bytes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(17535899650)).toBe('17.54 GB');
        expect(hr.fromBytes(17535899650, { mode: 'IEC' })).toBe('16.33 GiB');
        done();
    });

    it('tests a successful automatic conversion to terra-bytes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(6917535899650)).toBe('6.92 TB');
        expect(hr.fromBytes(6917535899650, { mode: 'IEC' })).toBe('6.29 TiB');
        done();
    });

    it('tests a successful automatic conversion to peta-bytes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromBytes(179336917535899650)).toBe('179.34 PB');
        expect(hr.fromBytes(179336917535899650, { mode: 'IEC' })).toBe('159.28 PiB');
        done();
    });

    it('tests a successful conversion from kilo-bytes to mega-bytes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromTo(999, 'KBYTE', 'MBYTE')).toBe('1.00 MB');
        expect(hr.fromTo(999, 'KBYTE', 'MBYTE', { mode: 'IEC' })).toBe('0.98 MiB');
        done();
    });

    it('tests a successful conversion from giga-bytes to kilo-bytes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromTo(17.34, 'GBYTE', 'KBYTE')).toBe('17340000 kB');
        expect(hr.fromTo(17.34, 'GBYTE', 'KBYTE', { mode: 'IEC' })).toBe('18182307.84 KiB');
        done();
    });

    it('tests a successful conversion from kilo-byte to kilo-byte', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromTo(17.34, 'KBYTE', 'KBYTE')).toBe('17.34 kB');
        expect(hr.fromTo(17.34, 'KBYTE', 'KBYTE', { mode: 'IEC' })).toBe('17.34 KiB');
        done();
    });

    it('tests a failed conversion with unknown sizes', async (done) => {
        const hr = require('../human-readable');
        expect(hr.fromTo(17.34, 'XBYTE', 'XBYTE')).toMatch(/NaN.*/);
        expect(hr.fromTo(17.34, 'XBYTE', 'XBYTE', { mode: 'IEC' })).toMatch(/NaN.*/);
        done();
    });

    it('tests the retrieval of available sizes', async (done) => {
        const hr = require('../human-readable');
        sizes = hr.availableSizes();
        expect(Array.isArray(sizes)).toBeTruthy();
        expect(sizes.length).toBe(6);
        expect(sizes[0]).toBe('BYTE');
        expect(sizes[1]).toBe('KBYTE');
        expect(sizes[2]).toBe('MBYTE');
        expect(sizes[3]).toBe('GBYTE');
        expect(sizes[4]).toBe('TBYTE');
        expect(sizes[5]).toBe('PBYTE');
        done();
    });

});