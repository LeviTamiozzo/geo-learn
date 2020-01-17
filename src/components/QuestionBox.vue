<template>
  <div>
    <v-content>
      <v-container>
        <v-col cols="lg-4 sm-12">
          <v-select :items="regions" label="Region" v-model="region" @change="getCountries()"></v-select>
        </v-col>
        <div v-if="randomCountry.numericCode">
          Capital of
          <span>
            <b>{{ randomCountry.name }}</b>
          </span>?
        </div>

        <v-item-group>
          <v-container>
            <v-row>
              <v-col
                v-for="country in shuffledCountries"
                :key="country.numericCode"
                cols="12"
                md="3"
              >
                <v-item v-slot:default="{ active, toggle }">
                  <v-card 
                    class="d-flex align-center justify-center"                   
                    height="75"     
                    dark               
                    @click="selectCountry(country.numericCode); toggle();"
                  >
                  <p class="text-center p-15px">{{ country.name }}</p>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>

        <div>
          <v-btn
            color="primary"
            class="mr-5"
            @click="submitAnswer"
            :disabled="answered || selectedCountry == null"
          >Submit</v-btn>
          <v-btn color="indigo" @click="getCountries()" :disabled="!answered">Next</v-btn>
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "questionBox",
  data() {
    return {
      numberOfCountries: 6,
      region: "",
      shuffledCountries: [],
      randomCountry: {},
      selectedCountry: null,
      answered: false
    };
  },
  mounted() {
    this.$store.dispatch("getCountries");
  },
  computed: {
    ...mapGetters({
      countries: "getCountriesFromRegion",
      regions: "getRegions"
    })
  },
  methods: {
    getCountries() {
      this.selectedCountry = null;
      this.answered = false;
      this.shuffledCountries = _.shuffle(this.countries(this.region)).splice(0, this.numberOfCountries);
      let rand = Math.floor(Math.random() * this.numberOfCountries);
      this.randomCountry = this.shuffledCountries[rand];
    },
    selectCountry(numericCode) {
      this.selectedCountry = numericCode;
    },
    answerClass(numericCode) {
      let answerClass = "";

      if (this.selectedCountry === numericCode && !this.answered) {
        answerClass = "selected-country no-pointer-events";
      } else if (
        this.answered &&
        numericCode === this.randomCountry.numericCode
      ) {
        answerClass = "correct-answer no-pointer-events";
      } else if (
        this.answered &&
        numericCode !== this.randomCountry.numericCode &&
        numericCode === this.selectedCountry
      ) {
        answerClass = "wrong-answer no-pointer-events";
      }

      return answerClass;
    },
    submitAnswer() {
      this.answered = true;
      console.log(this.tableDisabled);
    }
  }
};
</script>

<style lang="css" scoped>
tbody tr {
  cursor: pointer;
}

.selected-country {
  background-color: lightblue;
}

.correct-answer {
  background-color: lightgreen;
}

.wrong-answer {
  background-color: lightpink;
}

.answer {
  
}
</style>