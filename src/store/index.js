import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticating: false,
    user: {
      username: null,
      token: null,
      picture_url: null
    },
    users: [],
    conversations: [],
    currentConversationId: null,
    usersAvailable: []
  },
  getters: {
    authenticating(state) {
      return state.authenticating;
    },
    authenticated(state) {
      return state.user.token !== null;
    },
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users.map(user => ({
        ...user
        //TODO
      }));
    },
    conversations(state) {
      return state.conversations.map(conversation => {
        return {
          ...conversation
          //TODO
        };
      });
    },
    conversation(state, getters) {
      return getters.conversations.find(element => element.id == state.currentConversationId);
    },
    messages(state, getters) {
      console.log(
        getters.conversation.messages
      );
      return (getters.conversation.messages = Vue.prototype.$client.on(
        "messagePosted"
      ));
    }
  },
  mutations: {
    syncCurrentConversation(state, conversationId) {
      state.currentConversationId = conversationId;
    },
    setAuthenticating(state, authenticating) {
      state.authenticating = authenticating;
    },
    setUser(state, { username, token, picture_url }) {
      Vue.set(state.user, "username", username);
      Vue.set(state.user, "token", token);
      Vue.set(state.user, "picture_url", picture_url);
    },
    setUsers(state, users) {
      state.users = users;
    },
    setConversations(state, conversations) {
      state.conversations = conversations;
    },

    upsertUser(state, { user }) {
      const localUserIndex = state.users.findIndex(
        _user => _user.username === user.username
      );

      if (localUserIndex !== -1) {
        Vue.set(state.users, localUserIndex, user);
      } else {
        state.users.push({
          ...user
        });
      }
    },

    upsertConversation(state, { conversation }) {
      const localConversation = state.conversations.findIndex(
          (_conversation) => _conversation.id === conversation.id
      );
      if (localConversation !== -1) {
        Vue.set(state.conversations, localConversation, conversation);
      } else {
        state.conversations.push({
          ...conversation
        });
      }
    },

    upsertMessage(state, context) {
      const conversation = state.conversations.find(
        conv => conv.id === context.conversation_id
      );

      if (conversation === undefined) { return; }
      else {
        conversation.messages.push(context.message);
      }
    },
    upsertReaction(state, context) {
      const conversation = state.conversations.find(
        conv => conv.id === context.conversation_id
      );

      if (conversation === undefined) { return; }
      else {
        conversation.messages[context.message.id].reactions = context.message.reactions;
      }
    },

    deleteMessage(state, context) {
      const conversation = state.conversations.find(
        conv => conv.id === context.conversation_id
      );

      const indexConversation = state.conversations.findIndex(
        conv => conv.id === context.conversation_id
      );

      if (conversation === undefined) { return; }
      else {
        console.log("Conversation : ", conversation);
        console.log("Context : ", context);
        var filteredConv = conversation.messages.filter(msg => msg.id !== context.message_id);
        //var filteredConv = conversation.messages.splice(context.message_id, 1);
        state.conversations[indexConversation].messages = filteredConv;
      }
    }
  },
  actions: {
    authenticate({ commit, dispatch }, { username, password }) {
      if (!username || !password) {
        return;
      }
      commit("setAuthenticating", true);
      Vue.prototype.$client
        .authenticate(username, password)
        .then(user => {
          commit("setUser", user);
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          dispatch("initializeAfterAuthentication");
        })
        .catch(() => {
          alert("Erreur d'authentification !");
        })
        .finally(() => {
          commit("setAuthenticating", false);
        });
    },

    deauthenticate() {
      localStorage.removeItem("password");
      window.location.reload();
    },

    initializeAfterAuthentication({ dispatch }) {
      dispatch("fetchUsers");
      dispatch("fetchConversations");
    },

    fetchUsers({ commit }) {
      Vue.prototype.$client.getUsers().then(({ users }) => {
        commit("setUsers", users);
      });
    },

    fetchConversations({ commit }) {
      Vue.prototype.$client.getConversations().then(({ conversations }) => {
        commit("setConversations", conversations);
      });
    },

    createOneToOneConversation({ commit }, username) {
      const promise = Vue.prototype.$client.getOrCreateOneToOneConversation(
        username
      );

      promise.then(({ conversation }) => {
        commit("upsertConversation", {
          conversation
        });
        router.push({
          name: "Conversation",
          params: { id: conversation.id }
        });
      });

      return promise;
    },

    createManyToManyConversation({ commit }, usernames) {
      const promise = Vue.prototype.$client.createManyToManyConversation(
        usernames
      );

      promise.then(({ conversation }) => {
        commit("upsertConversation", {
          conversation
        });

        router.push({
          name: "Conversation",
          params: { id: conversation.id }
        });
      });

      return promise;
    },

    postMessage({ commit }, { conversation_id, messageContent }) {
      const promise = Vue.prototype.$client.postMessage(
        conversation_id,
        messageContent
      );

      promise.then(context => {
        commit("upsertMessage", {
          context
        });
      });

      return promise;
    },

    addParticipant({ commit }, { conversation_id, participant }) {
      const promise = Vue.prototype.$client.addParticipant(
        conversation_id,
        participant
      );

      promise.then((conversation) => {
        commit("upsertConversation", { conversation })
      });

      return promise;
    },

    removeParticipant({ commit }, { conversationId, username }) {
      const promise = Vue.prototype.$client.removeParticipant(
        conversationId,
        username
      );

      promise.then(conversation => {
        commit("upsertConversation", {
          conversation
        });
      });

      return promise;
    },

    reaction({commit}, {conv_id, message_id, reaction}) {
      const promise = Vue.prototype.$client.reactMessage(
        conv_id,
        message_id,
        reaction
      );

      promise.then(conversation => {
        commit("upsertReaction", {
          conversation
        });
      });
    },

    deleteMessage({commit}, {conv_id, message_id}) {
      const promise = Vue.prototype.$client.deleteMessage(
        conv_id,
        message_id
      );

      promise.then(conversation => {
        commit("deleteMessage", {
          conversation
        })
      })
    }
  }
});
