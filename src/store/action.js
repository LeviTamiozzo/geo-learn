import Axios from "axios";

export default {
    getCountries({ commit }) {
        Axios
            .get("https://restcountries.eu/rest/v2/all")            
            .then(response => {
                let countries = response.data
                commit("SET_COUNTRIES", countries)
            });
    }
}