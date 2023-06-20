"use client";
import React, { useCallback, useEffect, useState } from "react";

export default function Home() {

    const [foo, setFoo] = useState(1)
    const [text, setText] = useState<string>("")
    const [isShow, setIsShow] = useState<boolean>(true)

    const handleClick = () => {
        setFoo(foo => foo + 1)
    }

    useEffect(()=> {
        document.body.style.backgroundColor = "lightblue"

        return () => {
            document.body.style.backgroundColor = ""

        }
    }, [])


    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 5) {
            alert("だめ")
            return
        }
        setText(e.target.value)
    }, [])

    const handleDisplay = () => {
        setIsShow(!isShow)
    }


return (
    <div className="index">
    <main>
        {isShow ? <h1>{foo}</h1> : null}

    
            <button onClick={handleClick}>ボタン</button>
        
        <button onClick={handleDisplay}>{isShow? "非表示":"表示"}</button>

        <input type="text" value={text} onChange={handleChange}/>
    </main>
    </div>
);
}