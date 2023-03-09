<template>
  <ion-page id="main-content">
    <ion-content class="ion-padding">
      <mapbox-map
          :accessToken="access"
          :autoResize="true"
          :center="center"
          width="100%"
          :zoom="9"
      >
        <mapbox-navigation-control position="bottom-left"/>
        <mapbox-geocoder-control/>
        <mapbox-marker :lngLat="center"/>
      </mapbox-map>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonContent} from "@ionic/vue";
import {useNavigation} from "@/stores/navigation";
import {ref} from "vue"
import {MapboxMap, MapboxMarker, MapboxNavigationControl, MapboxGeocoderControl} from "vue-mapbox-ts";

const navigation = useNavigation()
navigation.title = "Карта"

const center = ref([92.797681, 55.994205])
const access = ref(process.env.VUE_APP_ACCESS_MAPBOX)
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