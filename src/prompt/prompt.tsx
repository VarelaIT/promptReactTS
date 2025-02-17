import React, { ReactNode, useState, createContext, useContext, useMemo } from "react";
export interface IPromptProps{
    message: string;
    options: Array<any>;
    title?: string;
}

export function Prompt({message, options, title}: IPromptProps, callback: (value: any)=> void){
    const [state, setState] = useState(false);
    const prompt = useContext(PromptContext);

    useMemo(()=> {
        callback(state);
        console.log("Prompt result: ", state);
    }, [state]);

    prompt?.add(message, options, setState, title);
}
 
export type AddPromptFC = (message: string, options: Array<any>, setResult: React.Dispatch<React.SetStateAction<any>>, title?: string)=> void;
export const PromptContext = createContext< {add: AddPromptFC} | undefined >(undefined);

export function PromptReactJS({children}: {children: ReactNode}){
    const [promptElements, setPromptElements] = useState<PromptObject[]>([]);
   
    const addPrompt: AddPromptFC = (message: string, options: Array<any>, setResult: React.Dispatch<React.SetStateAction<any>>, title?: string) => {
        const element =  new PromptObject(message, options, setResult, setPromptElements, title);
        setPromptElements([...promptElements, element])
    }

    return (
        <PromptContext.Provider value={{add: addPrompt}}>
            {children}
            <section>
                {promptElements.map((item: PromptObject, i: number)=> {
                    item.setIndex(i);
                    return (
                        <button key={"promptReactJS-node-" + i}
                            onClick={()=> item.close()}
                        >
                            {item.message + ". element " + i}
                        </button>
                    );
                })}
            </section>
        </PromptContext.Provider>
    );
}

export function ExampleNode(){
    const prompt = useContext(PromptContext)

    return (
        <article>
            This is a prompt!
        </article>
    );
}

export interface IPromptNodeProps{
    PromptUI: (parameter: {config: PromptObject;})=> ReactNode;
    config: PromptObject;
}
export function PromptNode({PromptUI, config}: IPromptNodeProps){
    return <PromptUI config={config}/>
}

export class PromptObject{
    title?: string;
    index: number = -1;
    message: string;
    options: Array<any>;
    setter: React.Dispatch<React.SetStateAction<any>>;
    setPromptElements: React.Dispatch<React.SetStateAction<PromptObject[]>>;  

    constructor(
        message: string, 
        options: Array<any>, 
        setter: React.Dispatch<React.SetStateAction<any>>, 
        setPromptElements: React.Dispatch<React.SetStateAction<PromptObject[]>>,  
        title?: string
    ){
        this.title = title;
        this.message = message;
        this.options = options;
        this.setter = setter;
        this.setPromptElements = setPromptElements;
    }

    setIndex(i: number){
        this.index = i;
    }

    setValue(value: any){
        this.setter(value);
    }

    close(){
        this.setter(undefined);
        this.setPromptElements((prev)=> prev.filter((_, i)=> i !== this.index))
    }

}

