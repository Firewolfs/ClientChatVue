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
            />
            <i class="search icon"> </i>
          </div>
        </div>
      </div>

      <div v-for="(convers, index) in conversations" :key="index">
        <div
          class="conversation new"
          :title="convers.participants[1]"
          @click="openConversation(convers.id)"
        >
          <a class="avatar">
            <img src="https://source.unsplash.com/7omHUGhhmZ0/100x100" />
          </a>
          <div class="content">
            <div class="metadata">
              <div class="title"><i class="ui small icon circle"> </i> {{ convers.participants[1] }}</div>
              <span class="time">01:30:58</span>
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
      search: "",
      Test: "Test"
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
    }
  },
  computed: {
    ...mapGetters(["user", "conversations"])
  }
};
</script>

<style scoped src="./Sidebar.css" />