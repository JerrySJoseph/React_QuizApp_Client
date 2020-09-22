import React from 'react';

import '../style.css';
import '../loader.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function LoginForm()
{
    const [loading, setloading] = useState(true);
    const [name,setName]=useState('');
    const [topic,settopic]=useState('');
    const [topics,settopics]=useState([]);
      useEffect(() => {
        setloading(true);
        const apiUrl = `http://localhost:5000/api/topics`;
        fetch(apiUrl)
            .then((res)=>res.json())
            .then(({count,topics}) => {
                console.log(topics)
               settopics(topics);
               setloading(false);
            });
      },[]);

      return <><div className="question-section">
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
          loading?<div>please wait</div>:
                  <div>
                      <div className='question-count'>
              <span>Get Started</span>
          </div>
          <input type="text" placeholder="type your name" onChange={(e)=>setName(e.target.value)} />
          <select id="topic" name="topic" onChange={(e)=>settopic(e.target.value)}>
              {
                topics.map((topic)=><option value={topic}>{topic}</option>)
              }
          </select>
          <Link to={process.env.PUBLIC_URL+`/quiz?name=${name}&topic=${topic}`}>
          
 <button className="abutton" ><span>Start Quiz</span></button>
          </Link>
               
         
            </div>
          }
          
      </div></>
}