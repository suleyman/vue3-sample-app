<template>
  <div class="page home-page">
    <h1>{{ t("Sample") }}</h1>
    <h3>{{ t("hello") }}</h3>
    <p>
      {{ t("home-text") }}
    </p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "Home",
  setup() {
    const { t } = useI18n({ useScope: "global" });
    return {
      t,
    };
  },
});
</script>
