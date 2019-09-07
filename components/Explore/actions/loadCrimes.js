import { format } from "date-fns";

export default function({ state }, postcode) {
  const today = new Date();
  const month = format(today, "MMMM");
  const day = format(today, "EEEE");
  const year = format(today, "yyyy");

  return this.$axios.$get(
    `https://www.data.qld.gov.au/api/3/action/datastore_search_sql?sql= SELECT * from "e88943c0-5968-4972-a15f-38e120d72ec0"
    WHERE "Loc_Post_Code"='${ postcode }'
    AND "Crash_Year"='${ year }'
    ;`
    // AND "Crash_Month"='${ month }'
    // AND "Crash_Day_Of_Week"='${ day }'
  ).then(({ result }) => {
    //
    //
    // AND
    const crimes = result.records;
    console.log('CRIMES length', crimes.length)
    state.crimes = crimes;
  });
}