<template>
  <div>
      <h2>Voice Recognition and Speach API</h2>
      <button @click="search">Start</button>

      <div style="width: 100% ; height: calc(100vh - 50px);">
      <v-map :zoom=13 :center="center">
        <v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker :lat-lng="center" :icon="binayMarkerIcon"></v-marker>
      </v-map>
    </div>
  </div>

</template>
<script>
import Artyom from 'artyom.js'
import { Map, TileLayer, Marker } from 'vue2-leaflet'
import BinayHead from 'src/statics/quasar-logo.png'
import L from 'leaflet'
let binayMarkerIcon = L.icon({
  iconUrl: BinayHead,
  iconAnchor: [60, 60],
  iconSize: [200, 200]
})

const artyom = new Artyom()
artyom.ArtyomVoicesIdentifiers['en-GB'] = ['Google UK English Male', 'Google UK English Female', 'en-GB', 'en_GB']
let commandHello = {
  smart: true,
  indexes: ['*'], // These spoken words will trigger the execution of the command
  action: (i, wildcard) => { // Action to be executed when a index match with spoken word
    artyom.say(wildcard)
    console.log(wildcard)
    if (wildcard === 'hello') {
      artyom.say('Whats your name?')
    }
  }
}
artyom.addCommands(commandHello)
artyom.initialize({
  lang: 'en-GB', // A lot of languages are supported. Read the docs !
  continuous: true, // recognize 1 command and stop listening !
  listen: true, // Start recognizing
  debug: true, // Show everything in the console
  speed: 1 // talk normally
})
export default {
  mounted () {
    artyom.say('Kamusta ka?')
  },
  components: {
    'v-map': Map,
    'v-tilelayer': TileLayer,
    'v-marker': Marker
  },
  data () {
    return {
      binayMarkerIcon,
      center: [47.413220, -1.219482]
    }
  },
  methods: {
    search () {
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
      // L.marker([20.6760413, 200.0437003]).addTo(Map)
      navigator.geolocation.getCurrentPosition(success, error, options)
    }
  }
} 
</script>


<style>
  @import "~leaflet/dist/leaflet.css";
  /* @import "~leaflet-routing-machine/dist/leaflet-routing-machine.css"; */
</style>