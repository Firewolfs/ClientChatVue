<template>
  <div class="group">
    <div class="ui fluid search">
      <div class="ui icon input">
        <input
          type="text"
          placeholder="Rechercher un utilisateur"
          class="prompt"
          v-model="search"
        /><i class="search icon"></i>
      </div>
    </div>
    <div class="spanner">
      <hr />
      <span>Participants</span>
      <hr />
    </div>

    <div v-for="participant in filterParticipants" :key="getUser(participant).id">
      <div class="user">
        <img :src="getUser(participant).picture_url" /><span
          >{{ participant }}<br /><i class="nickname"></i></span
        ><i title="Modifier le surnom" class="circular quote left link icon"></i
        ><i
          title="Enlever de la conversation"
          class="circular times icon link"
          style=""
          @click="
            removeParticipant({
              conversationId: conversation.id,
              username: participant
            })
          "
        ></i>
      </div>
    </div>

    <div class="spanner">
      <hr />
      <span>Communauté</span>
      <hr />
    </div>
    <div v-for="user in users" :key="user.id">
      <div v-if="!conversation.participants.includes(user.username)">
        <div class="user">
          <img :src="user.picture_url"/>
          <span>{{ user.username }}</span>
          <i v-on:click="addParticipant({conversation_id: conversation.id, participant: user.username})" title="Ajouter à la conversation" class="circular plus icon link"></i>
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
    ...mapGetters(["conversation", "users"]),
    filterParticipants() {
      let filteredParti = this.conversation.participants;

      filteredParti = filteredParti.filter(conv =>
        conv.toLowerCase().includes(this.search.toLowerCase())
      );

      return filteredParti;
    }
  },
  methods: {
    ...mapActions(["addParticipant", "removeParticipant"]),
    getUser(username) {
      let parti = null;
      this.users.forEach(user => {
        if (user.username === username) {
          parti = user;
        }
      });

      return parti;
    }
  }
};
</script>

<style src="./Group.css" scoped />
