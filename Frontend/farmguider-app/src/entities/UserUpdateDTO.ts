export default interface UserUpdateDTO {
    firstName: string;
    lastName: string;
    locality: string | null;
    street: string | null;
    zipCode: string | null;
    propertyNumber: string | null;
}