<template>
  <ion-modal :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>Отсутствует подключение к сети</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>
        Подключитесь к сети для пользования приложением
      </p>
    </ion-content>
  </ion-modal>
</template>

<script setup>
import {IonModal, IonHeader, IonToolbar, IonTitle, IonContent} from "@ionic/vue";

defineProps({
  isOpen: Boolean,
})
</script>

<style scoped>
ion-title {
  text-align: center;
}
</style>