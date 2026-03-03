export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function inRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}
