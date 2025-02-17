import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { PromptReactJS } from "./prompt/prompt.tsx";
import { Card } from "./components/card.tsx";

function App() {
  return (
    <PromptReactJS>
      <h1>Prompt ReactJS</h1>
      <h2>By: Ismael Varela</h2>
      <div>
        <a href="#">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="#">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Vite + React</p>
      <Card />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </PromptReactJS>
  );
}

export default App;