import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import {RouteConfig} from "@/routes/AppRouter.tsx";
import {BREEDING_PAGE_URL, HOME_PAGE_URL, NOT_LOGGED_PAGE_URL, PROFILE_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import NotLoggedPage from "@/pages/NotLoggedPage/NotLoggedPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import ProfilePage from "@/pages/ProfilePage/ProfilePage.tsx";
import BreedingPage from "@/pages/BreedingPage/BreedingPage.tsx";

const routesConfig: RouteConfig[] = [
    {path: NOT_LOGGED_PAGE_URL, page: NotLoggedPage, accessibleRoles: UserRoles.NON_LOGGED},
    {path: HOME_PAGE_URL, page: HomePage, accessibleRoles: UserRoles.ROLE_USER},
    {path: PROFILE_PAGE_URL, page: ProfilePage, accessibleRoles: UserRoles.ROLE_USER},
    {path: BREEDING_PAGE_URL, page: BreedingPage, accessibleRoles: UserRoles.ROLE_USER},
];

export default routesConfig;