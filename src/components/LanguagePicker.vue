<template>
  <a-select v-model:value="$i18n.locale" class="header__language-picker">
    <a-select-option value="en">EN</a-select-option>
    <a-select-option value="tr">TR</a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LanguagePicker",
});
</script>
