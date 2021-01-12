import { randomFill } from "crypto";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(rand);
  return rand;
};

const Button = ({ clickHandler, label }) => {
  return <button onClick={clickHandler}>{label}</button>;
};

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const Anecdote = ({ text }) => {
  return <p>{text}</p>;
};

const Score = ({ score }) => {
  return <p>Has {score} votes</p>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const voteHandler = (pointsArray, index) => {
    const copy = [...pointsArray];
    // increment the value in position 2 by one
    copy[selected] += 1;
    setPoints(copy);
  };

  const getMaxIndex = (votes) => {
    let currentMax = 0;
    let currentMaxIndex = 0;
    votes.forEach((value, index) => {
      if (value > currentMax) {
        currentMax = value;
        currentMaxIndex = index;
      }
    });
    return currentMaxIndex;
  };

  const mostVotes = (votes) => {
    return Math.max(...votes);
  };

  console.log(points);

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote text={props.anecdotes[selected].anecdote} />

      <Score score={points[selected]} />
      <Button label="vote" clickHandler={() => voteHandler(points, selected)} />
      <Button
        label="next anecdote"
        clickHandler={() => setSelected(getRandomInt(0, anecdotes.length - 1))}
      />
      <Heading text="Anecdote with the most votes" />
      <Anecdote text={props.anecdotes[getMaxIndex(points)].anecdote} />
      <Score score={points[getMaxIndex(points)]} />
    </div>
  );
};

const anecdotes = [
  {
    anecdote: "If it hurts, do it more often",
    score: 0,
  },
  {
    anecdote: "Adding manpower to a late software project makes it later!",
    score: 0,
  },
  {
    anecdote:
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    score: 0,
  },
  {
    anecdote:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    score: 0,
  },
  { anecdote: "Premature optimization is the root of all evil.", score: 0 },
  {
    anecdote:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    score: 0,
  },
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
