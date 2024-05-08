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
export default {
    data() {
        return {
            newFolder: false,
            folderName: '',
            folders: []
        };
    },
    mounted() {
        this.fetchData()
    },
    methods: {
       onContextMenu () {
            console.log("Right Clicked")


  },
        toggleNewFolder() {
            this.newFolder = !this.newFolder;
        },
        addFolder() {
            if (this.folderName.trim() !== '') {
                this.folders.push(this.folderName.trim());
                this.folderName = '';
            }
            this.toggleNewFolder()
        },
        async fetchData() {
            try {
                const response = await fetch('/api/folders/');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                this.folders = await response.json();
            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>

<style>
/* Add your CSS styling here */
</style>
