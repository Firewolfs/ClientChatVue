<template>
  <div class="group">
    <div class="ui fluid search">
      <div class="ui icon input">
        <input
          type="text"
          placeholder="Rechercher un utilisateur"
          class="prompt"
        /><i class="search icon"></i>
      </div>
    </div>
    <div class="spanner">
      <hr />
      <span>Participants</span>
      <hr />
    </div>

    <div v-for="participant in conversation.participants" :key="getUser(participant)">
      <div class="user">
        <img src="https://source.unsplash.com/mK_sjD0FrXw/100x100" /><span
          >{{ participant }}<br /><i class="nickname"></i></span
        ><i title="Modifier le surnom" class="circular quote left link icon"></i
        ><i
          title="Enlever de la conversation"
          class="circular times icon link"
          style=""
        ></i>
      </div>
    </div>

    <div class="spanner">
      <hr />
      <span>Communauté</span>
      <hr />
    </div>
    <div v-for="user in users" :key="getUser(user)">
      <div v-if="!conversation.participants.includes(user.username)">
        <div class="user">
          <span>{{user.username}}</span>
          <i title="Ajouter à la conversation" class="circular plus icon link"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Group",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters(["conversation", "users"])
  },
  methods: {
    ...mapActions([]),
    getUser(username) {
      let userParti = null;
      this.users.forEach(user => {
        if (user.username === username) {
          userParti = user;
        }
      });

      return userParti;
    }
  }
};
</script>

<style src="./Group.css" scoped />
