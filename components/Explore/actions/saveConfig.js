import { reduce } from "lodash";

export default function({ commit }, { id, categories }) {
  if (!id)
    return this.$axios
      .$post("/explore/commands/createConfig", { categories })
      .then(result => {
        const config = result.ops[0];
        commit("configSaved", config);
      });
  return this.$axios
    .$post("/explore/commands/saveConfig", { id, categories })
    .then(() => {
      commit("configSaved", { id, categories });
    });
}