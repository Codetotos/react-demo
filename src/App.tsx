import {AxiosGet, AxiosPost, AxiosPut, Request} from "./api/request";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <hr/>
        <button onClick={() => AxiosGet('posts')}>Get按钮</button>

        <button onClick={() => AxiosGet('posts', {id: 1})}>Get按钮</button>

        <button onClick={() => AxiosPost('posts')}>Post按钮</button>

        <button onClick={() => AxiosPut('posts')}>Put按钮</button>

        <button onClick={() => Request('posts')}>Patch按钮</button>
      </header>
    </div>
  );
}

export default App;
