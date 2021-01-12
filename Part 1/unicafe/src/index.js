import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ label, clickHandler }) => {
  return <button onClick={clickHandler}>{label}</button>;
};

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const Statistics = ({ good, neutral, bad }) => {
  const getAll = (good, neutral, bad) => {
    return good + neutral + bad;
  };

  const getAverage = (good, neutral, bad) => {
    if (getAll(good, neutral, bad) === 0) {
      return 0;
    } else {
      return (good + bad * -1) / getAll(good, neutral, bad);
    }
  };

  const percentagePositive = (good, all) => {
    if (all === 0) {
      return 0;
    } else {
      return 100 * (good / all);
    }
  };

  if (getAll(good, neutral, bad) === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <Statistic label="good" value={good} />
        <Statistic label="neutral" value={neutral} />
        <Statistic label="bad" value={bad} />
        <Statistic label="all" value={getAll(good, neutral, bad)} />
        <Statistic label="average" value={getAverage(good, neutral, bad)} />
        <Statistic
          label="positive"
          value={percentagePositive(good, getAll(good, neutral, bad)) + "%"}
        />
      </tbody>
    </table>
  );
};

const Statistic = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Heading text="give feedback" />
      <Button label="good" clickHandler={() => setGood(good + 1)} />
      <Button label="neutral" clickHandler={() => setNeutral(neutral + 1)} />
      <Button label="bad" clickHandler={() => setBad(bad + 1)} />
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
