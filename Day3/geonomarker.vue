<template>
    <div style="width: 100% ; height: calc(100vh - 50px);">
      <v-map :zoom=13 :center="center">
        <v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></v-tilelayer>
      </v-map>
    </div>
</template>

<script>
import { Map, TileLayer } from 'vue2-leaflet'
// import L from 'leaflet'

export default {
  mounted () {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    let success = (pos) => {
      var crd = pos.coords

      console.log('Your current position is:')
      console.log(`Latitude : ${crd.latitude}`)
      console.log(`Longitude: ${crd.longitude}`)
      console.log(`More or less ${crd.accuracy} meters.`)

      this.center = [crd.latitude, crd.longitude]
    }

    function error (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  },
  components: {
    'v-map': Map,
    'v-tilelayer': TileLayer
  },
  data () {
    return {
      center: [47.413220, -1.219482]
    }
  }
}
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
  /* @import "~leaflet-routing-machine/dist/leaflet-routing-machine.css"; */
</style>