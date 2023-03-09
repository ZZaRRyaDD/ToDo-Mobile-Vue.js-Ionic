import {defineStore} from 'pinia'

export const useNavigation = defineStore('navigation', {
    state: () => {
        return {
            title: "Не завершенные",
        }
    },
})