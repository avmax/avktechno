import { mapState } from 'vuex';
import { EDITION_ADD, EDITION_EDIT, EDITION_REMOVE } from '~/domains/barrel.state';

const Editable = {
  props: {
    isEditable: Boolean,
  },
  computed: {
    ...mapState({
      isAdmin: ({ user }) => user.isAdmin,
      isEnabled: ({ edition }) => edition.isEnabled,
    }),
    isEditionAvailable() { return this.isAdmin && this.isEditable; },
    isEditionEnabled() { return this.isAdmin && !this.isEnabled && this.isEditable; },
  },
  methods: {
    add(type, refType, refId) {
      const payload = refType ? { [refType]: refId } : {};
      this.$store.dispatch(EDITION_ADD(type), payload);
    },
    edit(type, id) {
      this.$store.dispatch(EDITION_EDIT(type), id);
    },
    remove(type, id) {
      this.$store.dispatch(EDITION_REMOVE(type), id);
    },
  },
};

export default Editable;
