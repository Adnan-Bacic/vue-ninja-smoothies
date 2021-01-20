<template>

  <div class="index container">
    <!--
    <h1>Smoothies</h1>
    <div class="card" v-for="smoothie in smoothies" v-bind:key="smoothie.id">
      <div class="card-content">
        <i class="material-icons deleteIcon" v-on:click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredient">
          <li v-for="(ingredient, index) in smoothie.ingredients" v-bind:key="index">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
    </div>
    <hr>
    -->
    <h1>Firebase smoothies</h1>
    <div class="smoothie-container">
      <div class="card" v-for="smoothie in smoothiesFB" v-bind:key="smoothie.id">
      <div class="card-content">
        <i class="material-icons deleteIcon" v-on:click="deleteSmoothieFB(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredient">
          <li v-for="(ingredient, index) in smoothie.ingredients" v-bind:key="index">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <!--router link to the edit page. with the smoothie_slug parameter for unique pages-->
        <router-link :to="{ name: 'EditSmoothie', params:{ smoothie_slug: smoothie.slug } }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
    </div>
  </div>
</template>

<script>
import firebaseDB from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      smoothies:[
        { title: 'Ninja Brew', slug: 'ninja-brew', ingredients: [ 'bananas', 'coffee', 'milk'], id: '1'},
        { title: 'Morning mood', slug: 'morning-mood', ingredients: [ 'mango', 'lime', 'juice'], id: '2'},
        { title: 'smoothie3', slug: 'smothie-3', ingredients: [ 'mango', 'lime', 'juice'], id: '3'},
        { title: 'smoothie4', slug: 'smothie-4', ingredients: [ 'mango', 'lime', 'juice'], id: '4'},
        { title: 'smoothie5', slug: 'smothie-5', ingredients: [ 'mango', 'lime', 'juice'], id: '5'},
        { title: 'smoothie6', slug: 'smothie-6', ingredients: [ 'mango', 'lime', 'juice'], id: '6'},
      ],

      //array for firebase
      smoothiesFB: []
    }
  },

  methods:{
    deleteSmoothie(id){
      //filter goes through an array and allows to filter if it return true it stays, false then removes it.
      this.smoothies = this.smoothies.filter(smoothie => {
        //if the smoothie.id is not equal to id it is kept, if it is equal it is removed
        return smoothie.id != id
      })
    },
    //from firebase
    deleteSmoothieFB(id){
      console.log(id)//shows randomly generated id from firebase

      firebaseDB.collection('smoothies').doc(id).delete()
      .then(() => {
        this.smoothiesFB = this.smoothiesFB.filter(smoothie => {
        //if the smoothie.id is not equal to id it is kept, if it is equal it is removed
        return smoothie.id != id
      })
    })
  }
  },

  created(){
    //fetch data from firestore
    firebaseDB.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.data(), doc.id)
        let smoothie = doc.data()
        smoothie.id = doc.id
        //push to array
        this.smoothiesFB.push(smoothie)
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1{
    width: 100%;
  }
  .smoothie-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }
  .index .deleteIcon{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
</style>