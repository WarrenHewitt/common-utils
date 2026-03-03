import { describe, expect, it } from 'vitest';

import { formatNowDate, formatTime } from '../src/time';

describe('time utils', () => {
    const fixedDate = new Date(2024, 0, 2, 3, 4, 5);

    describe('formatTime', () => {
        it('should format dateTime by default', () => {
            expect(formatTime({ time: fixedDate })).toBe('2024-01-02 03:04:05');
        });

        it('should format date', () => {
            expect(formatTime({ time: fixedDate, type: 'date' })).toBe('2024-01-02');
        });

        it('should format time', () => {
            expect(formatTime({ time: fixedDate, type: 'time' })).toBe('03:04:05');
        });

        it('should format dateTimeZh', () => {
            expect(formatTime({ time: fixedDate, type: 'dateTimeZh' })).toBe(
                '2024年01月02日 03时04分05秒',
            );
        });

        it('should support custom separators', () => {
            expect(
                formatTime({
                    time: fixedDate,
                    type: 'dateTime',
                    dateSeparator: '/',
                    timeSeparator: '-',
                }),
            ).toBe('2024/01/02 03-04-05');
        });

        it('should throw for invalid type', () => {
            expect(() => formatTime({ time: fixedDate, type: 'invalid' as never })).toThrow(
                'Invalid type',
            );
        });

        it('should throw for invalid date', () => {
            expect(() => formatTime({ time: 'invalid-date' })).toThrow('Invalid date');
        });
    });

    describe('formatNowDate', () => {
        it('should contain expected date and time parts', () => {
            const formatted = formatNowDate(fixedDate);

            expect(formatted).toContain('2024-01-02');
            expect(formatted).toContain('03:04:05');
        });
    });
});
