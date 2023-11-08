import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import {RouteConfig} from "@/routes/AppRouter.tsx";
import {HOME_PAGE_URL, NOT_LOGGED_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import NotLoggedPage from "@/pages/NotLoggedPage/NotLoggedPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";

const routesConfig: RouteConfig[]= [
    { path: NOT_LOGGED_PAGE_URL, page: NotLoggedPage, accessibleRoles: UserRoles.NON_LOGGED, title: "FarmGuider" },
    { path: HOME_PAGE_URL, page: HomePage, accessibleRoles: UserRoles.ROLE_USER, title: "FarmGuider" },
];

export default routesConfig;