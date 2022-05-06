
interface User {
    getName(): Promise<string|undefined>
    login(username: string, password: string, rememberMe: boolean): Promise<void>
    logout(): void
}

class LocalUser implements User {
    async getName() {
       await setTimeout(() => {}, 200);
       let name = localStorage.getItem('name');
       return name === null ? undefined : name;
    }

    async login(username: string, password: string, rememberMe: boolean) {

    }

    logout() {

    }
}

const user = new LocalUser()

function getUser() {
    return user
}

export { getUser };
