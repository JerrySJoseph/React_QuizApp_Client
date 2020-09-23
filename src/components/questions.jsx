import React, { useEffect, useState, Component } from 'react';
import '../style.css';
import querystring from 'query-string'
import '../star.png';
class Questions extends Component {
    constructor(props) {
        super(props);
        //   const location= useLocation();
        const { name, topic } = querystring.parse(this.props.location.search);
        this.state = {
            name: name,
            topic: topic,
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        fetch("http://localhost:5000/api/questions/" + this.state.topic)
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
        const { error, items, isLoaded, name } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (items.length < 1)
            return <div>No questions for this topic</div>;

        else {
            return (
                <QuestionView
                    questions={items}
                    name={name} />
            );
        }
    }
}

export default Questions;

class QuestionView extends Component {

    response = [];
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            questions: this.props.questions,
            showResult: false,
            response: [],
            currentQuestion: this.props.questions[0],
            index: 0,
            score: 0
        }
    }
    setResponse(value) {
        this.response = [...this.response, value];
    }
    setIndex(value) {
        this.setState({ index: value });
    }
    setShowResult(value) {
        this.setState({ showResult: value });
    }
    setScore(value) {
        this.setState({ score: value });
    }
    setCurrentQuestion(value) {
        this.setState({ currentQuestion: value });
    }
    handleOptionClick(event) {
        const { index, currentQuestion, questions, response } = this.state;
        event.preventDefault();
        let newindex = index + 1;
        let selected = event.target.id;
        this.setResponse(selected)
        console.info(this.response)
        if (newindex < questions.length) {

            console.info('index:' + newindex);
            this.setIndex(newindex)
            this.setCurrentQuestion(questions[newindex]);
            console.log(currentQuestion)
            console.info('index after:' + newindex);
        }
        else {
            this.setScore(this.getResult())
            this.setShowResult(true);
        }


    }
    getResult() {
        const { index, score, currentQuestion, showResult, questions } = this.state;
        let correct = 0;
        let i = 0;
        questions.map((question) => {
            console.info(`${question.answer},${this.response[i]},${question.answer === this.response[i]}`)
            if (question.answer === this.response[i])
                correct++;
            i++;
        })
        console.info(this.response)
        console.info(questions)
        console.info(score)
        console.info(correct)
        return correct;
    }


    render() {
        const { index, score, currentQuestion, showResult, questions, response } = this.state;
        return (<>{showResult ? <ResultView
            size={questions.length}
            score={this.state.score}
            name={this.state.name} /> : <><div className="question-section">

                <div className='question-count'>
                    <span>Question {index + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{index + 1}. {this.state.currentQuestion.question}</div>

            </div>
                <div className="answer-section">
                    <div className='question-count'>
                        <span>Options:</span>
                    </div>

                    <div>
                        {
                            this.state.currentQuestion.options.map((option) => {
                                return <button className='button' key={option} id={option} onClick={(e) => this.handleOptionClick(e)}>{option}</button>
                            })
                        }
                    </div>

                </div></>}</>);
    }
}
class ResultView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<div className='result-container'>
            <div className='question-count'>
                <span>Congrats {this.props.name}!</span>
            </div>
            <img className='star-img' src={require('../star.png')} />
            <div className='question-count'>
                <span>You have Scored {this.props.score}</span>/{this.props.size}
            </div>
        </div>);
    }
}


