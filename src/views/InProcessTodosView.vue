<template>
  <ion-page>
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
import {useNavigation} from "@/stores/navigation";
import FormItem from "@/components/Item/FormItem.vue";
import ListItems from "@/components/Item/ListItems.vue";
import {onMounted, onUpdated, ref} from "vue";
import firebaseService from "@/firebase-service";

const todoList = []
const isOpen = ref(false)
const item = ref(null)
const notDoneTodos = ref(todoList.filter(item => !item.isDone))

const navigation = useNavigation()
navigation.title = "Не завершенные задачи"

async function getTasks() {
  const todoList = await firebaseService().readAll("Tasks")
  notDoneTodos.value = todoList.filter(item => !item.isDone).sort()
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
  } else {
    const date = new Date()
    item.createdAt = date.toLocaleDateString()
    item.isDone = false
    const data = await firebaseService().create('Tasks', item)
    todoList.push(data)
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
  notDoneTodos.value = todoList.filter(item => item.isDone)
}

function editItem(itemId=null) {
  if (itemId !== null) {
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === itemId) {
        item.value = todoList[i]
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
