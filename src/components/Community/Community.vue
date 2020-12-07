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
                            :class="[isSelected(user) ? 'selected user' : 'user']"
                            @click="toggleSelected(user)"
                    >
                        <img :src="user.picture_url"/><span class="">{{
              user.username
            }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <button class="ui primary big button" @click="openConversation">
                <i class="conversation icon"></i>
                <span v-if="opening">Ouverture ...</span>
                <span v-else>Ouvrir la conversation</span>
            </button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Community",
        data() {
            return {
                selectedUser: [],
                selected: false,
                search: "",
                opening: false
            };
        },
        methods: {
            ...mapActions(["createOneToOneConversation", "createManyToManyConversation"]),
            openConversation() {
                if (this.opening === true) {
                    return
                }

                if (this.selectedUser.length === 1) {
                    console.log(this.selectedUser[0]);
                    let promise = this.createOneToOneConversation(
                        this.selectedUser[0]
                    );
                    promise.finally(() => {
                    });
                }
                if (this.selectedUser.length > 1) {
                    let promise = this.createManyToManyConversation(
                        this.selectedUser
                    );
                    promise.finally(() => {
                    });
                }
                this.opening = false
            },
            isSelected(user) {
                console.log("is selected");
                return this.selectedUser.includes(user.username);
            },
            toggleSelected(user) {
                //console.log(this.selectedUser.includes(user.username));
                if (!this.selectedUser.includes(user.username)) {
                    this.selectedUser.push(user.username);
                } else {
                    const newUserTab = this.selectedUser.filter(us => us !== user.username);
                    this.selectedUser = newUserTab;
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
