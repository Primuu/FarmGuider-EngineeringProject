import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const PageTitleUpdater = () => {
    const { t } = useTranslation('titles');
    const location = useLocation();

    useEffect(() => {
        const pathSegments: string[] = location.pathname.substring(1).split('/');
        const firstSegment: string = pathSegments[0];

        const titleKeys: {[key: string]: string} = {
            'profile': 'profile'
        };

        const pageTitleKey = titleKeys[firstSegment] || 'default';
        document.title = t(pageTitleKey);
    }, [location, t]);

    return null;
};

export default PageTitleUpdater;
