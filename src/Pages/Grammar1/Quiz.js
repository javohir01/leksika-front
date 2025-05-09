import React, { useEffect, useRef, useState } from "react";
import { questions, questionById } from "../../lib/fetchQuestions";
import Quiz from "react-quiz-component";

function QuizTest() {
  // GETTING THE ID OF THE QUESTION
  const ref = useRef();
  var query = window.location.href;
  var parts = query.split("/");
  var questionID = parts[parts.length - 1];

  const [quiz, setQuiz] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const result = await questionById(questionID);
      // const data = await result.json();
      console.log(await result, await result["data"]);
      setQuiz(await result["data"]);
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (quiz.length !== 0) {
      if (modified) return;
      // alert("hey")
      quiz["questions"].map((q) => {
        // console.log(q["correctAnswer"]);
        const correctAnswer = q["answers"][q["correctAnswer"] - 1];
        q["answers"] = q["answers"].sort(() => Math.random() - 0.5);
        if (correctAnswer === q["answers"][0]) {
          q["correctAnswer"] = "1";
        } else if (correctAnswer === q["answers"][1]) {
          q["correctAnswer"] = "2";
        }
        return q;
      });

      setShowPrompt(true);
      setModified(true);
    }
  }, [quiz]);

  const customRender = (obj) => {
    const handleAnswerClick = (e) => {
      e.preventDefault();
      if (e.target.tagName === 'BUTTON') {
        // Prevent default scroll behavior
        setTimeout(() => {
          const quizElement = document.querySelector('.quiz');
          if (quizElement) {
            quizElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    };

    return (
      <div onClick={handleAnswerClick}>
        <Quiz 
          quiz={quiz}
          showDefaultResult={false}
          onComplete={(obj) => {
            // Prevent scroll on complete
            return false;
          }}
        />
      </div>
    );
  };

  return (
    <>
      <div className="quiz-start">
        {showPrompt && customRender(quiz)}
      </div>
    </>
  );
}

export default QuizTest;
