export const nullReplaceLackOfData = (value: string | null | undefined, replacement: string): string => {
    return value && value.trim().length > 0 ? value : replacement;
}
