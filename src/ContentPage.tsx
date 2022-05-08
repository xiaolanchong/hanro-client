import { useState, useEffect } from "react"
import {useParams} from 'react-router'

type Entries = Array<string>

const LetterIndexPage = () => {
    //const startWith: string|undefined = params.startWith
    const [entries, setEntries] = useState<Entries>([])

    const indexGetter = async () => {
        const response = await fetch(`/api/index`)
        const parsedEntries: Entries = await response.json()
        setEntries(parsedEntries);
     }

    useEffect(() => {
        indexGetter()
     })

    return <>
        <div className="container">
            <h2 style={{textAlign: 'center'}}>Содержимое</h2>
            {
                entries.map((letterOrSyllable, index) => {
                    return <span className='m-3' key={index}><a href={`/content/${letterOrSyllable}`}>{letterOrSyllable}</a></span>
                })
            }
        </div>
    </>
}

export { LetterIndexPage }
