<template>
  <v-footer app fixed color="primary" dark class="black--text">
    <span>&copy; {{year}}</span>
    <a href="tel:+74952800554" class="pl-3 black--text">+7 (495) 280 05 54</a>
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
