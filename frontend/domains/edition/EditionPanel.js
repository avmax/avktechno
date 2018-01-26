import {
  ENTITY_EDIT,
  EDITION_SAVE,
  EDITION_STOP,
} from '~/domains/barrel.state';

import {
  EDITION_TYPES,
} from '~/domains/barrel.types';
import { cloneDeep, isObject } from 'lodash/fp';
import { mapState } from 'vuex';


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
  created() {
    this.model = cloneDeep(this.value);
  },
  methods: {
    getProperModel() {
      return this.model;
    },
    onFormControlChange() {
      if (this.isTypeEdit) {
        this.$store.commit(ENTITY_EDIT(this.type), this.getProperModel());
      }
    },
    async handleSubmit() {
      const isFile = o => o && o.name && o.size && o.type;
      if (this.$refs.form.validate()) {
        try {
          const model = this.getProperModel();
          const data = Object.keys(model).reduce((acc, key) => {
            let val = model[key];
            val = !isFile(val) && isObject(val) ? JSON.stringify(val) : val;
            acc.append(key, val);
            return acc;
          }, new FormData());

          await this.$store.dispatch(EDITION_SAVE(this.type), data);
          this.$store.commit(EDITION_STOP);
        } catch (err) {
          this.message = err.message || 'произошла ошибка :(';
        }
      }
    },
    handleAbort() {
      this.$store.dispatch(EDITION_STOP);
    },
  },
};
