import Vuex from "vuex";
import loadModules from "../loadModules";

import explore from "~/components/Explore/store";

const storeDef = {
  state: {
    menuTab: ""
  },
  modules: {
    explore
  }
};
// storeDef.actions = loadModules(require.context('./actions', true, /\.js$/));
storeDef.mutations = loadModules(require.context("./mutations", true, /\.js$/));

const store = new Vuex.Store(storeDef);

export default () => store;
