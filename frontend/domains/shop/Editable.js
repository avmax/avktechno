import { mapState } from 'vuex';
import { EDITION_ADD, EDITION_EDIT, EDITION_REMOVE } from '~/domains/barrel.state';

const EditableDumb = {
  methods: {
    add() { this.$emit('add'); },
    edit() { this.$emit('edit'); },
    remove() { this.$emit('remove'); },
  },
};

const EditableSmart = {
  computed: {
    ...mapState({
      isEditionAvailable: ({ user }) => user.isAdmin,
      isEditionEnabled: ({ edition, user }) => user.isAdmin && !edition.isEnabled,
    }),
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

export { EditableDumb, EditableSmart };
