import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isAdmin: ({ user }) => user.isAdmin,
      isEnabled: ({ edition }) => edition.isActive,
    }),
    isEditionPossible() { return this.isAdmin; },
    isEditionAvailable() { return this.isEditionPossible && !this.isEnabled; },
  },
};
