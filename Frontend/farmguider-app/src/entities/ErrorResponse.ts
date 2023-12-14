export default interface ErrorResponse {
    type: string;
    errors: Record<string, string>;
}