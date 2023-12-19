export const NOT_LOGGED_PAGE_URL: string = "/";
export const NOT_FOUND_PAGE_URL: string = "/not-found";
export const HOME_PAGE_URL: string = "/home";
export const PROFILE_PAGE_URL: string = "/profile";
export const BREEDING_PAGE_URL: string = "/breeding";
export const COW_PAGE_URL: string = "/cow/:cowId";
export const COW_PAGE_WITH_ID = (cowId: number): string => COW_PAGE_URL.replace(":cowId", cowId.toString());
export const FIELD_BROWSER_PAGE_URL: string = "/fields";