import React from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = React.useState();
  const url = "http://127.0.0.1:8000";

  const GetData = () => {
    axios.get(url).then((res) => {
      setData(res.data)
    })
  }

  return (
    <main>
      <div>
        ここに処理を書いていきます
      </div>
      {/* {if文のような条件式 ? trueだった場合の処理 : falseだった場合の処理} */}
      {data ? <div>{data.Hello}</div>: <button onClick={GetData}>GET API</button> }
    </main>
  )
}
