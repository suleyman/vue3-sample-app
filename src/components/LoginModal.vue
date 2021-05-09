<template>
  <div>
    <a-button type="primary" @click="visible = true">
      {{ t("Login") }}
    </a-button>
    <a-modal :destroyOnClose="true" v-model:visible="visible" :title="t('Login')" @ok="onClickSubmit">
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" layout="vertical">
        <a-form-item ref="name" :label="t('formFields.name')" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item ref="name" :label="t('formFields.email')" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item ref="name" :label="t('formFields.password')" name="password">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="back" @click="visible = false">
          {{ t("Close") }}
        </a-button>
        <a-button type="primary" :loading="loading" @click="onClickSubmit">
          {{ t("Login") }}
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, UnwrapRef } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { ILogin } from "@/interfaces/login";
import memberService from "@/api/services/member";

export default defineComponent({
  name: "LoginModal",
  setup() {
    const store = useStore();
    const { t } = useI18n({ useScope: "global" });
    const formRef = ref();
    const loading = ref(false);
    const visible = ref(false);
    const formState: UnwrapRef<ILogin> = reactive({
      name: "",
      email: "",
      password: "",
    });
    const rules = {
      name: [
        {
          required: true,
          message: t("formValidationErrors.requireName"),
        },
      ],
    };

    const onClickSubmit = () => {
      formRef.value.clearValidate();
      formRef.value.validate().then(() => {
        loading.value = true;
        memberService.login(formState).finally(() => {
          // for show loading button
          setTimeout(() => {
            store.dispatch("login", formState);
            loading.value = false;
            visible.value = false;
          }, 500);
        });
      });
    };

    return {
      t,
      formRef,
      labelCol: { span: 12 },
      wrapperCol: { span: 24 },
      formState,
      loading,
      visible,
      rules,
      onClickSubmit,
    };
  },
});
</script>
