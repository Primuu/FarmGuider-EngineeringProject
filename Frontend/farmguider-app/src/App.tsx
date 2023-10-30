import {Route, Routes} from 'react-router-dom';
import {useAuth} from '@/components/AuthContext/AuthContext.tsx';
import NotLoggedPage from '@/components/NotLoggedPage/NotLoggedPage';

function App() {
    const authContext = useAuth();

    const isAuthenticated = authContext ? authContext.isAuthenticated : false;

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <NotLoggedPage/> : <NotLoggedPage/>}/>
        </Routes>
    );
}

export default App
