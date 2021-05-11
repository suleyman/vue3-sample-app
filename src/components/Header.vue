<template>
  <a-layout-header class="header">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col :xs="{ span: 20 }" :lg="{ span: 12 }">
        <!-- Logo -->
        <router-link :to="{ name: 'Home' }" class="header__logo">
          <SendOutlined />
          <span class="logo-text">{{ t("Sample") }}</span>
        </router-link>
      </a-col>
      <a-col :xs="{ span: 0 }" :lg="{ span: 12 }">
        <a-row type="flex" justify="end" align="middle">
          <a-col>
            <div class="header__navigation">
              <!-- Navigation links -->
              <router-link :to="{ name: 'Home' }" class="nav-item">
                <span>{{ t("Home") }}</span>
              </router-link>
              <router-link :to="{ name: 'Contact' }" class="nav-item">
                <span>{{ t("Contact") }}</span>
              </router-link>
            </div>
          </a-col>

          <!-- User menu -->
          <UserDropdown v-if="user" />
          <!-- Language picker -->
          <LanguagePicker />
          <!-- Login area -->
          <LoginModal v-if="!user" />
        </a-row>
      </a-col>
      <MobileMenu />
    </a-row>
  </a-layout-header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { SendOutlined } from "@ant-design/icons-vue";
import LoginModal from "@/components/LoginModal.vue";
import MobileMenu from "@/components/MobileMenu.vue";
import LanguagePicker from "@/components/LanguagePicker.vue";
import UserDropdown from "@/components/UserDropdown.vue";

export default defineComponent({
  name: "Header",
  components: {
    UserDropdown,
    LanguagePicker,
    MobileMenu,
    LoginModal,
    SendOutlined,
  },
  setup() {
    const store = useStore();
    const loginModalVisible = ref(false);
    const { t } = useI18n({ useScope: "global" });

    const user = computed(() => store.state.user);

    const handleOnCloseLoginModal = () => {
      loginModalVisible.value = false;
    };

    return {
      t,
      loginModalVisible,
      user,
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
    display: flex;
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
