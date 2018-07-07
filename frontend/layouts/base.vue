<template>
  <v-app id="avmax">

    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
      /* eslint-disable */
        (function (d, w, c) {
            (w[c] = w[c] || []).push(function() {
                try {
                    w.yaCounter49504690 = new Ya.Metrika2({
                        id:49504690,
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                    });
                } catch(e) { }
            });

            var n = d.getElementsByTagName("script")[0],
                s = d.createElement("script"),
                f = function () { n.parentNode.insertBefore(s, n); };
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://mc.yandex.ru/metrika/tag.js";

            if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
            } else { f(); }
        })(document, window, "yandex_metrika_callbacks2");
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/49504690" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->

    <the-header>
      <slot name="header" slot="header"/>
    </the-header>

    <template v-if="!isSpinner">
      <slot name="panels"/>
      <the-sidebar/>

      <v-content class="content">
        <the-notifications/>
        <v-container fluid>
          <v-layout column fill-width>
            <v-flex>
              <nuxt/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>

    <template v-else>
      <v-layout  row align-center justify-center>
        <grid-loader :loading="true" color="#003559"/>
      </v-layout>
    </template>

    <the-footer/>
  </v-app>
</template>

<script>
import TheHeader from '~/common/Header/the.vue';
import TheFooter from '~/common/Footer/the.vue';
import TheSidebar from '~/common/Sidebar/primary.vue';
import TheNotifications from '~/common/Notification/container.vue';
import {
  ENTITY_ALL_LOAD,
  SPINNER_HIDE,
} from '~/barrel/state';
import GridLoader from 'vue-spinner/src/GridLoader.vue';
import { mapState } from 'vuex';

export default {
  name: 'layout-base',
  components: {
    TheHeader,
    TheFooter,
    TheSidebar,
    TheNotifications,
    GridLoader,
  },
  data() {
    return {
      test: false,
    };
  },
  computed: {
    ...mapState({
      isSpinner: ({ ui }) => ui.spinner,
    }),
  },
  async mounted() {
    if (!process.env.isProd) {
      await this.$store.dispatch(ENTITY_ALL_LOAD());
      this.$store.commit(SPINNER_HIDE);
    } else {
      setTimeout(() => this.$store.commit(SPINNER_HIDE), 500);
    }
  },
};
</script>

<style lang="scss">
#avmax {
.page {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.content {
  @media all and (max-width: 400px) {
    width: 100%;
    overflow: hidden;
  }
}
}
</style>
