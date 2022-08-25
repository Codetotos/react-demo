import {AxiosGet, AxiosPost, AxiosPut, Request} from "@react-demo/request";

function requestTest() {
  return (
    <div className="requestTest">
      <hr/>
      <button onClick={() => AxiosGet('posts')}>Get按钮</button>

      <button onClick={() => AxiosGet('posts', {id: 1})}>Get按钮</button>

      <button onClick={() => AxiosPost('posts')}>Post按钮</button>

      <button onClick={() => AxiosPut('posts')}>Put按钮</button>

      <button onClick={() => Request('posts')}>Patch按钮</button>
    </div>
  );
}

export default requestTest;
