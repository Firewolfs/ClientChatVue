<template>
  <div class="community">
    <div class="filter">
      <div class="ui fluid search">
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Rechercher un utilisateur"
            v-model="search"
          />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <div>
      <div class="users">
        <div v-for="(user, index) in filteredUsers" :key="index">
          <div
            :class="[isSelected(user) ? 'selected user': 'user']"
            @click="toggleSelected(user)"
          >
            <img :src="user.picture_url" /><span class="">{{
              user.username
            }}</span>
          </div>
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
    return {
      selectedUser: [],
      selected: false,
      search: ""
    };
  },
  methods: {
    ...mapActions(["createOneToOneConversation"]),
    openConversation() {
      let promise = this.createOneToOneConversation("Alice");

      promise.finally(() => {
        console.log("Conversation ouverte !");
      });
    },
    isSelected(user) {
      console.log("is selected");
      return this.selectedUser.includes(user.username);
    },
    toggleSelected(user) {
      console.log("Toggle Selected");
      console.log(user);
      //console.log(this.selectedUser.includes(user.username));
      if(!this.selectedUser.includes(user.username)) {
        console.log("add selected user");
        this.selectedUser.push(user.username);
        console.log(this.selectedUser);
      }
      else {
        console.log("delete selected user");
        const newUserTab = this.selectedUser.filter(us => us !== user.username);
        this.selectedUser = newUserTab;
        console.log(this.selectedUser);
      }
      //console.log(this.selectedUser.includes(user.username));
      
    }
  },
  computed: {
    ...mapGetters(["users"]),
    filteredUsers() {
      let filteredUsers = this.users;

      filteredUsers = filteredUsers.filter(user =>
        user.username.toLowerCase().includes(this.search.toLowerCase())
      );

      return filteredUsers;
    }
  }
};
</script>

<style src="./Community.css" scoped/>
