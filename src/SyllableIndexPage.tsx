import { useState, useEffect } from "react"
import {useParams} from 'react-router'
import { useSearchParams } from "react-router-dom"

import './SyllableIndexPage.css'

type Entries = Array<string>

const getApiLink = (startWith:string, offset:number, limit:number) => {
    return `/api/index/${startWith}?offset=${offset}&limit=${limit}`
}


const SyllableIndexPage = () => {
    const params = useParams()
    const [queryParams, ] = useSearchParams()
    const startWith: string = params.startWith || ''
    const offsetStr = queryParams.get('offset') || '0'
    const offset = parseInt(offsetStr)
    const limit = 100
    const [words, setWords] = useState<Entries>([])

    useEffect(() => {

        const indexGetter = async (startWith: string|undefined) => {
            if (startWith === undefined)
                return
            const response = await fetch(getApiLink(startWith, offset, limit))
            const parsedWords: Entries = await response.json()
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

/*
            <nav aria-label="Result pagination">
                <ul className="pagination">
                    {
                      (offset > 0) ? <li className="page-item"><a className="page-link" href={getAppLink(startWith, offset - limit, limit)}>Назад</a></li> : <></>
                    }
                    <li className="page-item"><a className="page-link" href={getAppLink(startWith, offset + limit, limit)}>Вперед</a></li>
                </ul>
            </nav>
*/

export { SyllableIndexPage }
