import React from 'react';
import './App.css';
import { AuthContext } from './contexts/AuthContext';
import Comments from './components/CommentsSubscription';
import Input from './components/Input';

function App() {
  const { login, status } = React.useContext(AuthContext);

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
        <div style={{ minWidth: 400 }}>
          <Comments />
          <Input />
        </div>
      </header>
    </div>
  );
}

export default App;
