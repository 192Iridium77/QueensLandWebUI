<template lang="html">
  <div>
    <v-container class="content">
      <!-- <div v-for="suburb in suburbs">
        {{suburb.postcode}} {{suburb.district}}
      </div> -->
      <div v-if="suburb">
        <h1>{{suburb.district}}</h1>
        Crashes
        <no-ssr>
          <carousel :per-page="3" :navigate-to="someLocalProperty" :mouse-drag="true">
            <slide v-for="crash in crashes" :key="crash.id">

              <v-card color="#385F73" dark class="crash-card">
                <v-list-item three-line>
                   <v-list-item-content class="align-self-start">
                     <v-list-item-title class="headline mb-2" >
                     {{crash.Crash_Year}}
                     {{crash.Crash_Month}}
                     {{crash.Crash_Day_Of_Week}}
                   </v-list-item-title>

                     <v-list-item-subtitle v-text="crash.Crash_Nature"></v-list-item-subtitle>
                   </v-list-item-content>

                   <v-list-item-avatar size="125" tile >
                     <v-img :src="getImage(crash.Crash_Nature)"></v-img>
                   </v-list-item-avatar>
                 </v-list-item>

                <!-- <v-card-actions>
                  <v-btn text>Listen Now</v-btn>
                </v-card-actions> -->
              </v-card>
            </slide>
          </carousel>
        </no-ssr>
      </div>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="290">
            <!-- <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template> -->
            <v-card class="dialog-card">
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
                <v-btn color="green darken-1" text @click="submitSuburb">Ok</v-btn>
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
import { includes } from 'lodash';

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
    Slide
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
    getImage(nature) {
      if (includes(nature, "parked")) {
        return "~/assets/images/parkedcarcrash";
      }
    }
  },
  computed: {
    ...mapState("explore", ["suburbs", "crashes"]),
  }
}
</script>

<style lang="scss" scoped>
.dialog-card {
    padding: 24px;
}
.crash-card {
    margin: 24px;
}
.explore {
    display: flex;
    flex-direction: row;
    .content {
        flex: 1;
    }
}
</style>
