<template>
  <div class="Info">
    <div class="photo">
      <!-- Photo de groupe ici -->
    </div>
    <div class="groupe">
      <h1>Groupe :</h1>
    </div>
    <div class="membres">
      <div v-for="(user, index) in groupe" :key="index" class="membre">
        <span class="nom">{{user.nom}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return{
      groupe: [
        {nom: "Stéphane"},
        {nom: "Daniel"},
        {nom: "Christopher"}
      ]
    };
  }
}
</script>

<style scoped>

</style>