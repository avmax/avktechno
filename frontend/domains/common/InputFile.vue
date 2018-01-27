<template>
  <label @click.prevent.stop="onClick" class="layout file-input align-center" v-ripple="true">
    <input
      type="file"
      ref="input"
      class="file-input__original"
      :multiple="multiple"
      @change="onFileChange"
    >
    <v-btn class="file-input__button" fab small icon color="primary">
      <v-icon>file_upload</v-icon>
    </v-btn>
    <v-layout column>
      <span
        class="file-input__label"
      >
        {{ label }}
      </span>
      <span
        class="file-input__placeholder primary--text"
        :class="{ 'file-input__placeholder_selected_none': files && files.length === 0 }">
        {{ placeholder }}
      </span>
    </v-layout>
  </label>
</template>


<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      files: [],
    };
  },

  computed: {
    placeholder() {
      if (this.files && this.files.length > 0) {
        if (this.files.length === 1) {
          return this.files[0].name;
        }
        return `Выбрано файлов: ${this.files.length}`;
      }

      return this.defaultPlaceholder;
    },

    defaultPlaceholder() {
      return this.multiple ? 'Выберите файлы' : 'Выберите файл';
    },

    shouldShowTooltip() {
      return this.files != null && this.files.length > 1;
    },
  },

  methods: {
    onFileChange(e) {
      if (e.target.files) {
        this.files = e.target.files;
      } else {
        this.files = [];
      }

      this.$emit('input', this.multiple ? this.files : this.files[0]);
    },

    onClick() {
      setTimeout(() => this.simulateClick(), 120);
    },

    simulateClick() {
      const elem = this.$refs.input;
      const event = new MouseEvent('click', {
        bubbles: false,
        cancelable: true,
        view: window,
      });

      elem.dispatchEvent(event);
    },
  },
};
</script>


<style lang="scss">

.file-input {
  position: relative;
  display: inline-flex;
  cursor: pointer;

  &__original {
    opacity: 0;
    width: 0;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  &__label {
    font-size: 14px;
    transition: color 0.4s ease;
    color: rgba(0, 0, 0, 0.5);
  }

  &__placeholder {
    overflow: hidden;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;

    &_selected_none {
      color: rgba(0, 0, 0, 0.5);
    }
  }

  &:active, &:focus {
    .file-input__label {
      color: blue;
    }
  }
}
</style>
