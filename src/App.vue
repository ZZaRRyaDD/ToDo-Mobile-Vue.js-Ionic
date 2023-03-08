<template>
  <ion-app>
    <NavBar />
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
