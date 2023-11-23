export const nullReplaceLackOfData = (value: string | null | undefined, replacement: string): string => {
    return value ? value : replacement;
}