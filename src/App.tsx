import {AxiosGet, AxiosPost} from "./api/request";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <hr/>
        <button onClick={() => AxiosGet('posts')}>Get按钮</button>
        <button onClick={() => AxiosGet('posts', {id: 1})}>Get按钮</button>

        <button onClick={() => AxiosPost('posts', {id: 1})}>Post按钮</button>
      </header>
    </div>
  );
}

export default App;
