import { useState, useEffect, useCallback } from "react"
import {useParams} from 'react-router'

type Entry = {
    id: number,
    word: string,
    definition: string,
}
type DefinitionList = Entry[]

type Props = {
    definition: string
}

const DefinitionSection = ({definition}: Props) => {
    return <>{
        definition.split('\n').map( (line, index) => {
            return <li className='' key={index}>{line}</li>
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
       // console.log('Render')
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
                            return <section key={index}><ul className='list-unstyled'><DefinitionSection definition={entry.definition} /></ul></section>  //className='my-3' key={index}>{entry.definition}
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
