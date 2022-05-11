import { useState, useEffect } from "react"
import './index.css'

type Entries = Array<string>

const LetterIndexPage = () => {
    const [entries, setEntries] = useState<Entries>([])

    useEffect(() => {
        const indexGetter = async () => {
            const response = await fetch(`/api/index`)
            const parsedEntries: Entries = await response.json()
            setEntries(parsedEntries);
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
