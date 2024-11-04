<template>
     <div>
          <GoogleMap v-if="isMapLoaded" apiKey="AIzaSyAaCZksY9ZjiUqBoUPB3nvdNC0dyY2zUv0" style="width: 100%; height: 800px" />
     </div>

     <!-- <div>
          <GoogleMapLoader :mapConfig="mapConfig" apiKey="AIzaSyAaCZksY9ZjiUqBoUPB3nvdNC0dyY2zUv0">
          <template v-slot="{ google, map }">
               <GoogleMapMarker v-for="marker in markers" :key="marker.id" :marker="marker" :google="google"
                    :map="map" />
          </template>
</GoogleMapLoader>

</div> -->

</template>

<script>
import { GoogleMap } from 'vue3-google-map';

export default {
     name: 'MapPage',
     components: { GoogleMap },
     data() {
          return {
               isMapLoaded: false,
          };
     },
     mounted() {
          // Ensure map is only loaded after the component is mounted
          this.isMapLoaded = true;
     },
}

// import GoogleMapLoader from '../components/GoogleMap.vue'
// import GoogleMapMarker from '../components/GoogleMapMarker.vue'
// import { gps_icon } from '../../public/assets/gps.png'
// export default {
//      name: 'MapPage',
//      components: {
//           GoogleMapLoader,
//           GoogleMapMarker
//      },
//      data() {
//           return {
//                markers: [
//                     { id: 'a', position: { lat: 3, lng: 101 } },
//                     { id: 'b', position: { lat: 5, lng: 99 } },
//                     { id: 'c', position: { lat: 6, lng: 97 } },
//                ],
//           }
//      },
//      computed: {
//           mapConfig() {
//                return {
//                     ...gps_icon,
//                     center: { lat: 0, lng: 0 }
//                }
//           },
//      },
// }
</script>