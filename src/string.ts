export function toKebabCase(input: string): string {
    return input
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}

export function capitalize(input: string): string {
    if (!input) return input;
    return input[0].toUpperCase() + input.slice(1);
}
