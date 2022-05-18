import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {Dropdown} from 'react-bootstrap'
import {getServer} from './Server'


type SearchSuggestionProps = {
    searchSuggestions: string[]
}

const SuggestionDropdownList = ({searchSuggestions}: SearchSuggestionProps) => {
    if (searchSuggestions.length === 0)
        return <></>
    return (
        <Dropdown.Menu variant="dark" show aria-labelledby="searchedWordInput">                 
        {
            searchSuggestions.map((item, index) => {
                return <Dropdown.Item href={`/search/${item}`} key={index}>{item}</Dropdown.Item>
            })
        }
    </Dropdown.Menu>)
}

type WordList = {
    words: string[],
    startWithLetter: string,
}

const SearchControl = () => {
    const [inputValue, setInputValue] = useState<string>()
    let [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
    let [hasInputFocus, setHasInputFocus] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        const limit = 10
        const offset = 0
        const wordListGetter = async (startWith: string|undefined) => {
            if(startWith === undefined || startWith.length === 0) {
                setSearchSuggestions([])
                return
            }
            const parsedWordList: WordList = await getServer().getWordList(startWith, offset, limit)
            setSearchSuggestions(parsedWordList.words)
        }

        wordListGetter(inputValue)
        .catch(console.error)
    } ,[inputValue])

    const onSearch = (word: string|undefined) => {
        if (inputValue !== undefined)
            navigate(`/search/${word}`)
    }

    const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if(evt.key === 'Enter') {
            onSearch(inputValue)
        }
    }

    const onChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const val: string = evt.target.value;
        setInputValue(val);
    }

    const onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        onSearch(inputValue)
    }

    return (
    <div className="row justify-content-center m-3">
        <div className="col-6">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Слово для поиска" id="searchedWordInput" aria-describedby="basic-addon2" 
                onChange={evt => onChangeValue(evt)}
                onKeyDown={evt => onKeyDown(evt)}
                onFocus={() => setHasInputFocus(true)} onBlur={() => setHasInputFocus(false)}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={(evt) => onClick(evt)}
                    >Искать</button>
                </div>
            </div>
            {
                hasInputFocus ? <SuggestionDropdownList searchSuggestions={searchSuggestions} /> : <></>
            }                
        </div>
    </div>
    )
}

export { SearchControl }
