<template>
  <a-col :xs="{ span: 4 }" :lg="{ span: 0 }">
    <a-button type="primary" :size="32" @click="onOpen">
      <template #icon>
        <MenuOutlined />
      </template>
    </a-button>
    <a-drawer title="Menü" placement="left" :closable="true" :visible="visible" @close="onClose">
      <!-- Navigation links -->
      <router-link :to="{ name: 'Home' }" class="nav-item">
        <span>{{ t("Home") }}</span>
      </router-link>
      <router-link :to="{ name: 'Contact' }" class="nav-item">
        <span>{{ t("Contact") }}</span>
      </router-link>
      <LanguagePicker class="mt-15" />
      <UserDropdown class="mt-15" v-if="user" />
      <LoginModal class="mt-15" v-if="!user" />
    </a-drawer>
  </a-col>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import LanguagePicker from "@/components/LanguagePicker.vue";
import UserDropdown from "@/components/UserDropdown.vue";
import LoginModal from "@/components/LoginModal.vue";

export default defineComponent({
  name: "MobileMenu",
  components: {
    LoginModal,
    UserDropdown,
    LanguagePicker,
    MenuOutlined,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n({ useScope: "global" });

    const user = computed(() => store.state.user);

    const onOpen = () => {
      store.dispatch("showMobileMenu");
    };
    const onClose = () => {
      store.dispatch("hideMobileMenu");
    };

    return {
      t,
      user,
      visible: computed(() => store.state.showMobileMenu),
      onOpen,
      onClose,
    };
  },
});
</script>

<style lang="scss">
.nav-item {
  display: block;
  padding: 10px 0;
}
.mt-15 {
  margin-top: 15px;
}
</style>
