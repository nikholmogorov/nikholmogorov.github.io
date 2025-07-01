<script setup>
import header_top from './components/header_top.vue'
import footer_bottom from './components/footer_bottom.vue'
import content from './components/content.vue'
</script>
<template>
  <div class="all">
    <header_top/>
    <content/>
    <footer_bottom/>   
  </div>
</template>
<style scoped>
.all{
  border-style: double;
  width: 50%;
  margin: 100px auto 10px auto;
  padding: 20px 20px 20px 20px;
}
</style>