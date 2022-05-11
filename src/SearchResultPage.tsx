import { SearchControl } from "./SearchControl"
import { WordPage } from "./WordPage"


const SearchResultPage = ()  =>  {
    return <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                <h2 style={{textAlign: 'center'}}>Открытый корейско-русский словарь (한러사전)</h2>
                </div>
                <SearchControl />
            </div>
            
        </div>

        <WordPage />
    </>
}

export { SearchResultPage }