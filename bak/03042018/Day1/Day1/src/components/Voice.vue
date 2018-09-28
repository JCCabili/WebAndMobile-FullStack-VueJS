<template>
  <div>
      <h2>Voice Recognition and Speach API</h2>
      <button>Start</button>
  </div>
</template>
<script>
import Artyom from 'artyom.js'
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
  data () {
    return {}
  }
}
</script>

