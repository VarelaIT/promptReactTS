import React, { ReactNode, useState, createContext, useContext, useMemo } from "react";

export interface IPromptProps{
    title?: string;
    message: string;
    options: Array<any>;
    setResult: React.Dispatch<React.SetStateAction<any>>;
    Render: (parameter:  {config: PromptObject})=> ReactNode;
}
 
export type AddPromptFC = ({title, message, options, setResult, Render}: IPromptProps)=> void;
export const PromptContext = createContext< {add: AddPromptFC} | undefined >(undefined);

export function PromptReactJS({children}: {children: ReactNode}){
    const [promptElements, setPromptElements] = useState<Array<{render: (parameter: {config: PromptObject})=> ReactNode, config: PromptObject}>>([]);
   
    const addPrompt: AddPromptFC = ({title, message, options, setResult, Render}: IPromptProps) => {
        const element = {render: Render, config: new PromptObject(message, options, setResult, setPromptElements, title)};
        setPromptElements([...promptElements, element])
    }

    return (
        <PromptContext.Provider value={{add: addPrompt}}>
            {children}
            <section>
                {promptElements.map((item, i)=> {
                    item.config.setIndex(i);
                    return (
                        <item.render key={"promptElementNumber" + i}config={item.config}/>
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
    setPromptElements: React.Dispatch<React.SetStateAction<Array<{render: (parameter: {config: PromptObject})=> ReactNode, config: PromptObject}>>>;

    constructor(
        message: string, 
        options: Array<any>, 
        setter: React.Dispatch<React.SetStateAction<any>>, 
        setPromptElements: React.Dispatch<React.SetStateAction<Array<{render: (parameter: {config: PromptObject})=> ReactNode, config: PromptObject}>>>,
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
        this.close();
    }

    close(){
        this.setPromptElements((prev)=> prev.filter((_, i)=> i !== this.index))
    }

}

