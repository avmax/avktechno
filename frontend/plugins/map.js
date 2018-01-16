import Vue from 'vue';
// eslint-disable-next-line
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBWsBPHqvOqD1rnZEGIDsIwk1wcDWXIFJs',
    // libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  },
});
