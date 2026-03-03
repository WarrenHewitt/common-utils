import { describe, expect, it } from 'vitest';

import { clamp, inRange } from '../src/number';

describe('number utils', () => {
    it('clamp should clamp value into range', () => {
        expect(clamp(20, 1, 10)).toBe(10);
        expect(clamp(-2, 1, 10)).toBe(1);
        expect(clamp(5, 1, 10)).toBe(5);
    });

    it('inRange should check inclusive range', () => {
        expect(inRange(5, 1, 10)).toBe(true);
        expect(inRange(10, 1, 10)).toBe(true);
        expect(inRange(11, 1, 10)).toBe(false);
    });
});
