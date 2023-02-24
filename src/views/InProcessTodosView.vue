<template>
  <ion-page id="main-content">
    <ion-content class="ion-padding-top">
      <div v-if="notDoneTodos.length">
        <ListItems
            :items="notDoneTodos"
            @changeState="changeState"
            @deleteItem="deleteItem"
            @editItem="editItem"
        />
      </div>
      <div v-else class="not-todos">
        <h3>Задачи отсутствуют</h3>
      </div>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="editItem(null)">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
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
import { IonPage, IonFab, IonFabButton, IonIcon, IonContent } from '@ionic/vue';
import { add } from 'ionicons/icons';
import {useTodo} from "@/stores/todo.js";
import {useNavigation} from "@/stores/navigation";
import FormItem from "@/components/Item/FormItem.vue";
import ListItems from "@/components/Item/ListItems.vue";
import {onMounted, onUpdated, ref} from "vue";

const todos = useTodo()
const isOpen = ref(false)
const item = ref(null)
const notDoneTodos = ref(todos.todoList.filter(item => !item.isDone))

const navigation = useNavigation()
navigation.title = "Не завершенные задачи"

onMounted(() => {
  notDoneTodos.value = todos.todoList.filter(item => !item.isDone)
})

onUpdated(() => {
  notDoneTodos.value = todos.todoList.filter(item => !item.isDone)
})

function changeItem(item) {
  isOpen.value = false
  if (item.id) {
    for (let i = 0; i < todos.todoList.length; i++) {
      if (todos.todoList[i].id === item.id) {
        todos.todoList[i] = item
        break
      }
    }
  } else {
    item.id = todos.todoList[todos.todoList.length - 1].id + 1
    const date = new Date()
    item.createdAt = date.toLocaleDateString()
    item.isDone = false
    todos.todoList.push(item)
  }
  notDoneTodos.value = todos.todoList.filter(item => !item.isDone)
}

function changeState(itemId) {
  for (let i = 0; i < todos.todoList.length; i++) {
    if (todos.todoList[i].id === itemId) {
      todos.todoList[i].isDone = !todos.todoList[i].isDone
      break
    }
  }
  notDoneTodos.value = todos.todoList.filter(item => !item.isDone)
}

function deleteItem(itemId) {
  for (let i = 0; i < todos.todoList.length; i++) {
    if (todos.todoList[i].id === itemId) {
      todos.todoList.splice(i, 1)
      break
    }
  }
  notDoneTodos.value = todos.todoList.filter(item => !item.isDone)
}

function editItem(itemId=null) {
  if (itemId !== null) {
    for (let i = 0; i < todos.todoList.length; i++) {
      if (todos.todoList[i].id === itemId) {
        item.value = todos.todoList[i]
        break
      }
    }
  } else {
    item.value = {
      title: "",
      description: "",
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
