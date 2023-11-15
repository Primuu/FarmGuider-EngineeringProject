import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import {RouteConfig} from "@/routes/AppRouter.tsx";
import {HOME_PAGE_URL, NOT_LOGGED_PAGE_URL, PROFILE_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import NotLoggedPage from "@/pages/NotLoggedPage/NotLoggedPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import ProfilePage from "@/pages/ProfilePage/ProfilePage.tsx";
import i18n from "@/i18n.ts";

const routesConfig: RouteConfig[]= [
    { path: NOT_LOGGED_PAGE_URL, page: NotLoggedPage, accessibleRoles: UserRoles.NON_LOGGED, title: i18n.t('titles:default') },
    { path: HOME_PAGE_URL, page: HomePage, accessibleRoles: UserRoles.ROLE_USER, title: i18n.t('titles:default')},
    { path: PROFILE_PAGE_URL, page: ProfilePage, accessibleRoles: UserRoles.ROLE_USER, title: i18n.t('titles:profile') },
];

export default routesConfig;