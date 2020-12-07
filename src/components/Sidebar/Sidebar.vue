<template>
  <div class="sidebar">
    <div class="user">
      <div class="user-picture">
        <img :src="user.picture_url" class="ui circular image" />
      </div>

      <div class="user-info">
        <div class="user-info-pseudo">{{ user.username }}</div>

        <div class="user-info-status ui simple dropdown">
          <div class="available text">
            En ligne
          </div>
          <i class="dropdown icon"> </i>
          <div class="menu">
            <div class="item" @click="deauthenticate">
              <i class="logout icon"> </i>
              Déconnexion
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="menu">
      <div class="blue button" @click="openCommunity">
        <i class="users icon"> </i>
        <br />
        <span>Communauté</span>
      </div>
      <div v-if="true" class="blue button" @click="openMessageSearch">
        <i class="search icon"> </i>
        <br />
        <span>Messages</span>
      </div>
      <div v-if="true" class="blue button" @click="openInfo">
        <span>Informations</span>
      </div>
    </div>
    <div class="conversations">
      <div class="conversation-search">
        <div class="ui fluid search">
          <div class="ui icon input">
            <input
              class="prompt"
              placeholder="Rechercher une conversation"
              type="text"
              v-model="search"
            />
            <i class="search icon"> </i>
          </div>
        </div>
      </div>

      <div v-for="(convers, index) in filterConversations" :key="index">
        <div
          class="conversation new"
          :title="
            convers.participants[0] === user.username
              ? convers.participants[1]
              : convers.participants[0]
          "
          @click="openConversation(convers.id)"
        >
          <a class="avatar">
            <i v-if="convers.participants.length > 2" class="ui users icon"></i>
            <img v-else :src="getUserPicture(convers.participants[0] === user.username ? convers.participants[1] : convers.participants[0])" />
          </a>
          <div class="content">
            <div class="metadata">
              <div v-if="convers.participants.length === 2" class="title"><i class="ui small icon circle"> </i> {{ convers.participants[0] === user.username ? convers.participants[1] : convers.participants[0] }}</div>
              <div v-else class="title"><i class="ui small icon circle"> </i> Groupe: <span v-for="username in convers.participants.filter(parti => parti !== user.username)" :key="username">
                {{ username }}
              </span></div>
              <span class="time">{{getDate(convers.updated_at)}}</span>
            </div>
            <div class="text">{{ convers.messages[convers.messages.length - 1] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    ...mapActions(["deauthenticate"]),
    openCommunity() {
      router.push({ name: "Community" });
    },
    openMessageSearch() {
      router.push({ name: "Search" });
    },
    openConversation(id) {
      router.push({ name: "Conversation", params: { id } });
    },
    openInfo() {
      router.push({name: "Info"});
    },
    getUserPicture(username) {
      let parti = null;
      this.users.forEach(user => {
        if (user.username === username) {
          parti = user;
        }
      });

      return parti.picture_url;
    },
    getDate(date) {
      //console.log(date);
      let dateConvUpdate = new Date(date);
      console.log(dateConvUpdate.getHours());
      return dateConvUpdate.getHours() + ":" + dateConvUpdate.getMinutes() + ":" + dateConvUpdate.getSeconds()
    }
  },
  computed: {
    ...mapGetters(["user", "conversations", "users"]),
    filterConversations() {
      let filteredConvs = this.conversations;

      filteredConvs = filteredConvs.filter(conv =>
        conv.participants[1].toLowerCase().includes(this.search.toLowerCase())
      );

      filteredConvs.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
      return filteredConvs;
    }
  }
};
</script>

<style scoped src="./Sidebar.css" />
