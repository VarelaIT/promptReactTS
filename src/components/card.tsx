import { useContext, useMemo, useState } from "react";
import { PromptContext } from "../prompt/prompt";
import { ConfirmModal } from "../modals/confirmModal";

export function Card() {
    const [state, setState] = useState(false);
    const prompt = useContext(PromptContext);

    useMemo(()=> {
        console.log("Prompt result: ", state);
        if(state){
            prompt?.add({
                message: "This prompt came form another prompt.",
                options: [true],
                setResult: setState, 
                Render: ConfirmModal,
            });
        }
    }, [state]);

    return (
        <div className="card">
            <button onClick={() => prompt?.add({message: "Welcome to PromptReactTS! click 'OK' to be Prompt again...", options: [true], setResult: setState, Render: ConfirmModal})}>
                Prompt me!
            </button>
            <p>
                Edit <code>src/App.tsx</code> 
            </p>
        </div>
    );
}
