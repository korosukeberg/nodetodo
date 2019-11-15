import Vue from 'vue'
import VueApollo from 'vue-apollo'
import apolloClient from "./apollobase";

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defalutClient: apolloClient
})

export default apolloProvider;
