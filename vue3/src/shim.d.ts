declare module "*.vue" {
  import type { DefineComponent, VueElement } from "vue";
  const vueComponent: DefineComponent<{}, {}, any>;
  export default vueComponent;
}
