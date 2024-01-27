import { createPinia, type Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

let _pinia: Pinia

export const setupPinia = () => {
    if(!_pinia){
        _pinia = createPinia()
        _pinia.use(piniaPluginPersistedstate)
    }
    return _pinia
}