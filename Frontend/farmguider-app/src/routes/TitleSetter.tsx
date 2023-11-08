import React, {useEffect} from "react";

type TitleSetterProps = {
    title: string;
};

const TitleSetter: React.FC<TitleSetterProps> = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
};

export default TitleSetter;