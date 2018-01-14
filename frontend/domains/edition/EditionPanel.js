import {
  ENTITY_EDIT,
  EDITION_SAVE,
  EDITION_STOP,
} from '~/domains/barrel.state';

import {
  EDITION_TYPES,
} from '~/domains/barrel.types';
import { cloneDeep } from 'lodash/fp';
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
    this.model = this.value ? cloneDeep(this.value) : {};
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
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch(EDITION_SAVE(this.type), this.getProperModel());
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
