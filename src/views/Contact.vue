<template>
  <div class="page home-page">
    <h1>{{ t("Contact") }}</h1>
    <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" layout="vertical">
      <a-form-item :label="t('formFields.title')" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item :label="t('formFields.name')" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item :label="t('formFields.email')" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item :label="t('formFields.phone')" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item :label="t('formFields.country')" name="country">
        <a-select
          v-model:value="formState.countryCode"
          show-search
          placeholder="Select your country"
          option-filter-prop="children"
          :filter-option="filterOption"
        >
          <a-select-option :value="country" v-for="country in countryList" :key="country">
            {{ t(`countryNames.${country}`) }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="t('formFields.message')" name="message">
        <a-textarea v-model:value="formState.message" :auto-size="{ minRows: 5, maxRows: 10 }" />
      </a-form-item>
      <a-button type="primary" @click="onClickSubmit" :loading="loading">
        {{ t("formFields.send") }}
      </a-button>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, UnwrapRef, onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { IContact } from "@/interfaces/contact";
import contactService from "@/api/services/contact";

export default defineComponent({
  name: "Contact",
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const formRef = ref();
    const loading = ref(false);
    const store = useStore();
    const formState: UnwrapRef<IContact> = reactive({
      title: "",
      name: "",
      email: "",
      phone: "",
      countryCode: "",
      message: "",
    });
    const rules = {
      email: [
        {
          required: true,
          type: "email",
          message: t("formValidationErrors.requireEmail"),
        },
      ],
      phone: [
        {
          required: true,
          pattern: "^(\\d{10}|\\d{12})$",
          message: t("formValidationErrors.requirePhone"),
        },
      ],
    };
    const countryList = ["TR", "US", "GB", "DE", "SE", "KE", "BR", "ZW"];

    const watchLoginStatus = watch(
      () => store.state.user,
      () => {
        formState.name = store.state.user?.name || "";
        formState.email = store.state.user?.email || "";
      }
    );

    const countryFilter = (input: string, option: any) => {
      return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const onClickSubmit = () => {
      formRef.value.validate().then(() => {
        loading.value = true;
        contactService
          .postContactForm(formState)
          .then((response) => {
            console.log(response);
          })
          .finally(() => {
            loading.value = false;
          });
      });
    };

    onMounted(() => {
      formState.name = store.state.user?.name || "";
      formState.email = store.state.user?.email || "";
    });

    return {
      t,
      formRef,
      rules,
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
      formState,
      loading,
      countryList,
      watchLoginStatus,
      countryFilter,
      onClickSubmit,
    };
  },
});
</script>
