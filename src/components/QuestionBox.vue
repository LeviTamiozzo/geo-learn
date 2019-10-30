<template>
  <div>
    <v-content>
      <v-container>
        <v-select :items="regions" label="Region" v-model="region" @change="getCountries()"></v-select>
        <div>Capital of <span><b>{{ randomCountry.name }}</b></span>?</div>
        <v-simple-table height="300" disabled>
          <thead>
            <tr>
              <th>Countries</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="country in shuffledCountries" :key="country.numericCode" @click.prevent="selectCountry(country.numericCode)" :class="answerClass(country.numericCode)">
              <td :disabled="answered">
                {{ country.capital }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <div>
          <v-btn color="primary" class="mr-5" @click="submitAnswer" :disabled="answered || selectedCountry == null">Submit</v-btn>
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
      numberOfCountries: 4,
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
      this.shuffledCountries = _.shuffle(this.countries(this.region)).splice(
        0,
        this.numberOfCountries
      );
      let rand = Math.floor(Math.random() * this.numberOfCountries);
      this.randomCountry = this.shuffledCountries[rand];
    },
    selectCountry(numericCode) {
      this.selectedCountry = numericCode;
    },
    answerClass(numericCode) {
      let answerClass = "";

      if (this.selectedCountry === numericCode && !this.answered) {
        answerClass = "selectedCountry";
      } else if (
        this.answered &&
        numericCode === this.randomCountry.numericCode
      ) {
        answerClass = "correctAnswer";
      } else if (
        this.answered &&
        numericCode !== this.randomCountry.numericCode &&
        numericCode === this.selectedCountry
      ) {
        answerClass = "wrongAnswer";
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

.selectedCountry {
  background-color: lightblue;
}
.correctAnswer {
  background-color: lightgreen;
}
.wrongAnswer {
  background-color: lightpink;
}
</style>