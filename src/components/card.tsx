import { useContext, useMemo, useState } from "react";
import { PromptContext } from "../prompt/prompt";

export function Card() {
    const [state, setState] = useState(false);
    const prompt = useContext(PromptContext);

    useMemo(()=> {
        console.log("Prompt result: ", state);
    }, [state]);
    return (
        <div className="card">
            <button onClick={() => prompt?.add("Hello Prompt", [true], setState)}>
                Prompt me!
            </button>
            <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
    );
}
