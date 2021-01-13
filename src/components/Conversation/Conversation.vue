<template>
  <div class="conversation">

    <div class="conversation-header">
      <div  v-if="conversation.type === 'one_to_one'">
        <img class="avatar" :src="getUserPicture(conversation.participants[1])"/>
      </div>
      <div v-else class="avatar">
        <i class="ui users icon"></i>
      </div>

      <div class="title">
        <div class="ui compact">
          <i class="icon circle"></i>
          <span v-if="conversation.participants.length === 2">
            <span>
              {{
                  conversation.participants[1]
              }}
            </span>
          </span>
          <span v-else>
            Groupe:
            <span v-for="(participant, index) in conversation.participants" :key="index">
              {{
                index === conversation.participants.length - 1 ? 
                  participant 
                    : 
                  participant + ","
              }}
            </span>
          </span>
          <div class="ui simple dropdown item">
            <i class="vertical ellipsis icon"></i>

            <div class="menu">
              <div v-if="true" class="item">
                <i class="ui icon paint brush"></i>
                Modifier le thème
              </div>
              <div v-if="true" class="item">
                <i class="ui icon edit"></i>
                Modifier le titre
              </div>
              <div v-if="true" class="item">
                <i class="ui icon volume bell slash"></i>
                Mettre en sourdine
              </div>
              <div v-if="true" class="item">
                <i class="ui icon volume bell"></i>
                Rétablir les notifications
              </div>
              <div class="item" @click="groupPanel = !groupPanel">
                <i class="ui icon users"></i>
                Gérer les participants
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="conversation-container">
      <div class="conversation-main">
        <div class="conversation-body" id="scroll">
          <div class="wrapper">
            <h1>{{ conversation }}</h1>

            <div v-for="(message, index) in conversation.messages" :key="index">
              <div class="time">{{ message.posted_at }}</div>
              <div :class="{ message: true, mine: message.mine }">
                <div class="bubble top bottom">{{ message.content }}</div>
                <div class="reacts"></div>
                <div class="controls">
                  <div v-if="message.mine === true">
                    <i title="Supprimer" class="circular trash icon"></i>
                    <i title="Editer" class="circular edit icon"></i>
                    <i title="Répondre" class="circular reply icon"></i>
                  </div>
                  <div v-else>
                    <i title="Répondre" class="circular reply icon"></i>
                    <span class="react">
                      <i title="Aimer" class="circular heart outline icon"></i>
                      <i title="Pouce en l'air" class="circular thumbs up outline icon"></i>
                      <i title="Content" class="circular smile outline icon"></i>
                      <i title="Pas content" class="circular frown outline icon"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="typing">
              <div class="wrapper">
                Alice est en train d'écrire...
              </div>
            </div>
            <div class="conversation-footer">
              <div class="wrapper">
                <p><i title="Abandonner" class="circular times small icon link"></i>Répondre à Alice :<span>On peut même éditer ou supprimer des messages !</span></p>
                <div class="ui fluid search">
                  <div class="ui icon input">
                    <input class="prompt" type="text" placeholder="Rédiger un message"/><i class="send icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="conversation-sidebar" v-if="groupPanel">
            <Group />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Group from "@/components/Group/Group";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Conversation",
  components: { Group },
  data() {
    return {
      groupPanel: false
    };
  },
  mounted() {
    this.scrollBottom();
  },
  updated() {
    this.scrollBottom();
  },
  computed: {
    ...mapGetters(["conversation", "users", "messages"])
  },
  methods: {
    ...mapActions([]),
    scrollBottom() {
      setTimeout(() => {
        let scrollElement = document.querySelector("#scroll");
        if (scrollElement) {
          scrollElement.scrollTop = document.querySelector(
            "#scroll"
          ).scrollHeight;
        }
      }, 0);
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
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    conversation(newConversation, oldConversation) {
      this.scrollBottom();
    }
  }
};
</script>

<style src="./Conversation.css" scoped />
