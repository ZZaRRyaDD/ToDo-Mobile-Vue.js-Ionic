<template>
  <ion-modal :is-open="isOpen" @didDismiss="$emit('closeModal')">
    <ion-col>
      <ion-list lines="none">
        <ion-item ref="titleInput" fill="outline" color="dark">
          <ion-label position="floating">Название задачи</ion-label>
          <ion-input @ionInput="validateTitle" :value="newItem.title" v-model="newItem.title"></ion-input>
          <ion-note slot="error">Введите корректное название задачи</ion-note>
        </ion-item>
        <ion-item ref="descriptionInput" fill="outline" color="dark">
          <ion-label position="floating">Описание задачи</ion-label>
          <ion-textarea @ionInput="validateDescription" :value="newItem.description" v-model="newItem.description"></ion-textarea>
          <ion-note slot="error">Введите корректное описание задачи</ion-note>
        </ion-item>
      </ion-list>
      <ion-row>
        <ion-button @click="$emit('closeModal')" size="large" fill="clear">
          Отмена
        </ion-button>
        <ion-button @click="changeItem" size="large" fill="clear">
          {{ newItem?.id ? "Обновить" : "Создать"}}
        </ion-button>
      </ion-row>
    </ion-col>
  </ion-modal>
</template>

<script setup>
import {IonNote, IonModal, IonItem, IonInput, IonTextarea, IonList, IonButton, IonRow, IonCol, IonLabel} from "@ionic/vue";
import {ref} from "vue";

const props = defineProps({
  item: Object,
  isOpen: Boolean,
})

const emit = defineEmits(['changeItem'])

const titleInput = ref("")
const descriptionInput = ref("")

const newItem = ref(JSON.parse(JSON.stringify(props.item)))

function validateTitle(event) {
  let value = newItem.value.title
  if (event.target) {
    value = event.target.value
  }
  titleInput.value.$el.classList.remove("ion-valid")
  titleInput.value.$el.classList.remove("ion-invalid")
  if (!value.length) {
    titleInput.value.$el.classList.add("ion-invalid")
  } else {
    titleInput.value.$el.classList.add("ion-valid")
  }
}

function validateDescription(event) {
  let value = newItem.value.description
  if (event.target) {
    value = event.target.value
  }
  descriptionInput.value.$el.classList.remove("ion-valid")
  descriptionInput.value.$el.classList.remove("ion-invalid")
  if (!value.length) {
    descriptionInput.value.$el.classList.add("ion-invalid")
  } else {
    descriptionInput.value.$el.classList.add("ion-valid")
  }
}

function changeItem() {
  if (newItem.value.description.length && newItem.value.title.length) {
    descriptionInput.value.$el.classList.remove("ion-valid")
    descriptionInput.value.$el.classList.remove("ion-invalid")
    titleInput.value.$el.classList.remove("ion-valid")
    titleInput.value.$el.classList.remove("ion-invalid")
    emit('changeItem', newItem.value)
  } else {
    validateTitle(newItem.value.title)
    validateDescription(newItem.value.description)
  }
}
</script>

<style scoped>
* {
  font-size: 18px;
}

ion-modal {
  --width: fit-content;
  --min-width: 400px;
  --height: fit-content;
  --border-radius: 10px;
}

ion-button {
  --color: #000;
  --background-hover: #000;
  --background-activated: #000;
  --background-focused: #000;
}

ion-item  {
  margin-bottom: 15px;
}

ion-col, ion-list {
  padding: 10px 15px 0;
}

ion-row {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
}
</style>