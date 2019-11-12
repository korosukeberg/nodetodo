<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/N64.png')"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/korosukeberg/nodetodo" target="_blank" text>
        <span class="mr-2">See Source Code in GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-text-field v-model="newToDoTitle" placeholder="What are you up to?" solo width="300"></v-text-field>
      <v-card>
        <v-label></v-label>
        <v-checkbox></v-checkbox>
        <v-btn text icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>

      <v-container id="container">
        <todo-text-input></todo-text-input>
        <todo-subactions @loadToDos="load"></todo-subactions>
        <todo-list></todo-list>

        <v-snackbar v-model="this.snackbar.show" :color="this.snackbar.color" :bottom="true" :right="true" :timeout=6000>
          {{ this.snackbar.text }}
          <v-btn dark text @click="close">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from './plugins/axiosbase';
import TodoTextInput from "./components/todo-text-input"
import TodoList from "./components/todo-list"
import TodoSubactions from "./components/todo-subactions"
import {mapMutations, mapState} from "vuex";

export default {
  name: 'App',
  components: {
    TodoTextInput,
    TodoSubactions,
    TodoList
  },
  computed: {
    ...mapState(["items", "snackbar"])
  },
  data: () => ({
    newToDoTitle: ""
  }),
  mounted: function () {
    this.load();
  },
  methods: {
    ...mapMutations(["clearItems", "showNoTodoSnackbar", "showErrorSnackbar", "closeSnackbar"]),
    load: function () {
      axios.get("/todo").then(response => {
        if (!response.data.length) {
          this.showNoTodoSnackbar();
          return;
        }
        for (let i = 0; i < response.data.length; i++) {
          this.items.push(response.data[i])
        }
      })
    },
    close: function () {
      this.closeSnackbar();
    }
  }
};
</script>
<style lang="scss">
  #container {
    max-width: 550px;
  }

  .done {
    text-decoration: line-through;
  }

  .v-list-item:hover {
    .clear-btn {
      display: block !important;
    }
  }
</style>
