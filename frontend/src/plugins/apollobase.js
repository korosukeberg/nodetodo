import { ApolloClient } from 'apollo-client'
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache} from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: 'https://tnasdnjrevgfxfwvxqrof6mauu.appsync-api.ap-northeast-1.amazonaws.com/graphql'
})

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export default apolloClient;
