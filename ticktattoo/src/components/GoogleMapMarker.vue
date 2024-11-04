<template>
     <div></div>
   </template>


<script>
import { gps_icon } from '../../public/assets/gps.png'

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
  },

  mounted() {
    new this.google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      icon: gps_icon
    })
  }
}

</script>