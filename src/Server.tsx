import {User, Server, 
    UserInfo, LoginResult, LogoutResult, RegistrationResult, 
    WordList, DefinitionList} from './ServerItf'

class RemoteUser implements User {
    async getUserInfo() {
        const url = '/api/getUserInfo'
        const response = await fetch(url, {
            method: 'GET',
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'include', // include, *same-origin, omit
            headers: {
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
        })
        const jsonRes: UserInfo = await response.json()
        if (response.status !== 200)
            return undefined
        return jsonRes
    }

    async login(username: string, password: string, rememberMe: boolean) {
        const data = {
            username: username, 
            password: password,
            rememberMe: rememberMe
        }
        const url = '/api/login'
        const response = await fetch(url, {
            method: 'POST',
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data)
          })
          
          const jsonRes = await response.json()
          const result: LoginResult = {
            success: response.status === 200,
            message: jsonRes.message,
            userId: jsonRes.userId,
            username: username,
        }
        return result   
    }

    async logout() {
        const data = { 
        }
        const url = '/api/logout'
        const response = await fetch(url, {
            method: 'POST',
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data)
          })
          
          const result: LogoutResult = {
            success: response.status === 200, 
        }
        return result
    }

    async register(username: string, password: string, email: string|undefined): Promise<RegistrationResult> {
        const data = {
            username: username, 
            password: password,
            email: email || '',
        }
        const url = '/api/register'
        const response = await fetch(url, {
            method: 'POST',
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
          })
          
          const jsonRes = await response.json()
          const result: RegistrationResult = {
            success: response.status === 200,
            message: jsonRes.message,
            userId: jsonRes.userId,
            username: username,
        }
        return result   
    }
}

class RemoteServer implements Server {
    async getIndexLetters(): Promise<string[]> {
        const response = await fetch(`/api/index`)
        const parsedEntries: string[] = await response.json()
        return parsedEntries
    }

    async getIndexSyllables(startWith: string, offset:number, limit:number): Promise<string[]> {
        const url = `/api/index/${startWith}?offset=${offset}&limit=${limit}`
        const response = await fetch(url)
        const parsedWords: string[] = await response.json()
        return parsedWords
    }

    async getWordList(startWith: string, offset:number, limit:number): Promise<WordList> {
        const response = await fetch(`/api/words/${startWith}?offset=${offset}&limit=${limit}`)
        const parsedWordList: WordList = await response.json()
        return parsedWordList
    }

    async getWordDefinition(word: string): Promise<DefinitionList> {
        const response = await fetch(`/api/word/${word}`)
        const parsedDefs: DefinitionList = await response.json()
        return parsedDefs
    }

    async changeWordDefinition(id: number, newText: string): Promise<boolean> {
        const data = {
            definition: newText
        }
        const url = `/api/editWord/${id}`
        const response = await fetch(url, {
            method: 'POST',
            mode: 'same-origin',
            cache: 'no-cache',
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
          })
          
        //const jsonRes = await response.json()
     /*   const result: RegistrationResult = {
            success: response.status === 200,
            message: jsonRes.message,
            userId: jsonRes.userId,
            username: username,
        }*/
        return response.status === 200           
    }
}

const user = new RemoteUser()

function getUser() {
    return user
}

const server = new RemoteServer()

function getServer() {
    return server
}

export { getUser, getServer };
