import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchControl = () => {
    const [inputValue, setInputValue] = useState<string>()
    const navigate = useNavigate()

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
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Слово для поиска" aria-label="word to find" aria-describedby="basic-addon2" 
                onChange={evt => onChangeValue(evt)} 
                onKeyDown={(evt => onKeyDown(evt))}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={(evt) => onClick(evt)}
                    >Искать</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export { SearchControl }
