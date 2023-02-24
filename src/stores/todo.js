import { defineStore } from 'pinia'

export const useTodo = defineStore('todo', {
    state: () => {
        return {
            todoList: [
                {id: 1, isDone: true, title: "Задача 1", description: "Описание для задачи 1", createdAt: "20.02.2023"},
                {id: 2, isDone: false, title: "Задача 2", description: "Описание для задачи 2", createdAt: "20.02.2023"},
                {id: 3, isDone: true, title: "Задача 3", description: "Описание для задачи 3", createdAt: "20.02.2023"},
                {id: 4, isDone: false, title: "Задача 4", description: "Описание для задачи 4", createdAt: "20.02.2023"},
                {id: 5, isDone: true, title: "Задача 5", description: "Описание для задачи 5", createdAt: "20.02.2023"},
                {id: 6, isDone: false, title: "Задача 6", description: "Описание для задачи 6", createdAt: "20.02.2023"},
            ],
        }
    },
})