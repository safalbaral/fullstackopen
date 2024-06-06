import { useState } from "react";

const Button = ({ text, eventHandler }) => <button onClick={eventHandler}>{text}</button>

const Header = ({  text  }) => <h1>{text}</h1>

const Statistics = ( {  good, neutral, bad  } ) => {
  const total = good + neutral + bad;
  return total === 0 ? <p>No Feedback Given</p> : (
    <>
      <Header text="Statistics" />
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={computeAverage(good - bad, total)} />
      <StatisticLine text='positive' value={computePositivePercent(total, good)} />
    </>
  )
}

const computeAverage = (a, b) => a/b

const computePositivePercent = (total, positive) => `${positive/total}%`

const StatisticLine = ({ text, value }) => <p>{text} {value}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="Give Feedback" />
      <Button eventHandler={() => setGood(good + 1)} text={'good'}/>
      <Button eventHandler={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button eventHandler={() => setBad(bad + 1)} text={'bad'}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
};

export default App;
