import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import { AppContext } from './context';

function HOC() {

  const [theme, setTheme] = useState("light")

  const modifyTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  const testFunction = (param) => {
    console.log(param)
  }

  return (
    <AppContext.Provider value={{ theme, modifyTheme, testFunction }}>
      <Home />
    </AppContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HOC/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
