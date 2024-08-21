import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      showNotification: false,
      showDialog: false,
      colorNotification: 'white',
      textNotification: '',
      statusNotification: 'success',
      titleNotification: '',
    };
  },
  actions: {
    setShowNotification(param: any) {
      setTimeout(() => {
        if (!param?.title) {
          this.showNotification = false;
        }
      }, 3000);
      this.statusNotification = param?.status;
      this.textNotification = param?.msg;
      this.titleNotification = param?.title;
      if (param?.title) {
        this.showDialog = param?.display;
      } else {
        this.showNotification = param?.display;
      }
    },
    hideNotification() {
      this.showNotification = false;
    },
    hideDialog() {
      this.showDialog = false;
    },
  },
});
