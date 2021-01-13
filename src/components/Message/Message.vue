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
                    <i title="Supprimer" class="circular trash icon"></i>
                    <i title="Editer" class="circular edit icon"></i>
                    <i title="Répondre" class="circular reply icon"></i>
                </div>
                <div v-else>
                    <i title="Répondre" class="circular reply icon"></i>
                    <span class="react">
                        <i 
                            title="Aimer" 
                            class="circular heart outline icon">
                        </i>
                        <i
                            title="Pouce en l'air"
                            class="circular thumbs up outline icon">
                        </i>
                        <i
                            title="Content"
                            class="circular smile outline icon">
                        </i>
                        <i
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
    export default {
        props: {
            content: String,
            time: String,
            mine: Boolean,
            image: String,
            reactions: Object
        }
    };
</script>

<style src="./Message.css" scoped />
