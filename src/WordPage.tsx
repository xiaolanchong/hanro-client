import { useState, useEffect } from "react"
import {useParams} from 'react-router'

type Entry = {
    id: number,
    word: string,
    definition: string,
}
type DefinitionList = Entry[]

const WordPage = () => {
    const params = useParams()
    const word: string|undefined = params.word
    const [definitionList, setDefinitionList] = useState<DefinitionList>([])

    const definitionListGetter = async (word: string|undefined) => {
        const response = await fetch(`/api/word/${word}`)
        const parsedWords: DefinitionList = await response.json()
        setDefinitionList(parsedWords);
     }

    useEffect(() => {
        definitionListGetter(word)
     })

    return <>
        <div className="container">
            <h3 className="my-3">{word}</h3>
            {
                definitionList.map((entry:Entry, index) => {
                    return <pre className='my-3' key={index}>{entry.definition}</pre>
                })
            }
        </div>
    </>
}

export { WordPage }
