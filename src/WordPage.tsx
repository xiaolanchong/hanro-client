import { useState, useEffect } from "react"
import {useParams} from 'react-router'
import './WordPage.css'

type Entry = {
    id: number,
    word: string,
    definition: string,
}
type DefinitionList = Entry[]

type Props = {
    definition: string
}

const Section = ({definition}: Props) => {
    return <>{
        definition.split('\n').map( (line, index) => {
            if(index < 2)
                return <li className='' key={index}>{line}</li>
            else
                return <li  key={index} className='sample-text mx-2'>{line}</li>
        })
    }</>
}

const Definition = ({definition}: Props) => {
    return <>{
        definition.split('\n\n').map( (section, index) => {
            return <section className='my-3' key={index}>
                       <Section definition={section} />
                   </section>       
        })
    }</>
}

const WordPage = () => {
    const params = useParams()
    const word: string|undefined = params.word
    const [definitionList, setDefinitionList] = useState<DefinitionList|undefined>([])

    useEffect(() => {
        const definitionListGetter = async (word: string|undefined) => {
            const response = await fetch(`/api/word/${word}`)
            const parsedWords: DefinitionList = await response.json()
            setDefinitionList(parsedWords);
         }

        definitionListGetter(word)
        .catch(console.error)
     }, [word])

     const ResultRender = () => {
        if (definitionList === undefined)
            return <></>

        if (definitionList.length === 0)
            return <div className="font-italic">Ничего не найдено</div> 

            
        return  <>
                    {
                        definitionList.map((entry:Entry, index) => {
                            //return <pre className='my-3' key={index}>{entry.definition}</pre>
                            return <section key={index}>
                                      <ul className='list-unstyled'><Definition definition={entry.definition} /></ul>
                                   </section>
                    })}
                </>      
     }

    return <>
        <div className="container">
            <h3 className="my-3">{word}</h3>
            <ResultRender />
        </div>
    </>
}

export { WordPage }
