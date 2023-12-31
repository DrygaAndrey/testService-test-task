import './testsDetailsPage.scss';
import { useEffect, useState } from 'react';
import { getTestsByUserId } from '../helpers';
import useStore from '../store';
import Tests from './tests/tests';
import Header from './header/header';
const clientUrl = process.env.REACT_APP_CLIENT_URL;
function TestsDetailsPage() {
    const { setLoading, setMessage } = useStore();
    const [tests, setTests] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = `${clientUrl}`;
        } else {
            fetchTests();
        }
    }, [])
    async function fetchTests() {
        setLoading(true);
        const token = localStorage.getItem('token');
        const tests = await getTestsByUserId(token);
        console.log(tests);
        setLoading(false);
        setTests(tests);
    }

    return (
        <div className='testsDetailsPage'>
            <Header />
            <Tests tests={tests} />
        </div>
    )
}

export default TestsDetailsPage;