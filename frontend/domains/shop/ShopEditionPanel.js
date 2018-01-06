import { mapState } from 'vuex';
import { assign, defaultsDeep } from 'lodash/fp';
import { EDITION_TYPES, ENTITY_EDIT, EDITION_SAVE, EDITION_STOP } from '~/domains/shop/state.shop';

export default {
  data() {
    return {
      isValid: true,
      model: null,
      message: null,
    };
  },
  computed: {
    ...mapState({
      type({ shop }) { return shop.edition.entityType; },
      value({ shop }) { return shop.edition.value; },
      isTypeCreate: ({ shop }) => shop.edition.editionType === EDITION_TYPES.create,
      isTypeEdit: ({ shop }) => shop.edition.editionType === EDITION_TYPES.edit,
    }),
  },
  beforeMount() {
    this.model = this.value || {};
  },
  methods: {
    getCleanModel() {
      const refs = assign({}, this.model.refs);
      let m = {};
      if (refs) {
        Object.keys(refs)
          .filter(key => !Array.isArray(refs[key]))
          .forEach(key => refs[key] = refs[key] ? [refs[key]] : []);

        m = defaultsDeep({}, this.model);
        m.refs = refs;
      } else {
        m = this.model;
      }

      return m;
    },
    onFormControlChange() {
      if (this.isTypeEdit) {
        this.$store.commit(ENTITY_EDIT(this.type), this.getCleanModel());
      }
    },
    async handleSubmit() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch(EDITION_SAVE(this.type), this.getCleanModel());
          this.$store.commit(EDITION_STOP);
        } catch (err) {
          this.message = err.message || 'произошла ошибка :(';
        }
      }
    },
    handleAbort() {
      this.abort();
    },
    abort() {
      this.$store.commit(EDITION_STOP);
    },
  },
};
