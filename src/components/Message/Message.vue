<template>
    <div>
        <div class="time">{{ time }}</div>
        <div :class="{message: true, mine: mine }">
            <img :src="image" />
            <div class="bubble top bottom">{{ content }}</div>
            <div class="reacts">
                <div v-for="reaction in reactions" :key="reaction">
                    <div v-show="reaction === 'HEART'">
                        <i 
                            title="Aimer" 
                            class="circular heart outline icon">
                        </i>
                    </div>
                    <div v-show="reaction === 'THUMB'">
                        <i 
                            title="Aimer" 
                            class="circular thumbs up outline icon">
                        </i>
                    </div>
                    <div v-show="reaction === 'HAPPY'">
                        <i 
                            title="Aimer" 
                            class="circular smile outline icon">
                        </i>
                    </div>
                    <div v-show="reaction === 'SAD'">
                        <i 
                            title="Aimer" 
                            class="circular frown outline icon">
                        </i>
                    </div>
                </div>
            </div>
            <div class="controls">
                <div v-if="mine">
                    <i v-on:click="deleteMessage({conv_id: conv_id, message_id: message_id})" title="Supprimer" class="circular trash icon"></i>
                    <i title="Editer" class="circular edit icon"></i>
                    <i title="Répondre" class="circular reply icon"></i>
                </div>
                <div v-else>
                    <i title="Répondre" class="circular reply icon"></i>
                    <span class="react">
                        <i 
                            v-on:click="reaction({conv_id: conv_id, message_id: message_id, reaction: 'HEART'})"
                            title="Aimer" 
                            class="circular heart outline icon">
                        </i>
                        <i
                            v-on:click="reaction({conv_id: conv_id, message_id: message_id, reaction: 'THUMB'})"
                            title="Pouce en l'air"
                            class="circular thumbs up outline icon">
                        </i>
                        <i
                            v-on:click="reaction({conv_id: conv_id, message_id: message_id, reaction: 'HAPPY'})"
                            title="Content"
                            class="circular smile outline icon">
                        </i>
                        <i
                            v-on:click="reaction({conv_id: conv_id, message_id: message_id, reaction: 'SAD'})"
                            title="Pas content"
                            class="circular frown outline icon">
                        </i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    export default {
        props: {
            message_id: Number,
            conv_id: Number,
            content: String,
            time: String,
            mine: Boolean,
            image: String,
            reactions: Object
        },
        methods: {
            ...mapActions(["reaction", "deleteMessage"])
        }
    };
</script>

<style src="./Message.css" scoped />
