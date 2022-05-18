import { useState, useEffect } from "react"
import './index.css'
import {getServer} from './Server'

type Entries = string[]

const LetterIndexPage = () => {
    const [entries, setEntries] = useState<Entries>([])

    useEffect(() => {
        const indexGetter = async () => {
            const entries: Entries = await getServer().getIndexLetters()
            setEntries(entries);
         }

        indexGetter()
        .catch(console.error)
     }, [])

    return <>
        <div className="container">
            <h2 style={{textAlign: 'center'}}>Начальные буквы</h2>
            {
                entries.map((letterOrSyllable, index) => {
                    return <span className='m-3 index-text' key={index}><a href={`/index/${letterOrSyllable}`}>{letterOrSyllable}</a></span>
                })
            }
        </div>
    </>
}

export { LetterIndexPage }
