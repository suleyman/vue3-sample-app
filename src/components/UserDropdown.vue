<template>
  <a-dropdown v-if="user">
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">
          {{ user.email }}
        </a-menu-item>
        <a-menu-item key="2" @click="logout">
          <CloseOutlined />
          {{ t("Logout") }}
        </a-menu-item>
      </a-menu>
    </template>
    <a-button>
      {{ user.name }}
      <DownOutlined />
    </a-button>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { CloseOutlined, DownOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "UserDropdown",
  components: {
    CloseOutlined,
    DownOutlined,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n({ useScope: "global" });

    const logout = () => {
      store.dispatch("logout");
    };

    return {
      t,
      user: store.state.user,
      logout,
    };
  },
});
</script>
