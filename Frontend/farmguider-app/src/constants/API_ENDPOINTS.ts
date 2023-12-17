export const BASE_URL: string = "http://localhost:8080";

// Authentication
export const REGISTER_URL: string = "/register";
export const AUTHENTICATE_URL: string = "/authenticate";
export const REVOKE_URL: string = "/revoke";
export const GET_AUTH_DATA_URL: string = "/auth-data";

// User
export const GET_USER_DATA_URL: string = "/user/{userId}";
export const UPDATE_USER_URL: string = "/user/update/{userId}";
export const CHANGE_PASSWORD_URL: string = "/user/change-password";
export const DELETE_ACCOUNT_URL: string = "/user/delete-account";

// Breeding
export const GET_BREEDINGS_URL: string = "/breeding/get-breedings/{farmId}";
export const CREATE_BREEDING_URL: string = "/breeding/create-breeding/{farmId}";
export const UPDATE_BREEDING_URL: string = "/breeding/update/{breedingId}";
export const DELETE_BREEDING_URL: string = "/breeding/delete/{breedingId}";

// Cow
export const CREATE_COW_URL: string = "/cow/create-cow/{breedingId}";
export const GET_COWS_URL: string = "/cow/get-cows/{breedingId}";
export const GET_COW_URL: string = "/cow/{cowId}";
export const UPDATE_COW_URL: string = "/cow/update/{cowId}";
export const DELETE_COW_URL: string = "/cow/delete/{cowId}";

// Milking
export const CREATE_MILKING_URL: string = "/milking/create-milking/{cowId}";
export const GET_MILKINGS_URL: string = "/milking/get-milkings/{cowId}";
export const GET_MILKING_CHART_URL: string = "/milking/get-milking-chart/{lactationPeriodId}";
export const UPDATE_MILKING_URL: string = "/milking/update/{milkingId}";
export const DELETE_MILKING_URL: string = "/milking/delete/{milkingId}";

// WeightGain
export const CREATE_WEIGHT_GAIN_URL: string = "/weight-gain/create-weight-gain/{cowId}";
export const GET_WEIGHT_GAINS_URL: string = "/weight-gain/get-weight-gains/{cowId}";
export const UPDATE_WEIGHT_GAIN_URL: string = "/weight-gain/update/{weightGainId}";
export const DELETE_WEIGHT_GAIN_URL: string = "/weight-gain/delete/{weightGainId}";

// LactationPeriod
export const CREATE_LACTATION_PERIOD_URL: string = "/lactation-period/create-lactation-period/{cowId}";
export const GET_LACTATION_PERIODS_URL: string = "/lactation-period/get-lactation-periods/{cowId}";
export const UPDATE_LACTATION_PERIOD_URL: string = "/lactation-period/update/{lactationPeriodId}";
export const DELETE_LACTATION_PERIOD_URL: string = "/lactation-period/delete/{lactationPeriodId}";
