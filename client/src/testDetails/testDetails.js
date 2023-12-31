import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestById } from "../helpers";
import { checkTokenExpire } from "../helpers";
import useStore from "../store";
import './testDetails.scss';
import Resulst from "./results/results";
import Header from "./header/header";
import Update from "./update/update";

const clientUrl = process.env.REACT_APP_CLIENT_URL;

function TestDetails({ test }) {
    const { setLoading, setMessage } = useStore();
    const { id } = useParams(); 
    const [testObject, setTestObject] = useState({});
    const [showResults, setShowResults] = useState(false);
    useEffect(() => {
        fetch();
    }, [])
    function toogleResult() {
        setShowResults(!showResults);
    }

    async function fetch() {
        const token = localStorage.getItem('token');
        setLoading(true);
        const testObject = await getTestById(id);
        const tokenInfo = await checkTokenExpire(token);
        console.log(tokenInfo);
        console.log(testObject);
        if (testObject.createdBy !== tokenInfo.userId) {
            window.location.href = `${clientUrl}`;
        } else if (testObject.message === 'No') {
            setMessage('Authorization has expired, you need to log in again');
            setTimeout(() => {
                window.location.href = `${clientUrl}`;
            }, 500);
        }
        setLoading(false);
        setTestObject(testObject);
    }

    return (
        <div className="testDetails">
            <Header testName={testObject.testName} toogleResult={toogleResult} />
            {showResults ? <Resulst results={testObject.results} /> : <></>}

            {testObject.questions ? <Update testObject={testObject} /> : <></>}

        </div>
    );
}

export default TestDetails;