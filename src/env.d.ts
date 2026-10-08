/// <reference types="vite/client" />

interface GPUAdapter {
    features: {
        has(feature: string): boolean
    }
}

interface Navigator {
    gpu?: {
        requestAdapter(): Promise<GPUAdapter | null>
    }
}

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
