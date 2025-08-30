import axios from "axios";
import React, { useState, useEffect } from "react";
import "./question.css";
const API_KEY = "ZkTGY4rcCDZaboYC40bK5GPpIkEg7j429psAXNfR"; // replace with your actual key


async function getQuestions(params) {
  let questions = [];
  try {
    const response = await axios.get("https://quizapi.io/api/v1/questions", {
      headers: { "X-Api-Key": API_KEY },
      params: {
        category:  " linux",
        difficulty:  "Easy",
        limit:  10,
      }
    });
    console.log("API Response:", response.data); 
    questions = response.data.map(q => ({
        questions: q.question,
        answers: q.answers,
        correct_answers: q.correct_answers
   }))
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return [];
  }
    return questions;
}

function Quiz(){
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentKey, setKey] = useState("");
  // useEffect(() =>{
  //   setQuestions([{questions: "What is Linux?",
  // answers: {answer_a: "A type of fruit", answer_b: "An operating system", answer_c: "A programming language", answer_d: "A web browser", answer_e: null, answer_f: null},
  // correct_answers: {answer_a_correct: "false", answer_b_correct: "true", answer_c_correct: "false", answer_d_correct: "false", answer_e_correct: "false", answer_f_correct: "false"}},
  // {questions: "What command is used to list files in a directory?",
  // answers: {answer_a: "ls", answer_b: "cd", answer_c: "mkdir", answer_d: "rm", answer_e: null, answer_f: null},
  // correct_answers: {answer_a_correct: "true", answer_b_correct: "false", answer_c_correct: "false", answer_d_correct: "false", answer_e_correct: "false", answer_f_correct: "false"}}]);
  //   }, []);
  useEffect(() => {
    getQuestions().then(data => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (!questions.length) return <h2>No questions found.</h2>;

  const q = questions[index];
    const Check = (truthval, e, key) => {
      setPressed(true);
      setKey(key);
      if(truthval === "true"){
        setScore(score + 1);
      }
    }
    return(
        <>
        <div>
            <h1>{q.questions}</h1>
            <h2>{score}</h2>
            <ul className="options">
                {Object.entries(q.answers).map(([key, value]) =>
                value ? (
                    <li key={key} className={"option"}>
                    <button
                         disabled={pressed}
                         onClick={(e) => Check(q.correct_answers[key + "_correct"], e, key)}
                         className= {pressed && currentKey===key ? q.correct_answers[currentKey +"_correct"]===true ? "correct" :"wrong": ""}
                    > 
                        {value}
                    </button>
                    </li>
                ) : null
                )}
            </ul>
            <button disabled={!pressed} onClick={()=>{
              index < questions.length-1 ?setIndex(index+1): setIndex(index) ; 
              index < questions.length-1 ? setPressed(false) : setPressed(true);
              }}>NEXT</button>
            </div>
        </>
    )
}

export default Quiz;