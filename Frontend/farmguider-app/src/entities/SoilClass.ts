enum SoilClass {
    I = "I",
    II = "II",
    IIIa = "III a",
    IIIb = "III b",
    IVa = "IV a",
    IVb = "IV b",
    V = "V",
    Unknown = "Unknown"
}

export default SoilClass;

export const getSoilClassValue = (key: string): SoilClass => {
    return SoilClass[key as keyof typeof SoilClass] || key;
}