<template>
    <div class="edit-smoothie container">
        <h1 class="center-align indigo-text">Add new smoothie recipie</h1>
        <form v-on:submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie title</label>
                <input type="text" name="title" v-model="title">
            </div>
            <!--adding new input after tab press-->
            <div v-for="(ingredient, index) in arrayIngredients" v-bind:key="index" class="field">
                <label for="ingedient">Added ingredient:</label>
                <input name="ingredient" type="text" v-model="arrayIngredients[index]">
                <i class="material-icons delete" v-on:click="DeleteIngredient(ingredient)">delete</i>
            </div>
            <div class="field edit-ingredient">
                <label for="ingredient">Add an ingredient</label>
                <input type="text" name="edit-ingredient" @keydown.tab.prevent="AddIngredient" v-model="another">
            </div>
            <div class="field center-align">
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <button class="btn pink">Add smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebaseDB from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmoothie',

    data(){
        return{
            title: null,
            //value of ingredient input field
            another: null,
            //empty array for ingredients
            arrayIngredients: [],
            feedback: null,

            slug: null
        }
    },

    methods:{
        AddSmoothie(){
            console.log(this.title, this.arrayIngredients)
            //if title is not null
            if(this.title){
                this.feedback = null

                //create a slug
                this.slug = slugify(this.title, {
                    //replace space with
                    replacement: '-',
                    //remove these from the slug
                    remove: /[$*_+~.()'"!\-:@]/g,
                    //set lowercase
                    lower: true
                })
                //adding to the firebase db
                //console.log(this.slug)
                firebaseDB.collection('smoothies').add({
                    //define which row you want to add something to and what to add.
                    title: this.title,
                    ingredients: this.arrayIngredients,
                    //url:
                    slug: this.slug
                    //promise to redirect
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
                
            } else {
                this.feedback = 'You must enter a smoothie title.'
            }
        },
        AddIngredient(){
            if(this.another){
                //push the value of the input into the array, on tab press
                this.arrayIngredients.push(this.another)
                console.log(this.arrayIngredients)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        DeleteIngredient(ingredient){
            this.arrayIngredients = this.arrayIngredients.filter(ingToRemove => {
                //if returns true then it stays, if false it gets removed
                return ingToRemove != ingredient
            })
        },
    }
}
</script>

<style scoped>
    .add-smoothie{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .add-smoothie h1{
        font-size: 2em;
        margin: 20px auto;
    }
    .add-smoothie .field{
        margin: 20px auto;
        position: relative;
    }
    .add-smoothie .delete{
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>