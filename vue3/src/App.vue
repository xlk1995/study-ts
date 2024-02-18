<template>
  <div>{{ x }}</div>
  <Button @click="x++">+1</Button>
  <div>{{ moment().format("YYYY-MM-DD hh:mm:ss") }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";

const x = ref<number>(1);
</script>

<style lang="less">
@red: red;
html,
body {
  background: @red;
}
</style>
