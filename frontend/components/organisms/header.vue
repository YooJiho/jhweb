<template>
    <section>
        <v-app-bar 
            app 
            color="#fff"   
        >
            <v-container>
                <v-row>
                    <v-col cols="3"><h1>JHWeb</h1></v-col>
                    <v-col cols="9" class="text-right">
                        <v-btn v-for="link in links" :key="link" text>{{ link }}</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
    </section>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Header extends Vue {
    links: string[] = ['Intro', 'Wiki', 'Etc' ]
}
</script>
