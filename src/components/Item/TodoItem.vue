<template>
  <ion-card>
    <ion-row>
      <div>
        <ion-card-header>
          <ion-card-title>{{ item.title }}</ion-card-title>
          <ion-card-subtitle>Дата создания: {{ item.createdAt }}</ion-card-subtitle>
        </ion-card-header>
      </div>
      <ion-button @click="showActions" size="large" fill="clear">
        <ion-icon slot="icon-only" :icon="informationCircleOutline"></ion-icon>
      </ion-button>
    </ion-row>
    <ion-row class="actions" v-show="isShow">
      <ion-card-content>{{ item.description }}</ion-card-content>
      <div>
        <ion-button @click="$emit('changeState', item.id)" v-if="route.name === 'inProcess'" size="large" fill="clear">
          <ion-icon slot="icon-only" :icon="checkmarkDoneCircleOutline"></ion-icon>
        </ion-button>
        <ion-button @click="$emit('changeState', item.id)" v-else size="large" fill="clear">
          <ion-icon slot="icon-only" :icon="returnUpBackOutline"></ion-icon>
        </ion-button>
        <ion-button @click="$emit('editItem', item.id)" size="large" fill="clear">
          <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
        </ion-button>
        <ion-button @click="$emit('deleteItem', item.id)" size="large" fill="clear">
          <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
        </ion-button>
      </div>
    </ion-row>
  </ion-card>
</template>

<script setup>
import {IonCard, IonCardTitle, IonCardHeader, IonIcon, IonCardSubtitle, IonCardContent, IonRow, IonButton} from "@ionic/vue";
import {informationCircleOutline, checkmarkDoneCircleOutline, createOutline, trashOutline, returnUpBackOutline} from 'ionicons/icons';
import {ref} from "vue";
import {useRoute} from "vue-router";

defineProps({
  item: Object,
})

const route = useRoute()

const isShow = ref(false)

function showActions() {
  isShow.value = !isShow.value
}
</script>

<style scoped>
* {
  color: #000;
}

ion-card {
  width: 100% !important;
  background-color: #D9D9D9;
  border-radius: 10px;
  padding: 5px;
}

ion-row.actions {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

ion-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ion-card-content {
  font-size: 18px;
}

ion-button {
  --color: #000;
  --background-hover: #000;
  --background-activated: #000;
  --background-focused: #000;
}
</style>