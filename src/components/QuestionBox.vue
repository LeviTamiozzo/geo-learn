<template>
  <div>
    <v-content>
      <v-container>
        <v-select :items="regions" label="Regions" v-model="region"></v-select>
        <v-btn color="primary" @click="getCountries">Get Countries</v-btn>
        <v-simple-table>
          <thead>
            <tr>
              <th>Countries</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="country in countries" :key="country.numericCode">
              <td>
                {{ country.name }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "questionBox",
  data() {
    return {
      region: ""
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
  watch: {
    countries: () => {
      this.countries = this.countries
    }
  },
  methods: {
    getCountries() {
      this.countries = this.countries(this.region)
    }
  }
};
</script>