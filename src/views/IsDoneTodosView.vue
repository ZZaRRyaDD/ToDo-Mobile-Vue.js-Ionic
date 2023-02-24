<template>
  <ion-page id="main-content">
    <ion-content class="ion-padding-top">
      <div v-if="isDoneTodos.length">
        <ListItems
            :items="isDoneTodos"
            @changeState="changeState"
            @deleteItem="deleteItem"
            @editItem="editItem"
        />
      </div>
      <div v-else class="not-todos">
        <h3>Задачи отсутствуют</h3>
      </div>
    </ion-content>
    <FormItem
        :is-open="isOpen"
        v-if="isOpen"
        :item="item"
        @changeItem="changeItem"
        @closeModal="closeModal"
    />
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import {useTodo} from "@/stores/todo.js";
import {useNavigation} from "@/stores/navigation";
import FormItem from "@/components/Item/FormItem.vue";
import ListItems from "@/components/Item/ListItems.vue";
import {ref, onMounted, onUpdated} from "vue";

const todos = useTodo()
const isOpen = ref(false)
const item = ref(null)
const isDoneTodos = ref(todos.todoList.filter(item => item.isDone))

const navigation = useNavigation()
navigation.title = "Выполненные задачи"

onMounted(() => {
  isDoneTodos.value = todos.todoList.filter(item => item.isDone)
})

onUpdated(() => {
  isDoneTodos.value = todos.todoList.filter(item => item.isDone)
})

function changeItem(item) {
  isOpen.value = false
  if (item.id) {
    for (let i = 0; i < todos.todoList.length; i++) {
      if (todos.todoList[i].id === item.id) {
        console.log(todos.todoList[i])
        todos.todoList[i] = item
        break
      }
    }
  }
  isDoneTodos.value = todos.todoList.filter(item => item.isDone)
}

function changeState(itemId) {
  for (let i = 0; i < todos.todoList.length; i++) {
    if (todos.todoList[i].id === itemId) {
      todos.todoList[i].isDone = !todos.todoList[i].isDone
      break
    }
  }
  isDoneTodos.value = todos.todoList.filter(item => item.isDone)
}

function deleteItem(itemId) {
  for (let i = 0; i < todos.todoList.length; i++) {
    if (todos.todoList[i].id === itemId) {
      todos.todoList.splice(i, 1)
      break
    }
  }
  isDoneTodos.value = todos.todoList.filter(item => item.isDone)
}

function editItem(itemId=null) {
  if (itemId !== null) {
    for (let i = 0; i < todos.todoList.length; i++) {
      if (todos.todoList[i].id === itemId) {
        item.value = todos.todoList[i]
        break
      }
    }
  }
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}
</script>

<style scoped>
ion-content {
  --padding-top: 40px;
}

ion-fab-button {
  --background: #E06C17;
  --color: #000;
}

.not-todos {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
