import { useEffect, useRef, useState } from "react";
import { PromptObject } from "../prompt/prompt";

export function ConfirmCancelModal({config}: {config: PromptObject}){
    const dialogRef = useRef(null);

    useEffect(()=> {
        if(dialogRef){
            const dialog = dialogRef.current as unknown as HTMLDialogElement;
            dialog.showModal();
        }
    }, [dialogRef]);

    const [currentValue, setCurrentValue] = useState<any>(undefined);

    return (
        <dialog ref={dialogRef}
            style={{
                backgroundColor: "#FFF",
                color: "#333",
                border: "none",
                borderRadius: "16px",
                marginBottom: "700px",
            }}
        >
            <article>
                <header 
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "32px",
                        justifyContent: "space-between",
                    }}
                >
                    <h3>Confirm</h3>
                    <button
                        onClick={()=> config.close()}
                    >Close</button>
                </header>
                <p>{config.message}</p>
                <p>
                    <select
                        value={currentValue}
                        onChange={(ev)=> setCurrentValue(ev.target.value)}
                    >
                        {config.options.map((item, i)=>
                            <option key={"optionNuber" + i} value={item.count}>{item.day}</option>
                        )}
                    </select>
                </p>
                <footer
                    style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                    }}
                >
                    <button
                        onClick={()=> config.setValue(currentValue)}
                    >
                        OK
                    </button>
                    <button
                        onClick={()=> config.setValue(false)}
                    >
                        Cancel
                    </button>
                </footer>
            </article>
        </dialog>
    );
}