import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from 'urql';
import { AuthContext } from './contexts/AuthContext';
import Comments from './components/Comments';
const QUERY = `query MyQuery($repoOwner: String!, $repoName: String!, $issueNumber: Int!) {
  gitHub {
    repository(name: $repoName, owner: $repoOwner) {
      issue(number: $issueNumber) {
        id
        title
        bodyText
      }
    }
  }
}`;

function App() {
  const { login, status } = React.useContext(AuthContext);

  const [result, reExectureQuery] = useQuery({
    query: QUERY,
    variable: {
      repoOwner: 'koashima',
      repoName: 'subscription-app',
      issueNumber: 1,
    },
  });

  if (!status || !status.github) {
    return (
      <div>
        <h1>log in to github</h1>
        <h1>in order to see your profile, you'll have to log in with github</h1>
        <button onClick={() => login('github')}>login with github</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
