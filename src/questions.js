import axios from "axios";
import React, { useState, useEffect } from "react";

const API_KEY = "ZkTGY4rcCDZaboYC40bK5GPpIkEg7j429psAXNfR"; // replace with your actual key


async function getQuestions(params) {
  let questions = [];
  try {
    const response = await axios.get("https://quizapi.io/api/v1/questions", {
      headers: { "X-Api-Key": API_KEY },
      params: {
        category:  " linux",
        difficulty:  "Easy",
        limit:  1,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestions().then(data => {
      setQuestions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (!questions.length) return <h2>No questions found.</h2>;

  const q = questions[0];
    const Check = (truthval, e) => {
        if(truthval === "true"){
            e.target.style.backgroundColor = "green";
        } else {
            e.target.style.backgroundColor = "red";
        }
    }
    return(
        <>
        <div>
            <h1>{q.questions}</h1>
            <ul>
                {Object.entries(q.answers).map(([key, value]) =>
                value ? (
                    <li key={key}>
                    <button
                        onClick={(e) => Check(q.correct_answers[key + "_correct"], e)}
                    >
                        {value}
                    </button>
                    </li>
                ) : null
                )}
            </ul>
            </div>
        </>
    )
}

export default Quiz;