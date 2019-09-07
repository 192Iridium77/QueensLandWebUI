<template lang="html">
  <div>
    <v-container class="content">
      <!-- <div v-for="suburb in suburbs">
        {{suburb.postcode}} {{suburb.district}}
      </div> -->
      {{crimes}}
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="290">
            <!-- <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template> -->
            <v-card class="card">
              <v-card-title class="headline">Select a location</v-card-title>

              <v-autocomplete
              @input="selectSuburb"
                :items="suburbs"
                :filter="customFilter"
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
    selectSuburb(postcode) {
      this.postcode = postcode;
    },
    submitSuburb() {
      if (!this.postcode) return;
      this.dialog = false;
      return this.loadCrimes(this.postcode);
    }
  },
  computed: {
    ...mapState("explore", ["suburbs", "crimes"]),
  }
}
</script>

<style lang="scss" scoped>
.card {
    padding: 24px;
}
.explore {
    display: flex;
    flex-direction: row;
    .content {
        flex: 1;
    }
}
</style>
