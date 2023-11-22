export default interface UserResponseDTO {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    locality: string | null;
    street: string | null;
    zipCode: string | null;
    propertyNumber: string | null;
}