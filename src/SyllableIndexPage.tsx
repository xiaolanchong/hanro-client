import { useState, useEffect } from "react"
import {useParams} from 'react-router'
import './SyllableIndexPage.css'

type Entries = Array<string>

const SyllableIndexPage = () => {
    const params = useParams()
    const startWith: string|undefined = params.startWith
    const [words, setWords] = useState<Entries>([])

    const indexGetter = async (startWith: string|undefined) => {
        const response = await fetch(`/api/index/${startWith}`)
        const parsedWords: Entries = await response.json()
        setWords(parsedWords);
     }

    useEffect(() => {
        indexGetter(startWith)
     })

    return <>
        <div className="container">
            <h2 style={{textAlign: 'center'}}>{`Слова на букву ${startWith}`}</h2>
            <div className="container">
                <ul className="list-unstyled card-columns">
                    {
                        words.map((word, index) => {
                            return <li key={index}><a href={`/wordlist/${word}`}>{word}</a></li>
                        })
                    }   
                </ul>
            </div>
        </div>
    </>
}

export { SyllableIndexPage }
