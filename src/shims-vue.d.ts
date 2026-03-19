/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface Window {
  google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string
          callback: (response: { credential: string }) => void
        }) => void
        renderButton: (
          parent: HTMLElement,
          options: {
            type?: string
            theme?: string
            size?: string
            text?: string
            shape?: string
            width?: number
          },
        ) => void
      }
    }
  }
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
}
