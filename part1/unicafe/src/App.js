import React, { useState } from 'react'

const FeedbackButton = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total > 0) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={(good - bad) / total} />
          <Statistic text="positive" value={good / total * 100} />
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <FeedbackButton text="good" onClick={() => setGood(good + 1)} />
      <FeedbackButton text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <FeedbackButton text="bad" onClick={() => setBad(bad + 1)} />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App