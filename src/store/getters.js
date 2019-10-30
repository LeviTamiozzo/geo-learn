export default {
    getCountriesFromRegion: (state) => (region) => {
        return state.countries.filter(c => c.region === region)
    },
    getRegions: (state) => {
        return state.regions
    }
}