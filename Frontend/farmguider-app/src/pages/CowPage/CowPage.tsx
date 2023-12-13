import '@/pages/CowPage/cowPage.css';
import {useParams} from "react-router-dom";

const CowPage = () => {
    const {cowId} = useParams();

    return (
        <div className="cow-container">
            Cow Placeholder {cowId}
        </div>
    )
}

export default CowPage;