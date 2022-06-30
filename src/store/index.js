import { defineStore } from 'pinia';
import { arrReduce } from '@/utils';

const URLS = [
  'https://swapi.dev/api/people/',
  'https://swapi.dev/api/planets/',
  'https://swapi.dev/api/films/',
  'https://swapi.dev/api/species/',
];

export const useStore = defineStore('main', {
  state: () => ({
    people: JSON.parse(localStorage.getItem('people')) || [],
    options: JSON.parse(localStorage.getItem('options')) || {},
    optionsSelected: {
      filmsSelected: [],
      planetsSelected: [],
      speciesSelected: [],
    },
  }),

  actions: {
    async getData() {
      if (this.people.length > 0) {
        return;
      }

      const checkStatus = (res) => (
        res.ok ? Promise.resolve(res) : Promise.reject(new Error(res.statusText))
      );
      const parseJSON = (response) => response.json();

      // Get a single endpoint.
      const getPage = (url) => fetch(url)
        .then(checkStatus)
        .then(parseJSON)
        .catch((error) => console.log('There was a problem!', error));

      // Keep getting the pages until the next key is null.
      const getAllPages = async (url, collection = []) => {
        const { results, next } = await getPage(url);
        const arr = [...collection, ...results];

        if (next !== null) {
          return getAllPages(next, arr);
        }

        return arr;
      };

      // Select data out of all the pages gotten.
      const [people, planets, films, species] = await Promise.all(
        URLS.map((url) => getAllPages(url)),
      );

      this.people = people;
      this.options = {
        films,
        planets,
        species,
      };
      localStorage.setItem('people', JSON.stringify(this.people));
      localStorage.setItem('options', JSON.stringify(this.options));
    },
  },

  getters: {
    optionFilter(state) {
      const { films, planets, species } = state.options;
      const { filmsSelected, planetsSelected, speciesSelected } = state.optionsSelected;
      const filmsArr = [];
      let planetsArr = [];
      let speciesArr = [];

      Object.keys(state.optionsSelected).forEach((el) => {
        if (state.optionsSelected[el].length === 0) {
          return;
        }

        if (el === 'filmsSelected') {
          const planetsList = [];
          const speciesList = [];

          state.optionsSelected[el].forEach((i) => {
            planetsList.push(...i.planets);
            speciesList.push(...i.species);
          });

          planetsArr = [...arrReduce(planetsList, planets), ...planetsSelected];
          speciesArr = [...arrReduce(speciesList, species), ...speciesSelected];
        }

        if (el !== 'filmsSelected') {
          const list = [];

          state.optionsSelected[el].forEach((i) => {
            list.push(...i.films);
          });

          const res = arrReduce(list, films);

          filmsArr.push(...filmsArr, ...res, ...filmsSelected);
        }
      });

      return {
        films: filmsArr.length > 0 ? [...new Set(filmsArr)] : films,
        planets: planetsArr.length > 0 ? [...new Set(planetsArr)] : planets,
        species: speciesArr.length > 0 ? [...new Set(speciesArr)] : species,
      };
    },

    peopleFilter(state) {
      const list = [];
      let peopleArr = null;

      Object.values(state.optionsSelected).forEach((el) => {
        el.forEach((i) => {
          list.push(...i.characters || []);
          list.push(...i.residents || []);
          list.push(...i.people || []);
        });
      });

      if (list.length > 0) {
        peopleArr = arrReduce([...new Set(list)], state.people);
      }

      return peopleArr || state.people;
    },
  },
});
