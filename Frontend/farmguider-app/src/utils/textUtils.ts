export const nullReplaceLackOfData = (value: string | number | null | undefined, replacement: string): string => {
    if (typeof value === 'number') {
        return value.toString();
    }
    return value && value.trim().length > 0 ? value : replacement;
}
