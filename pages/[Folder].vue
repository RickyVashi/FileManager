<template>
    <div class="w-full flex flex-wrap m-4 overflow-hidden">
        <div v-for="(folder) in folders" :key="folder._id" @contextmenu.prevent="onContextMenu" class="flex-shrink-0 flex-grow-0 w-24 text-center m-4">
            <NuxtLink :to="`/${folder.name}_${folder._id}`" class="flex flex-col justify-center items-center">
                <img src="../public/photos/File Folder.webp" class="w-16 h-12">
                <span class="">{{ folder.name }}</span>
            </NuxtLink>
        </div>
    </div>
    
    </template>
    
    <script>
    import axios from 'axios';
    export default {
        data() {
            return {
                folders: [],
            };
        },
        mounted() {
            this.fetchChildData();
        },
        methods: {
            async fetchChildData() {
                const route = useRoute()
                const parentID = route.params.Folder.split("_")[1]
                console.log(parentID)

                try {
                    console.log("ijhjh");
                    const response = await axios.get(`/api/folders/${parentID}`)
                   
                    this.folders = response.data
                    console.log(this.folders);
                } catch (error) {
                    console.error("Error :- ",error);
                }
            },  
        }
    };
    </script>
    

    