<template>
  <div>
      <h1>{{name}}</h1>
      <input type="text" v-model="name">
      <br>
      <h1>{{sum}}</h1>
      <h1>multiply: {{multiplied}}</h1>
      <input type="number" v-model="num1">
      <input type="number" v-model="num2">
      <button @click="multiply(num1, num2), name='hello'">Multiply</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num1: 0,
      num2: 0,
      name: '',
      multiplied: 0
    }
  },
  computed: {
    sum () {
      return parseFloat(this.num1) + parseFloat(this.num2)
    }
  },
  methods: {
    multiply (n1, n2) {
      this.multiplied = parseFloat(n1) * parseFloat(this.num2)
    }
  }
}
</script>

<style scoped>

</style>

