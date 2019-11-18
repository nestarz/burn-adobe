import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js";
import "https://unpkg.com/@vue/composition-api/dist/vue-composition-api.umd.js";
Vue.use(vueCompositionApi.default);

const { ref, watch, createElement, reactive, onMounted } = vueCompositionApi;
export { ref, watch, createElement, reactive, onMounted };
export default Vue;
