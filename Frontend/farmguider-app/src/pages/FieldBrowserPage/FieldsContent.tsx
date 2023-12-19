import React, {useEffect, useMemo} from "react";
import FieldBrowser from "@/pages/FieldBrowserPage/FieldBrowser.tsx";
import FieldResults from "@/pages/FieldBrowserPage/FieldResults.tsx";
import FieldResponseDTO from "@/entities/FieldResponseDTO.ts";
import FieldSearchParams from "@/entities/FieldSearchParams.ts";
import '@/pages/FieldBrowserPage/fieldContent.css';

type FieldsContentProps = {
    fieldList: FieldResponseDTO[];
    onOpenAddFieldModal: () => void;
    fieldSearchParams: FieldSearchParams;
    updateSearchParams: (key: keyof FieldSearchParams, value: string | number | undefined) => void;
    onSearch: () => void;
}

const FieldsContent: React.FC<FieldsContentProps> = ({fieldList, onOpenAddFieldModal, fieldSearchParams, updateSearchParams, onSearch}) => {
    const relevantSearchParams = useMemo(() => ({
        fieldName: fieldSearchParams.fieldName,
        fieldAreaFrom: fieldSearchParams.fieldAreaFrom,
        fieldAreaTo: fieldSearchParams.fieldAreaTo,
        soilClass: fieldSearchParams.soilClass
    }), [
        fieldSearchParams.fieldName,
        fieldSearchParams.fieldAreaFrom,
        fieldSearchParams.fieldAreaTo,
        fieldSearchParams.soilClass
    ]);

    useEffect(() => {
        onSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [relevantSearchParams]);

    return (
        <div>
            <FieldBrowser
                updateSearchParams={updateSearchParams}
                fieldSearchParams={fieldSearchParams}
                onOpenAddFieldModal={onOpenAddFieldModal}
            />

            <FieldResults
                fieldList={fieldList}
            />
        </div>
    )
}

export default FieldsContent;