import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const PageTitleUpdater = () => {
    const { t } = useTranslation('titles');
    const location = useLocation();

    useEffect(() => {
        const pathSegments: string[] = location.pathname.substring(1).split('/');
        const pageKey: string = pathSegments[0];

        document.title = t(`${pageKey}`, { defaultValue: t('default') });
    }, [location, t]);

    return null;
};

export default PageTitleUpdater;
