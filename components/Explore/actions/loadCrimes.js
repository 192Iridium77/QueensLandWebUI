import { format } from "date-fns";

export default function({ state }, postcode) {
  console.log('POSTCODE', postcode)
  const today = new Date();
  const month = format(today, "MMMM");
  const day = format(today, "EEEE");
  const year = format(today, "yyyy");
  const lastYear = (Number(format(today, "yyyy")) - 2).toString();
  console.log('LASTYEAR', lastYear)

  return this.$axios.$get(
    `https://www.data.qld.gov.au/api/3/action/datastore_search_sql?sql= SELECT * from "e88943c0-5968-4972-a15f-38e120d72ec0"
    WHERE "Loc_Post_Code"='${ postcode }'
    AND "Crash_Year"='${ lastYear }'
    ;`
    // AND "Crash_Month"='${ month }'
    // AND "Crash_Day_Of_Week"='${ day }'
  ).then(({ result }) => {
    return this.$axios.$get(
      `https://www.data.qld.gov.au/api/3/action/datastore_search_sql?sql= SELECT COUNT(*) from "e88943c0-5968-4972-a15f-38e120d72ec0"
      WHERE "Loc_Post_Code"='${ postcode }'
      AND "Crash_Year"='${ lastYear }'
      ;`
    ).then(count => {
      console.log('COUNT', count.result.records[0].count)
      const crashes = result.records;
      state.crashes = crashes;
      state.crashesCount = count.result.records[0].count;
    })
  });
}