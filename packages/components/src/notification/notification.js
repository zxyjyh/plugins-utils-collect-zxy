import { createVnode, ref } from 'vue';

class Manager {
  constructor(config) {
    this.managerIds = new Set();
    this.managers = ref([]);
    this.position = config.position;
    this.count = 0;

    this.remove.bind(this);
    this.clear.bind(this);
    this.destroy.bind(this);
  }

  init() {
    return import('./notWrapper')
      .then((comp) => {
        return createVnode(comp.default, this.createVnodeOpt());
      })
      .then((vm) => {
        if (appContext) {
          vm.appContext = null;
        }
        return vm;
      })
      .then((vm) => {
        render(vm, this.container);
        document.body.appendChild(this.container);
      });
  }

  add(config) {
    this.count++;

    const id = config.id ?? this.count; //兼容更新还是新增

    if (this.managerIds.has(id)) {
      return this.update(id, config);
    }

    const not = reactive({ id, ...config });

    this.managers.value.push(not); //管理组件，渲染用
    this.managerIds.add(id); //管理记录id
    //思考下为什么一个需要响应式，另一个不需要响应式？

    return () => {
      this.remove(id);
    };
  }

  update(id, config) {
    for (const manager of this.managers.value) {
      if (manager.id === id) {
        Object.assign(manager, {
          ...config,
          id,
        });
        break;
      }
    }

    return () => {
      this.remove(id);
    };
  }

  remove(id) {
    const index = this.managers.value.findIndex((el) => el.id === id);

    if (index > -1) {
      this.managers.value.splice(index, 1);
      this.managerIds.delete(id);
    }
  }

  clear() {
    return this.managers.value.splice(0);
  }

  destroy() {
    if (this.managers.value.length === 0 && this.container) {
      //相当于是内部没有组件维护时才会消掉整个列表组件
      render(null, this.container);
      document.body.removeChild(this.container);
      this.container = null;
      notInstance[this.position] = null; //为什么是undefined 不是null
    }
  }

  createVnodeOpt() {
    return {
      not: () => this.managers.value,
      position: () => this.position,
      onClose: () => this.remove,
      onAfterClose: () => this.destroy,
    };
  }
}

const errorMap = ['info', 'success', 'warning', 'error'];

const notInstance = {
  top: {},
  left: {},
  right: {},
  bottom: {},
};

const not = errorMap.reduce((acc, item) => {
  acc[item] = (config, appContext) => {
    const { position = 'top' } = config;

    if (!notInstance[position]) {
      notInstance[position] = new Manager(config, appContext);
    }

    return notInstance[position].init();
  };
}, {});

not.clear = (position) => {
  if (position) {
    return notInstance[position].clear();
  }
  Object.values(notInstance).forEach((item) => item.clear());
};

const not = {
  ...not,
  install(app) {
    const _not = {
      clear: not.clear,
    };

    for (const key of errorMap) {
      _not[key] = (config, appContext) => {
        not[key](config, appContext);
      };
    }

    app.config.globalProperties.$not = _not;
  },
};
