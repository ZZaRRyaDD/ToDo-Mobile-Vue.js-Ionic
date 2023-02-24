<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Меню</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding-vertical">
      <ion-list lines="none">
        <ion-item>
          <ion-menu-toggle>
            <ion-button fill="clear" @click="toInProcessView">
              Не завершенные задачи
            </ion-button>
          </ion-menu-toggle>
        </ion-item>
        <ion-item>
          <ion-menu-toggle>
            <ion-button fill="clear" @click="toIsDoneView">
              Выполненные задачи
            </ion-button>
          </ion-menu-toggle>
        </ion-item>
        <ion-item>
          <ion-menu-toggle>
            <ion-button fill="clear" @click="currenciesView">
              Курсы валют
            </ion-button>
          </ion-menu-toggle>
        </ion-item>
        <ion-item>
          <ion-menu-toggle>
            <ion-button fill="clear" @click="mapView">
              Карта
            </ion-button>
          </ion-menu-toggle>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup>
import {IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonList, IonItem, IonButton } from "@ionic/vue";
import { useRouter } from 'vue-router';
import {useNavigation} from "@/stores/navigation";

const router = useRouter();

function toInProcessView() {
  router.push({name: 'inProcess'})
  const navigation = useNavigation()
  navigation.title = "Не завершенные задачи"
}

function toIsDoneView() {
  router.push({name: 'isDone'})
  const navigation = useNavigation()
  navigation.title = "Выполненные задачи"
}

function currenciesView() {
  router.push({name: 'currencies'})
  const navigation = useNavigation()
  navigation.title = "Курсы валют"
}

function mapView() {
  router.push({name: 'map'})
  const navigation = useNavigation()
  navigation.title = "Карта"
}
</script>

<style scoped>
ion-toolbar {
  --background: #E06C17;
  --color: #000;
}

ion-content, ion-list, ion-item, ion-label {
  --background: #D9D9D9;
  padding: 0;
}

ion-button {
  --color: #000;
  --background-hover: #000;
  --background-activated: #000;
  --background-focused: #000;
}
</style>