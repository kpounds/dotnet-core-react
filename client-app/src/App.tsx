import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"
import { Value } from "./models/Value"
import axios from "axios"

const App: React.FunctionComponent = () => {
  const [values, setValues] = useState<Value[]>([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/values").then((response) => {
      console.log("response", response)
      setValues(response.data)
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {values.map((value) => (
            <li key={value.id}>{value.name}</li>
          ))}
        </ul>
      </header>
    </div>
  )
}

export default App
