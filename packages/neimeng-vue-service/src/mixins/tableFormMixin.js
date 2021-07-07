export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    computeCusTableHeight() {
      return (additional = 0) => {
        let h = Number(
          window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight
        );
        return h - 300;
      };
    },
  },

  beforeRouteLeave(to, from, next) {
    const { name } = from;
    const key = `${name.toUpperCase()}_SEARCH_MODEL`;
    if (to.meta && to.meta.mode && ['list', 'home'].includes(to.meta.mode)) {
      sessionStorage.removeItem(key);
    } else {
      const { page, rows, ...model } = this.searchForm;
      sessionStorage.setItem(key, JSON.stringify(model));
    }
    next();
  },
  methods: {
    handleSearchModel() {
      const name = this.$route.name;
      const key = `${name.toUpperCase()}_SEARCH_MODEL`;
      let model = sessionStorage.getItem(key);
      if (model) {
        model = JSON.parse(model);
        Object.assign(this.searchForm, model);
      }
    },
  },
};
