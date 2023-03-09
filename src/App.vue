<template>
  <ion-app>
    <NavBar/>
    <ion-router-outlet id="main-content"/>
    <Modal :isOpen="!online"/>
  </ion-app>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import Modal from "@/components/Modal.vue";
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {Network} from '@capacitor/network';
import {onMounted, ref} from "vue";

const online = ref(true)
Network.addListener('networkStatusChange', status => {
  online.value = status.connected
});

onMounted(async () => {
  online.value = (await Network.getStatus()).connected
})
</script>
