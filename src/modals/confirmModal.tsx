import { useEffect, useMemo, useRef } from "react";
import { PromptObject } from "../prompt/prompt";

export function ConfirmModal({config}: {config: PromptObject}){
    const dialogRef = useRef(null);

    useEffect(()=> {
        if(dialogRef){
            const dialog = dialogRef.current as unknown as HTMLDialogElement;
            dialog.showModal();
        }
    }, [dialogRef]);

    return (
        <dialog ref={dialogRef}>
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
                <footer
                    style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                    }}
                >
                    <button
                        onClick={()=> config.setValue(config.options[0])}
                    >
                        OK
                    </button>
                </footer>
            </article>
        </dialog>
    );
}