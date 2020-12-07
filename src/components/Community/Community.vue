<template>
  <div class="community">
    <div class="filter">
      <div class="ui fluid search">
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Rechercher un utilisateur"
          />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <div>
      <div v-for="(user, index) in users" :key="index" @click="toggleSelected(user)">
        <div :class="[user.awake ? 'selected user' : 'user']" >
          <img :src="user.picture_url" /><span class="">{{user.username}}</span>
        </div>
      </div>
    </div>
    </div>
    
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Community",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["createOneToOneConversation"]),
    openConversation() {
      let promise = this.createOneToOneConversation("Alice");

      promise.finally(() => {
        console.log("Conversation ouverte !");
      });
    },
    toggleSelected(user) {
      console.log("Toggle Selected");
      console.log(user);
      user.awake = !user.awake;
    }
  },
  computed: {
    ...mapGetters(["users"])
  }
};
</script>

<style src="./Community.css" scoped/>
