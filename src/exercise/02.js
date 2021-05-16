// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

function Greeting({initialName = ''}) {
  // Lazy state initialization: using a callback in useState
  // it will only call that function to get the state value
  // when the component is rendered the first time.
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name') || initialName,
  )

  // The callback we’re passing in is called after
  // *every* render of our component (including re-renders).
  // Adds a dependency array of 'name' to avoid the callback
  // being called too frequently.
  // NOTE: This uses shallow comparison Object.is or ===. Cannot
  // compare a complex object like {some: "object"}.
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
