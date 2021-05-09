<template>
  <a-layout-footer class="footer">
    <h4>Copyright {{ new Date().getFullYear() }}</h4>
  </a-layout-footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style lang="scss">
.footer {
  background: #abc4ea !important;
}
</style>
