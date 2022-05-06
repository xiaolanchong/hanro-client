

const MainPage = ()  =>  {
    return <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                <h2 style={{textAlign: 'center'}}>Открытый корейско-русский словарь (한러사전)</h2>
                </div>
            </div>

            <div className="row justify-content-center m-3">
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Слово для поиска" aria-label="word to find" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Искать</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export { MainPage }
