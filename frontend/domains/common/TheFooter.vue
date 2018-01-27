<template>
  <v-footer app fixed color="primary" dark class="accent--text">
    <span>&copy; {{year}}</span>
    <a href="tel:+74952800575" class="pl-3 accent--text">+7 (495) 280 0575</a>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      year: (new Date()).getFullYear(),
    };
  },
};
</script>
