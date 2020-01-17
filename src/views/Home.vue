<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row class="justify-center">
          <v-col cols="lg-4 sm-10">
            <v-select :items="regions" @change="setCountriesData()" v-model="region"></v-select>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="lg-8 sm-10">
            <question-box :title="capitalTitle" :data="answerData">
              <template slot="title" v-if="region != ''">
                What's the capital of
                <span>
                  <b style="user-select: none">{{ randomCountry.name }}</b>
                </span>?
              </template>
            </question-box>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import questionBox from "../components/QuestionBox";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  components: {
    questionBox
  },
  data() {
    return {
      numberOfCountries: 4,
      region: "",
      answerData: [],
      randomCountry: {},
      capitalTitle: `What's the capital of `
    };
  },

  mounted() {
    this.$store.dispatch("getCountries");
  },

  computed: {
    ...mapGetters({
      countries: "getCountriesByRegion",
      regions: "getRegions"
    })
  },

  methods: {
    setCountriesData() {
      let shuffledCountries = _.shuffle(this.countries(this.region)).splice(
        0,
        this.numberOfCountries
      );
      let rand = Math.floor(Math.random() * this.numberOfCountries);
      this.randomCountry = shuffledCountries[rand];

      this.answerData = shuffledCountries.map(c => ({
        name: c.capital,
        id: c.numericCode,
        isCorrectAnswer: c.capital === this.randomCountry.capital
      }));
    }
  }
};
</script>

<style lang="css" scoped>
</style>
