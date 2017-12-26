export default {
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  methods: {
    onFormControlChange() {
      this.$emit('change', this.model);
    },
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit('apply', this.model);
      }
    },
    handleAbort() {
      this.$emit('abort');
    },
  },
};
