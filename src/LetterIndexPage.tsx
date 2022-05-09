import { useState, useEffect } from "react"

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
     }, [])

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
