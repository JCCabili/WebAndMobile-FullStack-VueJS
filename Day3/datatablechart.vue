// charts.vue

<template>
  <div>
    <input type="text" v-model="text">
    <t-table fname="text" />
    <h1>Charts</h1>
    <schart :canvasId="canvasId"
      :type="type"
      :width="width"
      :height="height"
      :data="data"
      :options="options"
    ></schart>
    <q-btn @click="update">Update</q-btn>
  </div>
</template>

<script>
import datatable from 'components/datatable.vue'
console.log(datatable)
import Schart from 'vue-schart'
export default {
  components: {
    Schart,
    't-table': datatable
  },
  data () {
    return {
      text: '',
      canvasId: 'myCanvas',
      type: 'bar',
      width: 500,
      height: 400,
      data: [
        {name: '2014', value: 1342},
        {name: '2015', value: 2123},
        {name: '2016', value: 1654},
        {name: '2017', value: 1795}
      ],
      options: {
        title: 'Total sales of stores in recent years'
      }
    }
  },
  methods: {
    update () {
      this.data = [
        {name: 'asd', value: 2313},
        {name: 'asd', value: 2142},
        {name: 'asd', value: 1214},
        {name: 'asd', value: 205}
      ]
    }
  }
}
</script>







// datatable.vue

<template>
<div>
  <h1>{{this.fname}}</h1>
  <div>
    <q-data-table
      :data="table"
      :columns="columns"
    >
      <!-- Custom renderer for "message" column -->
      <div slot="col-message" slot-scope="cell">
        <span class="light-paragraph">{{cell.data}}</span>
      </div>

      <!-- Custom renderer for "source" column -->
      <div slot="col-source" slot-scope="cell">
        <span v-if="cell.data === 'Audit'" class="label text-white bg-primary">
          Audit
          <q-tooltip>Some data</q-tooltip>
        </span>
        <span v-else class="label text-white bg-negative">{{cell.data}}</span>
      </div>

      <!-- Custom renderer for "action" column with button for custom action -->
      <div slot='col-action' slot-scope='cell'>
        <q-btn color="primary" @click='doSomethingMethod(cell.row.id)'>View</q-btn>
      </div>

      <!-- Custom renderer when user selected one or more rows -->
      <div slot="selection" slot-scope="selection">
        <q-btn color="primary" @click="changeMessage(selection)">
          <i>edit</i>
        </q-btn>
        <q-btn color="primary" @click="deleteRow(selection)">
          <i>delete</i>
        </q-btn>
      </div>
    </q-data-table>
  </div>
</div>
</template>

<script>
export default {
  props: ['fname'],
  data () {
    return {
      table: [
        {
          fname: this.fname,
          lname: 'Boado'
        }
      ],
      columns: [
        {
          label: 'First name',
          filter: true,
          field: 'fname'
        },
        {
          label: 'Last name',
          filter: true,
          field: 'lname'
        }
      ]
    }
  }
}
</script>






// router.js

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { path: '/',
      component: load('Hello'),
      children: [
        {
          path: '',
          component: load('datatable')
        },
        {
          path: 'chart',
          component: load('charts')
        }
      ]
    },
    { path: '/page1', component: load('page1') },
    // { path: '/shopping', component: load('Shopping') },

    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
