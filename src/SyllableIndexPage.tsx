import { useState, useEffect } from "react"
import {useParams} from 'react-router'
import { useSearchParams } from "react-router-dom"
import {getServer} from './Server'
import './SyllableIndexPage.css'


const SyllableIndexPage = () => {
    const params = useParams()
    const [queryParams, ] = useSearchParams()
    const startWith: string = params.startWith || ''
    const offsetStr = queryParams.get('offset') || '0'
    const offset = parseInt(offsetStr)
    const limit = 100
    const [words, setWords] = useState<string[]>([])

    useEffect(() => {
        const indexGetter = async (startWith: string|undefined) => {
            if (startWith === undefined)
                return
            const parsedWords = await getServer().getIndexSyllables(startWith, offset, limit)
            setWords(parsedWords);
         }

        indexGetter(startWith)
        .catch(console.error)
     }, [startWith, offset])

    return <>
        <div className="container">
            <div><a href='/index'>⬅ На список начальных букв</a></div>
            <h2 className='text-center my-3'>{`Начальные слоги на букву ${startWith}`}</h2>
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
