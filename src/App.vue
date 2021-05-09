<template>
  <a-layout>
    <Header />
    <a-layout-content class="wrapper">
      <router-view />
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
  },
});
</script>

<style lang="scss">
.wrapper {
  min-height: calc(100vh - 100px) !important;
  padding: 50px;
}
</style>
