<template>
  <ion-list lines="none" inset="true">
    <ion-item v-for="todo of items" :key="todo.id">
      <TodoItem
          :item="todo"
          @changeState="$emit('changeState', todo.id)"
          @deleteItem="$emit('deleteItem', todo.id)"
          @editItem="$emit('editItem', todo.id)"
      />
    </ion-item>
  </ion-list>
</template>

<script setup>
import {IonItem, IonList} from '@ionic/vue';
import TodoItem from "@/components/Item/TodoItem.vue";

defineProps({
  items: Array,
})
</script>

<style scoped>
* {
  color: #000;
}

ion-list, ion-item {
  background-color: #FFF !important;
}
</style>