import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import tr from "@/locales/tr.json";

const messages = {
  en,
  tr,
};

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "tr", // set locale
  fallbackLocale: "tr", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

export default i18n;
