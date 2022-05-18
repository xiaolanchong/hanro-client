type LoginResult = {
    success: boolean
    message: string
    userId: string
    username: string
}

type LogoutResult = {
    success: boolean
}

type RegistrationResult = {
    success: boolean
    message: string
    userId: string
    username: string
}

enum UserRole {
    USER = 0,
    ADMIN = 1,
    BOT = 2,
    MODERATOR = 3,
}

type UserInfo = {
    id: number
    username: string
    role: UserRole
}

interface User {
    getUserInfo(): Promise<UserInfo|undefined>
    login(username: string, password: string, rememberMe: boolean): Promise<LoginResult>
    logout(): Promise<LogoutResult>
    register(username: string, password: string, email: string|undefined): Promise<RegistrationResult>
}

type WordList = {
    words: string[],
    startWithLetter: string, // the letter words start with
}

type WordEntry = {
    id: number,
    word: string,
    definition: string,  // multiline article, 1st line is header
}
type DefinitionList = WordEntry[]

interface Server {
    getIndexLetters(): Promise<string[]>
    getIndexSyllables(startWith: string, offset:number, limit:number): Promise<string[]>
    getWordList(startWith: string, offset:number, limit:number): Promise<WordList>
    getWordDefinition(word: string): Promise<DefinitionList>
    changeWordDefinition(id: number, newText: string): Promise<boolean>
}

export type {User, Server, 
    UserInfo, LoginResult, LogoutResult, RegistrationResult, 
    WordList, WordEntry, DefinitionList
}
