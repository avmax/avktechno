<template>
  <v-footer app fixed color="primary" dark class="black--text">
    <span>&copy; {{year}}</span>
    <a href="tel:+74953746724" class="pl-3 black--text">+7 (495) 374 67 24</a>
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
