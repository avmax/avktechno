<template>
  <section class="page container">
    <div>
      <logo/>
      <h1 class="page">
        avktechno-ssr
      </h1>
      <h2 class="page__subtitle">
        Nuxt.js project {{subtitle}}
      </h2>
      <div class="page__links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green mr-5">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
  },
  data() {
    return {
      subtitle: 'YEEEE ',
    };
  },
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.page {
  &__title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  &__subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  &__links {
    padding-top: 15px;
  }
}

</style>
