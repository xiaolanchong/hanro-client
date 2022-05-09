import { useState, useEffect } from "react"
import {useParams} from 'react-router'
import './WordListPage.css'

type WordList = string[]

const WordListPage = () => {
    const params = useParams()
    const startWith: string|undefined = params.startWith
    const [words, setWords] = useState<WordList>([])

    useEffect(() => {
        const wordListGetter = async (startWith: string|undefined) => {
            const response = await fetch(`/api/words/${startWith}`)
            const parsedWords: WordList = await response.json()
            setWords(parsedWords);
         }

        wordListGetter(startWith)
     }, [startWith])

    return <>
        <div className="container">
            <h2 style={{textAlign: 'center'}}>{`Слова на ${startWith}`}</h2>
            <div className="container">
                <ul className="list-unstyled card-columns">
                    {
                        words.map((word, index) => {
                            return <li className='' key={index}><a href={`/word/${word}`}>{word}</a></li>
                        })
                    }   
                </ul>
            </div>
        </div>
    </>
}

export { WordListPage }
