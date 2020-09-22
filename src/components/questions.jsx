import React, { useEffect, useState,Component } from 'react';
import '../style.css';
import querystring from 'query-string'

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:5000/api/topics/questions")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.questions
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, items, isLoaded } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
            );
        }
    }
}

export default Questions;
/*
export default function Questions({ location }) {

    const [name, setName] = useState('');
    const [topic, setTopic] = useState('');
    const [loading, setloading] = useState(true);
    const [questions, setQuestions] = useState([])




    useEffect(() => {
        const { name, topic } = querystring.parse(location.search);
        setName(name);
        setTopic(topic)
        console.info('set topic');
        fetchQuestions();
        console.info('finish use effect with topic and name');
    }, []);



    function fetchQuestions() {
        setloading(true);
        console.info('FQ set loading');
        const apiUrl = `http://localhost:5000/api/topics/questions`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then(({ count, questions }) => {
                console.log(questions)
                setQuestions(questions);
                setloading(false);
                console.info('set Loading false');

            });
    }

    let element = QuestionsView(questions);
    return <>{loading ? <>Loading</> : element}</>;
}
*/
export function QuestionsView(questions) {

    const [showResult, setShowResult] = useState(false);
    const [response, setResponse] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (index < questions.length) {
            setCurrentQuestion(questions[index]);
        }
        else {
            setScore(getResult())
            setShowResult(true);
        }

    }, [index, questions])
    function handleOptionClick(event) {
        event.preventDefault();
        if (index < questions.length + 1) {
            let selected = event.target.id;
            setResponse(response.concat(selected));
            setIndex(index + 1);
        }

    }
    function getResult() {
        let correct = 0;
        let index = 0;
        questions.map((question) => {
            console.info(`${question.answer},${response[index]},${question.answer === response[index]}`)
            if (question.answer === response[index])
                correct++;
            index++;
        })
        console.info(response)
        console.info(questions)
        console.info(score)
        console.info(correct)
        return correct;
    }

    return <>
        {showResult ? <div>You Scored {score}/{questions.length}</div> : <><div className="question-section">
            <div className='question-count'>
                <span>Question {index + 1}</span>/{questions.length + 1}
            </div>
            <div className='question-text'>{index + 1}. {currentQuestion.question}</div>
        </div>
            <div className="answer-section">
                <div className='question-count'>
                    <span>Options:</span>
                </div>
                <div>
                    {
                        currentQuestion.options.map((option) => {
                            return <button className='button' key={option} id={option} onClick={(e) => handleOptionClick(e)}>{option}</button>
                        })
                    }
                </div>

            </div></>}

    </>;
}
