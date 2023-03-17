<template>
  <ion-page id="main-content">
    <ion-content class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div v-for="currency of currencies" :key="currencies.indexOf(currency)">
        {{ currency.currency }}: {{ currency.price }} {{ currency.currencyFinally }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonContent, IonRefresher, IonRefresherContent} from "@ionic/vue";
import {useNavigation} from "@/stores/navigation";
import {ref, onMounted} from "vue";

const navigation = useNavigation()
navigation.title = "Курсы валют"
const currencies = ref([
  {"currency": "Bitcoin", "price": 0, "currencyFinally": "USD", "url": "BTC/USD"},
  {"currency": "Ethereum", "price": 0, "currencyFinally": "USD", "url": "ETH/USD"},
  {"currency": "Dogecoin", "price": 0, "currencyFinally": "USD", "url": "DOGE/USD"},
  {"currency": "Monero", "price": 0, "currencyFinally": "USD", "url": "XMR/USD"},
  {"currency": "USD", "price": 0, "currencyFinally": "RUB", "url": "USD/RUB"},
  {"currency": "EUR", "price": 0, "currencyFinally": "RUB", "url": "EUR/RUB"},
])

function fetchCurrencies() {
  for (let i = 0; i < currencies.value.length; i++) {
    fetch(`https://rest.coinapi.io/v1/exchangerate/${currencies.value[i].url}`, {
      headers: {
        'X-CoinAPI-Key': process.env.VUE_APP_COIN_API_KEY,
      }
    })
        .then(response => response.json())
        .then(data => currencies.value[i].price = data.rate.toFixed(3));
  }
}

const handleRefresh = (event) => {
  setTimeout(() => {
    fetchCurrencies()
    event.target.complete();
  }, 2000);
};

onMounted(() => {
  fetchCurrencies()
})
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