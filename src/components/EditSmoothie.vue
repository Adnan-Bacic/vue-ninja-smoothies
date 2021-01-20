<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h1>Edit smoothie {{ this.$route.params.smoothie_slug }}</h1>
        <h2>Edit {{ smoothie.title }}</h2>
        <form v-on:submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Smoothie title</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <!--adding new input after tab press-->
            <div v-for="(ingredient, index) in smoothie.ingredients" v-bind:key="index" class="field">
                <label for="ingedient">Added ingredient:</label>
                <input name="ingredient" type="text" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" v-on:click="DeleteIngredient(ingredient)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="ingredient">Add an ingredient</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="AddIngredient()" v-model="another">
            </div>
            <div class="field center-align">
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <button class="btn pink">Update smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebaseDB from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',

    data(){
        return{
            smoothie: null,
            another: null,
            feedback: null,
        }
    },

    methods:{
        EditSmoothie(){
            //console.log(this.smoothie.title, this.smoothie.ingredients)
            //if title is not null
            if(this.smoothie.title){
                this.feedback = null

                //create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    //replace space with
                    replacement: '-',
                    //remove these from the slug
                    remove: /[$*_+~.()'"!\-:@]/g,
                    //set lowercase
                    lower: true
                })
                //adding to the firebase db
                //pass id into doc
                firebaseDB.collection('smoothies').doc(this.smoothie.id).update({
                    //define which row you want to add something to and what to add.
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    //url:
                    slug: this.smoothie.slug
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
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        DeleteIngredient(ingredient){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingToRemove => {
                //if returns true then it stays, if false it gets removed
                return ingToRemove != ingredient
            })
        },
    },


    created(){
        //get where slug == something
        let ref = firebaseDB.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                //console.log(doc.data())
                //setting the value of the smoothie to the variable
                this.smoothie = doc.data()
                //giving the smoothie an id
                this.smoothie.id = doc.id
            })
        })
    },
}
</script>

<style scoped>
    .edit-smoothie{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .edit-smoothie h1{
        font-size: 2em;
        margin: 20px auto;
    }
    .edit-smoothie .field{
        margin: 20px auto;
        position: relative;
    }
    .edit-smoothie .delete{
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>