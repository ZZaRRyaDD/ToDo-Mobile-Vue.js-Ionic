<template>
  <ion-page id="main-content">
    <ion-content class="ion-padding">
      <div v-for="currency of currencies" :key="currencies.indexOf(currency)">
        {{ currency.currency }}: {{ currency.price }} {{ currency.currencyFinally }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonContent} from "@ionic/vue";
import {useNavigation} from "@/stores/navigation";
import {ref} from "vue";

const navigation = useNavigation()
navigation.title = "Курсы валют"

const currencies = ref([
  {"currency": "USD", "price": 70.60, "currencyFinally": "рублей"},
  {"currency": "EUR", "price": 76.90, "currencyFinally": "рублей"},
  {"currency": "Эфириум", "price": 1651, "currencyFinally": "USD"},
  {"currency": "Биткоин", "price": 23319, "currencyFinally": "USD"},
  {"currency": "Dogecoin", "price": 0.93, "currencyFinally": "USD"},
])
</script>

<style scoped>
* {
  color: #000;
}

ion-content {
  --background: #FFF;
  --padding-top: 70px;
}
</style>