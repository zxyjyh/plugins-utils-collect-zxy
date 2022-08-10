//@ts-nocheck
import { shallowRef } from 'vue';

export const dialogRef = shallowRef();

export const openDialog = (dialog, prop, wrapper = 'default') => {
  return new Promise((resolve) => {
    dialogRef.value = {
      dialog,
      prop,
      wrapper,
      resolve,
    };
  });
};

export const closeDialog = (data) => {
  dialogRef.value.resolve(data);
  dialogRef.value = null;
};

export const pDialog = {
  install(app) {
    app.config.globalProperties.$close = (comp, value) => {
      closeDialog(value);
    };
  },
};

//流程
//怎么去定义一段流程
//如何定义开始
//如何定义结束
//定义dialog展示是开始
//定义dialog关闭是结束
