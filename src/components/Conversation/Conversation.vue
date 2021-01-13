<template>
  <div class="conversation">
    <div class="conversation-header">
      <div v-if="conversation.type === 'one_to_one'">
        <img
          class="avatar"
          :src="
            getUserPicture(
              conversation.participants[0] === user.username
                ? conversation.participants[1]
                : conversation.participants[0]
            )
          "
        />
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
                conversation.participants[0] == user.username
                  ? conversation.participants[1]
                  : conversation.participants[0]
              }}
            </span>
          </span>
          <span v-else>
            Groupe:
            <span
              v-for="(participant, index) in conversation.participants"
              :key="index"
            >
              {{
                index === conversation.participants.length - 1
                  ? participant
                  : participant + ","
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
            <Message v-for="(message, index) in conversation.messages" :key="index" :content="message.content" :time="getDate(message.posted_at)" :mine="(user.username === message.from? true:false)" :image="getUserPicture(message.from)" :reactions="message.reactions"></Message>
          </div>
        </div>

        <div class="conversation-footer">
          <div class="wrapper">
            <div class="ui fluid search">
              <div class="ui icon input">
                <input
                  v-model="messageContent"
                  class="prompt"
                  type="text"
                  placeholder="Rédiger un message"
                  @keyup.enter="
                    postMessage({
                      conversation_id: conversation.id,
                      messageContent: messageContent
                    }),
                      clearInput()
                  "
                />
                <i class="send icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="conversation-sidebar" v-if="groupPanel">
        <Group :conversation="conversation" />
      </div>
    </div>
  </div>
</template>

<script>
import Group from "@/components/Group/Group";
import { mapActions, mapGetters } from "vuex";
import Message from "../Message/Message";

export default {
  name: "Conversation",
  components: { Message, Group },
  data() {
    return {
      groupPanel: false,
      messageContent: ""
    };
  },
  mounted() {
    this.scrollBottom();
  },
  updated() {
    this.scrollBottom();
  },
  computed: {
    ...mapGetters(["conversation", "users", "messages", "user"])
  },
  methods: {
    ...mapActions(["postMessage"]),
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

    getDate(date) {
      let localDate = new Date(date);
      return (
        localDate.getHours() +
        ":" +
        localDate.getMinutes() +
        ":" +
        localDate.getSeconds()
      );
    },

    clearInput() { this.messageContent = ""; }
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
