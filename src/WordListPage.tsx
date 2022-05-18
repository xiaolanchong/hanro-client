import { useState, useEffect } from "react"
import {useParams } from 'react-router'
import { useSearchParams } from "react-router-dom"
import {WordList} from './ServerItf'
import {getServer} from './Server'
import './WordListPage.css'


const getLink = (startWith: string, offset: number, limit: number) => {
    return `/wordlist/${startWith}?offset=${offset}&limit=${limit}`
}

const WordListPage = () => {
    const params = useParams()
    const startWith: string|undefined = params.startWith
    const [wordList, setWordList] = useState<WordList>({words: [], startWithLetter: ''})
    const [queryParams, ] = useSearchParams()
    const offsetStr = queryParams.get('offset') || '0'
    const offset = parseInt(offsetStr)
    const limit = 100

    useEffect(() => {
        const wordListGetter = async (startWith: string|undefined) => {
            if (startWith === undefined)
                return
            const parsedWordList = await getServer().getWordList(startWith, offset, limit)
            setWordList(parsedWordList)
         }

        wordListGetter(startWith)
        .catch(console.error)
    }, [startWith, offset])

    if(startWith === undefined)
        return <></>

    return <>
        <div className="container">
            <div><a href={`/index/${wordList.startWithLetter}`}>{`⬅ Слоги на букву ${wordList.startWithLetter}`}</a></div>
            <h2 className='text-center my-3'>{`Слова на слог ${startWith}`}</h2>
            <div className="container"> 
                <ul className="list-unstyled card-columns">
                    {
                        wordList.words.map((word, index) => {
                            return <li className='' key={index}><a href={`/word/${word}`}>{word}</a></li>
                        })
                    }   
                </ul>
            </div>

            <nav aria-label="Result pagination">
                <ul className="pagination">
                    {
                       (offset > 0)
                       ? <li className="page-item"><a className="page-link mx-2" href={getLink(startWith, offset - limit, limit)}>◄ Предыдущие слова</a></li>
                       : <></>
                    }
                    {
                        (wordList.words.length === limit)
                        ? <li className="page-item"><a className="page-link" href={getLink(startWith, offset + limit, limit)}>Следующие слова ►</a></li>
                        : <></>
                    }
                </ul>
            </nav>
        </div>
    </>
}

export { WordListPage }
