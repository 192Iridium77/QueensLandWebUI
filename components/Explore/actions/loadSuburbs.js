export default function({ state }) {
  return this.$axios.$get("/query/loadSuburbs").then(suburbs => {
    console.log('SUBURBS', suburbs)
    state.suburbs = suburbs;
  });
}