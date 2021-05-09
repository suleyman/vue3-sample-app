<template>
  <a-layout-header class="header">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <!-- Logo -->
        <router-link :to="{ name: 'Home' }" class="header__logo">
          <SendOutlined />
          <span class="logo-text" v-if="title">{{ t(title) }}</span>
        </router-link>
      </a-col>
      <a-col>
        <a-row type="flex" justify="space-between" align="middle">
          <div class="header__navigation">
            <!-- Navigation links -->
            <router-link :to="{ name: 'Home' }" class="nav-item">
              <span>{{ t("Home") }}</span>
            </router-link>
            <router-link :to="{ name: 'Contact' }" class="nav-item">
              <span>{{ t("Contact") }}</span>
            </router-link>
          </div>
          <!-- User menu -->
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
          <!-- Language picker -->
          <a-select v-model:value="$i18n.locale" class="header__language-picker">
            <a-select-option value="en">EN</a-select-option>
            <a-select-option value="tr">TR</a-select-option>
          </a-select>
          <!-- Login area -->
          <LoginModal v-if="!user" />
        </a-row>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import { SendOutlined, DownOutlined, CloseOutlined } from "@ant-design/icons-vue";
import LoginModal from "@/components/LoginModal.vue";

export default defineComponent({
  name: "Header",
  components: {
    LoginModal,
    SendOutlined,
    DownOutlined,
    CloseOutlined,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const loginModalVisible = ref(false);
    const { t } = useI18n({ useScope: "global" });

    const handleOnCloseLoginModal = () => {
      loginModalVisible.value = false;
    };

    const logout = () => {
      store.dispatch("logout");
    };

    return {
      t,
      loginModalVisible,
      logout,
      user: computed(() => store.state.user),
      title: computed(() => route.meta.title),
      handleOnCloseLoginModal,
    };
  },
});
</script>

<style lang="scss">
.header {
  height: auto !important;
  &__logo {
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    .logo-text {
      margin-left: 15px;
    }
  }
  &__navigation {
    .nav-item {
      color: #fff;
      margin-right: 20px;
      &:hover {
        color: gray;
      }
    }
  }
}
</style>
