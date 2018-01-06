import {
  ENTITY_EDIT,
  EDITION_SAVE,
  EDITION_STOP,
} from '~/domains/barrel.state';

import {
  EDITION_TYPES,
} from '~/domains/barrel.types';

import { mapState } from 'vuex';
import { assign, defaultsDeep } from 'lodash/fp';


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
      type({ edition }) { return edition.entityType; },
      value({ edition }) { return edition.value; },
      isTypeCreate: ({ edition }) => edition.editionType === EDITION_TYPES.create,
      isTypeEdit: ({ edition }) => edition.editionType === EDITION_TYPES.edit,
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
      this.$store.dispatch(EDITION_STOP);
    },
  },
};
