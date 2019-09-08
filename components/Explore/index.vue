<template lang="html">
  <div color="#ECEFF1">
    <v-container>
      <!-- <div v-for="suburb in suburbs">
        {{suburb.postcode}} {{suburb.district}}
      </div> -->
      <div v-if="suburb" class="content">
        <v-app-bar
          color="#01579B"
          class="app-bar"
          dark >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>{{suburb.district}}</v-toolbar-title>

          <div class="flex-grow-1"></div>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-menu left bottom >
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <!-- <v-list>
              <v-list-item
                v-for="n in 5"
                :key="n"
                @click="() => {}"
              >
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list> -->
          </v-menu>
        </v-app-bar>
        <!-- <h1></h1>
        Crashes({) -->
        <no-ssr>
          <carousel :per-page="5" :navigate-to="someLocalProperty" :mouse-drag="true" :paginationEnabled="false" class="carousel">
            <slide v-for="crash in crashes" :key="crash.id">
              <v-card darken-4 dark class="crash-card mx-auto" max-width="375" color="#0277BD">
                <v-img height="300" v-if="getCrashType(crash.Crash_Nature) === 'parked'" src="/images/parkedcarcrash.jpg"/>
                <v-img height="300" v-if="getCrashType(crash.Crash_Nature) === 'pedestrian'" src="/images/pedestriancarcrash.jpg"/>
                <v-img height="300" v-if="getCrashType(crash.Crash_Nature) === 'rear'" src="/images/rearendcollision.jpg"/>
                <v-card-title>
                  <div>
                    {{crash.Crash_Year}}
                    {{crash.Crash_Month}}
                    {{crash.Crash_Day_Of_Week}}
                  </div>
                </v-card-title>
                <div class="grey--text subtitle-1">
                  Nature of Incident: {{crash.Crash_Nature}}
                </div>
                <div class="grey--text subtitle-1">
                  Description: {{crash.Crash_DCA_Group_Description}}
                </div>
                <div class="grey--text subtitle-1">
                  Severity: {{crash.Crash_Severity}}
                </div>
                <v-card-actions>
                  <v-btn text>Comment</v-btn>
                </v-card-actions>
              </v-card>
            </slide>
          </carousel>
        </no-ssr>
        <div class="statistics">
          Last Year's Crash Total: <span class="count">{{crashesCount}}</span>
        </div>
        <chart v-if="crashes" :data="crashes"></chart>
      </div>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="290">
            <!-- <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template> -->
            <v-card class="dialog-card" color="white">
              <v-img src="/images/EMERGENCE_thumbnail.png" class="logo"></v-img>
              <v-card-title class="headline">Select a location</v-card-title>

              <v-autocomplete
                @input="selectSuburb"
                :items="suburbs"
                :filter="customFilter"
                return-object
                item-text="postcode"
                label="Postcode">
              <template v-slot:selection="data">
                {{data.item.postcode}} {{data.item.district}}
              </template>
              <template v-slot:item="data">
                {{data.item.postcode}} {{data.item.district}}
              </template>
            </v-autocomplete>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="darken-1" text @click="submitSuburb">Ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Carousel, Slide } from 'vue-carousel';
import { includes, toLower } from 'lodash';
import Chart from "./Chart";

export default {
  name: "Explore",
  data() {
    return {
      dialog: true,
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      postcode: undefined
    }
  },
  components: {
    Carousel,
    Slide,
    Chart
  },
  mounted() {
    // return this.loadSuburbs();
  },
  methods: {
    ...mapActions("explore", ["loadCrimes"]),
    customFilter(item, queryText, itemText) {
      const postcode = item.postcode.toLowerCase()
      const district = item.district.toLowerCase()
      const searchText = queryText.toLowerCase()

      return postcode.indexOf(searchText) > -1 ||
        district.indexOf(searchText) > -1
    },
    selectSuburb(sub) {
      this.suburb = sub;
    },
    submitSuburb() {
      if (!this.suburb) return;
      this.dialog = false;
      return this.loadCrimes(this.suburb.postcode);
    },
    getCrashType(nature) {
      if (includes(toLower(nature), "parked")) {
        return "parked";
      }
      if (includes(toLower(nature), "pedestrian")) {
        return "pedestrian";
      }
      if (includes(toLower(nature), "rear")) {
        return "rear";
      }
      return "parked";
    }
  },
  computed: {
    ...mapState("explore", ["suburbs", "crashes", "crashesCount"]),
  }
}
</script>

<style lang="scss" scoped>
.carousel {
    margin-top: 24px;
}
.statistics {
    padding-top: 24px;
    .count {
        color: #1565C0;
    }
}

.dialog-card {
    padding: 24px;
}
.crash-card {
    margin: 24px;
    .subtitle-1 {
        padding: 4px 16px;
    }
}
.explore {
    display: flex;
    flex-direction: row;
    .content {
        flex: 1;
    }
}

.app-bar {
    display: flex;
    justify-content: space-between;
}
</style>
