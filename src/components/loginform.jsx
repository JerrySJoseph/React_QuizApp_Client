import React from 'react';

import '../style.css';
import '../loader.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const ENDPOINT_ROOT="https://quiz-app-server-nodejs.herokuapp.com/";
const APIENDPOINT_TOPICS=ENDPOINT_ROOT+`api/topics`;

export default function LoginForm() {
    const [loading, setloading] = useState(true);
    const [name, setName] = useState('');
    const [topic, settopic] = useState('');
    const [topics, settopics] = useState([]);
    useEffect(() => {
        setloading(true);
        const apiUrl = APIENDPOINT_TOPICS;
        fetch(apiUrl)
            .then((res) => res.json())
            .then(({ count, topics }) => {
                console.log(topics)
                settopics(topics);
                settopic(topics[0]);
                setloading(false);
            });
    }, []);

    return <><div className="question-section">
        <img className='star-img' src={require('../trophy.png')} />
        <div className='question-count'>
            <span>Welcome to Quiz</span>
        </div>
        <div className='question-text'>
            This Web application is a project developed by Jerry S Joseph using React.
          </div>
        <div>
            Developed by     <a href="#">Jerry S Joseph</a>
        </div>

    </div>
        <div className="answer-section">
            {
                loading ? <div>please wait</div> :
                    <div>
                        <div className='question-count'>
                            <span>Get Started</span>
                        </div>
                        <input type="text" placeholder="type your name" onChange={(e) => setName(e.target.value)} />
                        <select id="topic" name="topic" defaultValue={topics[0]} onChange={(e) => settopic(e.target.value)} onselect={(e) => settopic(e.target.value)}>
                            {
                                topics.map((topic) => <option selected value={topic}>{topic}</option>)
                            }
                        </select>
                        <Link to={process.env.PUBLIC_URL + `/quiz?name=${name}&topic=${topic}`}>
                            <button className="abutton" ><span>Start Quiz</span></button>
                        </Link>


                    </div>
            }

        </div></>
}