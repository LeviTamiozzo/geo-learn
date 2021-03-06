export default {
  getCountriesByRegion: state => region => {
    return state.countries.filter(c => c.region === region && c.capital !== '');
  },
  getRegions: state => {
    return state.regions;
  }
};
