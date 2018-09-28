<template>
  <div class="row">
    <q-toolbar color="primary">
      <q-toolbar-title>
        Store ni Juan v100
      </q-toolbar-title>
      <q-btn round small>
        <q-icon name="add" />
      </q-btn>
      <q-btn round small @click="$refs.cartModal.open()">
        <q-icon name="shopping cart" />
        <q-chip v-show="cart.length" small floating color="negative">{{cart.length}}</q-chip>
      </q-btn>
    </q-toolbar>

    <div class="layout-padding row">
      <q-card v-for="(item, i) in items" :key="i" style="width: 200px;">
        <q-card-title>
          {{item.name}}
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          {{item.price}}
        </q-card-main>
        <q-card-actions>
          <div class="col">
            <q-btn @click="pushToCart(item)" class="pull-right" round color="secondary" small icon="add shopping cart"></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>

    <h1>MyOrders</h1>
    <div class="layout-padding row">
      <q-card v-for="order in myOrders" :key="order._id" style="width: 200px;">
        <q-card-title>
          {{order.client}}
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          {{order.items.length}} items
        </q-card-main>
        <q-card-actions>
          <div class="col">
            
            <q-btn @click="patch(order['.key'])" class="pull-right" round color="info" small icon="edit name"></q-btn>
            
          </div>
          <div class="col">
          <q-btn @click="removeOrder(order['.key'])" class="pull-right" round color="negative" small icon="edit name"></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>


    <q-modal ref="cartModal" minimized >
      <q-toolbar color="primary">
        <q-toolbar-title>
          Cart
        </q-toolbar-title>
        <q-btn @click="$refs.cartModal.close()" round small flat>
          <q-icon name="close" />
        </q-btn>
      </q-toolbar>
      <div class="layout-padding row">
        <div class="col">
          {{cart.length ? '': '--- No items found ---'}}
          <ul>
            <li v-for="(i, index) in cart" :key="index">
              {{i.name}} - {{i.price}}Php
              <q-btn @click="removeFromCart(index)" icon="delete" color="negative" round small flat />
            </li>
          </ul>
          <div class="col">
            <h5>Total: {{cartTotal}}</h5>
            <q-btn v-if="cart.length" @click="placeOrder" small color="amber" class="pull-right">
              Place Order
            </q-btn>
          </div>
        </div>
        
      </div>
      
    </q-modal>
  </div>
</template>
<script>
import {Toast} from 'quasar'
export default {
  mounted () {
    // Feathers
    // this.myOrders = this.$dbCon.services.orders.data
    // this.$dbCon.services.orders.onDataChange(data => {
    // this.myOrders = data
    // })
    // Firebase
    this.$bindAsArray('myOrders', this.$dbCon.ref().child('orders'))
  },
  data () {
    return {
      myOrders: [],
      clientName: 'Juan dela Cruz',
      items: [
        {
          name: 'Ice Cream',
          price: 500
        },
        {
          name: 'Lollipop',
          price: 358.90
        },
        {
          name: 'Red Horse',
          price: 1000
        },
        {
          name: 'Red bull',
          price: 40
        },
        {
          name: 'Cobra',
          price: 45
        },
        {
          name: 'Shake',
          price: 358.90
        }
      ],
      cart: []
    }
  },
  computed: {
    cartTotal () {
      let total = 0
      for (let item of this.cart) {
        total += item.price
      }
      return total
    }
  },
  methods: {
    pushToCart (i) {
      Toast.create.positive(`${i.name} - ${i.price} added to cart`)
      this.cart.push(i)
    },
    removeFromCart (i) {
      this.cart.splice(i, 1)
    },
    placeOrder () {
      let order = {
        client: this.clientName,
        items: this.cart
      }
      console.log(order)
      // Feathers
      // this.$dbCon.services.orders.create(order)
      // Firebase
      this.$firebaseRefs.myOrders.push(order)
    },
    patch (_id) {
      // Feathers
      // this.$dbCon.services.orders.patch(_id, {client: 'Juanita'})
      this.$firebaseRefs.myOrders.child(`${_id}/client`).set('Juanita')
    },
    removeOrder (_id) {
      // Feathers
      // this.$dbCon.services.orders.remove(_id)
      // FireBase
      this.$firebaseRefs.myOrders.child(_id).remove()
    }
  }
}
</script>