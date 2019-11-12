import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    snackbar: {
      show: false,
      text: "Something went wrong",
      color: "red"
    }
  },
  mutations: {
    clearItems() {
      this.state.items = [];
    },
    showNoTodoSnackbar() {
      this.state.snackbar.text = "Congratulations!  You are all done now.";
      this.state.snackbar.color = "success";
      this.state.snackbar.show = true;
    },
    showErrorSnackbar() {
      this.state.snackbar.text = "Something went wrong.";
      this.state.snackbar.color = "red";
      this.state.snackbar.show = true;
    },
    closeSnackbar() {
      this.state.snackbar.show = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
