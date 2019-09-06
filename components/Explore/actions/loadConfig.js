import { reduce } from "lodash";

export default function({ state }, id) {
  return this.$axios.$get("/explore/query/config").then(config => {
    state.config = config || { id: undefined }
  });
}