import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const maxVotes = Math.max(...points)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <br />
      <button onClick={() => {
        const copy = [...points];
        copy[selected] += 1;
        setPoints(copy);
      }}>Vote</button>
      <button onClick={() => {
        setSelected(Math.floor(Math.random() * anecdotes.length));
      }}>Next Anecdote</button>
      <h2>Anecdote with the most votes</h2>
      {anecdotes[points.indexOf(maxVotes)]}
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App