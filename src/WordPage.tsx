import { useState, useEffect } from "react"
import {useParams} from 'react-router'
import {Alert, Button} from 'react-bootstrap'
import './WordPage.css'
import {WordEntry, DefinitionList} from './ServerItf'
import {getServer} from './Server'


type HeaderProps = {
    headerText: string
    onEdit: () => void
}

const Header = ({headerText, onEdit}: HeaderProps) => {
    return <div className='container my-2 def-header'>
                <div className='row justify-content-between align-items-start'>
                    <div className='col'>
                            {headerText}
                    </div>
                    <div className='col'>
                    <button type="button" className="btn btn-link m-0 p-0" style={{fontSize: 'small'}} onClick={() => onEdit()}>
                        Править
                    </button>
                    </div>
                </div>
            </div>
}

type ReadonlyDefinitionProps = {
    definition: string
    onEdit: () => void
}

type EditableDefinitionProps = {
    definition: string
    onFinish: (ok: boolean, newText: string) => void
}

const ReadonlyDefinition = ({definition, onEdit}: ReadonlyDefinitionProps) => {
    return <div className='list-unstyled'>
        <div className='container'>
        <div className="row">
            {
            definition.split('\n').map( (line, index) => {
                if(index === 0)
                    return <Header key={index} headerText={line} onEdit={onEdit} />
                else
                    return <p key={index} className='sample-text mx-2 my-0'>{line}</p>
            })}
            </div>
            <div className="row justify-content-end">
                <div className='col-8' style={{fontSize: 'small'}}>               
                </div>
            </div>
        </div>
    </div>    
}

const EditableDefinition = ({definition, onFinish}: EditableDefinitionProps) => {
    const [text, setText] = useState<string>(definition)
    const lineNumber = definition.split("\n").length 
    return <div className='list-unstyled'>
        <textarea name="Text1" className='form-control' cols={75} rows={lineNumber + 1}
            value={text}
            onChange={(event) => setText(event.target.value)}>
        
        </textarea>
        <button className="btn btn-primary" onClick={(event) => onFinish(true, text)}>Ок</button>
        <button className="btn btn-secondary" onClick={() => onFinish(false, '')}>Отмена</button>
    </div>
}

type DefinitionProps = {
    entry: WordEntry
}

type Text = {
    text: string
}
function AlertDismissibleExample({text}: Text) {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} className='position-absolute top-0 end-0'  dismissible>
          {text}
        </Alert>
      );
    }
    return <></>
   // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }

const Definition = ({entry}: DefinitionProps) => {
    const [errorOnSave, setErrorOnsave] = useState<string|undefined>()
    const [readonly, setReadonly] = useState<boolean>(true)
    const onFinishEditing = (confirmed: boolean, newText: string) => {
        setReadonly(true)
        if (newText !== entry.definition)
            getServer().changeWordDefinition(entry.id, newText)
            .then((ok) => { 
                if (!ok) setErrorOnsave(`Failed to save the definition of ${entry.word}. Your change will not be applied`)
            })
            .catch((reason) => {
                setErrorOnsave(reason ?? 'Unknown error while saving')
            })
    }
    return <> 
        {
            readonly 
            ? <ReadonlyDefinition definition={entry.definition} onEdit={() => setReadonly(false)} /> 
            : <EditableDefinition definition={entry.definition} onFinish={onFinishEditing} />
        }
        {
            //errorOnSave !== undefined ? <Alert variant='error' className='position-absolute top-0 end-0'  dismissible>{errorOnSave}</Alert> : <></>
            errorOnSave !== undefined ? <AlertDismissibleExample text={errorOnSave} /> : <></>
        }
    </>
}

const WordPage = () => {
    const params = useParams()
    const word: string|undefined = params.word
    const [definitionList, setDefinitionList] = useState<DefinitionList|undefined>([])

    useEffect(() => {
        const definitionListGetter = async (word: string|undefined) => {
            if (word === undefined)
                return
            const parsedWords = await getServer().getWordDefinition(word)
            setDefinitionList(parsedWords)
         }

        definitionListGetter(word)
        .catch(console.error)
     }, [word])

     const DefinitionList = () => {
        if (definitionList === undefined)
            return <></>

        if (definitionList.length === 0)
            return <div className="font-italic">Ничего не найдено</div> 
    
        const onAddDefinition = () => {

        }
        
        return  <>
                {
                    definitionList.map((entry, index) => {
                        return <section key={index} className='my-2'>
                                    <Definition entry={entry}/>
                                </section>
                })}
                {
                    <button type="button" className="btn btn-link my-2" style={{fontSize: 'small'}} onClick={() => onAddDefinition()}>
                        Добавить значение
                    </button>
                }
                </>      
     }

    return <>
        <div className="container">
            <h3 className="my-3">{word}</h3>
            <DefinitionList />
        </div>
    </>
}

export { WordPage }
