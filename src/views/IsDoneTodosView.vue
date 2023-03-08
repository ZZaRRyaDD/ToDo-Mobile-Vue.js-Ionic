<template>
  <ion-page>
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
import {useNavigation} from "@/stores/navigation";
import FormItem from "@/components/Item/FormItem.vue";
import ListItems from "@/components/Item/ListItems.vue";
import {ref, onMounted, onUpdated} from "vue";
import firebaseService from "@/firebase-service";

const todoList = []
const isOpen = ref(false)
const item = ref(null)
const isDoneTodos = ref(todoList.filter(item => item.isDone))

const navigation = useNavigation()
navigation.title = "Выполненные задачи"

async function getTasks() {
  const todoList = await firebaseService().readAll("Tasks")
  isDoneTodos.value = todoList.filter(item => item.isDone).sort()
}

onMounted(async () => {
  await getTasks()
})

onUpdated(async () => {
  await getTasks()
})

async function changeItem(item) {
  isOpen.value = false
  if (item.id) {
    await firebaseService().update('Tasks', item.id, item)
  }
  await getTasks()
}

async function changeState(itemId) {
  let item = await firebaseService().readById('Tasks', itemId);
  item.isDone = !item.isDone
  await firebaseService().update('Tasks', item.id, item)
  await getTasks()
}

async function deleteItem(itemId) {
  await firebaseService().remove('Tasks', itemId);
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === itemId) {
      todoList.splice(i, 1)
      break
    }
  }
  isDoneTodos.value = todoList.filter(item => item.isDone)
}

function editItem(itemId=null) {
  if (itemId !== null) {
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === itemId) {
        item.value = todoList[i]
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
