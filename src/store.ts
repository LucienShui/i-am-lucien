import {InjectionKey} from 'vue'
import {Store, useStore as baseUseStore} from 'vuex'

export interface Config {
    header: Array<{ url: string, path: string }>,
    chat: { api: string, history: Array<Array<string>>, greeting: boolean }
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