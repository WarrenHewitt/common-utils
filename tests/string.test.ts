import { describe, expect, it } from 'vitest';

import { capitalize, toKebabCase } from '../src/string';

describe('string utils', () => {
    it('toKebabCase should convert camelCase and spaces', () => {
        expect(toKebabCase('helloWorld Test')).toBe('hello-world-test');
    });

    it('capitalize should uppercase first character', () => {
        expect(capitalize('hello')).toBe('Hello');
    });
});
