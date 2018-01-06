import { mapState } from 'vuex';
import { isEmpty } from 'lodash/fp';
import {
  EDITION_REMOVE,
  EDITION_EDIT,
} from '~/domains/barrel.state';

export default {
  data() {
    return {
      isReady: false,
    };
  },
  computed: {
    ...mapState({
      isEditionAvailable: ({ user }) => user.isAdmin,
      isEditionEnabled: ({ edition, user }) => user.isAdmin && !edition.isEnabled,
    }),
    isEmpty() { return isEmpty(this.$store.state.shop[this.type]); },
  },
  methods: {
    edit() { this.$store.dispatch(EDITION_EDIT(this.type), this.model.id); },
    remove() { this.$store.dispatch(EDITION_REMOVE(this.type), this.model.id); },
  },
};
