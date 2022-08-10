<template>
  <transition v-bind="transitionAttrs">
    <component
      :is="dialogRef.dialog"
      v-if="dialogRef && dialogRef.wrapper === name"
      v-bind="dialogRef.props"
      ref="dialogInstance"
    ></component>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { dialogRef } from './dialogRef';
export default defineComponent({
  name: 'DialogWrapper',
  props: {
    name: {
      type: String,
      default: 'default',
    },
    transitionAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const dialogInstance = ref();

    watch(dialogInstance, () => {
      if (dialogRef.value) {
        dialogRef.value.comp = dialogInstance.value;
      }
    });


    return {
      dialogRef,
      dialogInstance,
    };
  },
});
</script>

<style lang="scss" scoped></style>
