import {InjectionKey} from 'vue'
import {Store, useStore as baseUseStore} from 'vuex'

export interface Config {
    header: Array<{ url: string, path: string }>,
    chat: {
        base_url: string,
        api_key: string,
        history: Array<Array<string>>,
        model: string,
        greeting: boolean
    }
}

export interface Cache {
    [namespace: string]: {
        [key: string]: string
    }
}

export interface State {
    config: Config
    cache: Cache
}

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore() {
    return baseUseStore(key);
}