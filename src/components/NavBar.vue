<template>
  <div>
    <NavigationMenu />
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ navigation.title }}</ion-title>
      </ion-toolbar>
    </ion-header>
  </div>
</template>

<script setup>
import { IonHeader, IonToolbar, IonTitle, IonMenuButton, IonButtons } from '@ionic/vue';
import NavigationMenu from "@/components/NavigationMenu.vue";
import {useNavigation} from "@/stores/navigation";

const navigation = useNavigation()
</script>

<style scoped>
ion-toolbar {
  --background: #E06C17;
  --color: #000;
}
</style>