import React from 'react';
import '../style.css';
export default function Questions() {
    return <><div className="question-section">
        <div className='question-count'>
            <span>Question 1</span>/4
                  </div>
        <div className='question-text'>What is your name sweetheart</div>
    </div>
        <div className="answer-section">
            <div className='question-count'>
                <span>Options</span>
            </div>
            <button className='button correct'>ANswerjdsnfkjsndkjfnkdsnfkj 1</button>
            {/* <button className='button' onClick={() =>setShowLogin(!showLogin)}>Logout</button>*/}
            <button className='button incorrect'>press me</button>

        </div></>;
}