<template>
<div class="">
    <div class="flex flex-row justify-between p-8">
        <h1 class="text-4xl font-thin">File Manager</h1>
        <div class="flex">
            <div v-if="folderFlag" class="flex flex-row">
                <input type="text" placeholder="New Folder" class="mx-4 rounded-lg border py-2 px-2" v-model="newFolder.name" @blur="addFolder" @keyup.enter="addFolder">
            </div>
            <button @click="toggleNewFolder" class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md">
                <div class="h-8 w-8 flex items-center justify-center bg-white rounded-full mr-2">
                    <svg class="h-5 w-5 text-blue-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 4v16m-8-8h16"></path>
                    </svg>
                </div>
                Add Folder
            </button>

        </div>
    </div>
</div>
</template>

  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            folderFlag: false,
            newFolder: {
                name: '',
                parent: '',
                type: ''
            }
        };
    },
    methods: {
        toggleNewFolder() {
            this.folderFlag = !this.folderFlag;
        },
        async addFolder() {
            
            if (this.newFolder.name.length === 0) {
                this.toggleNewFolder();
         
            } else {
                const route = useRoute()

                const parentID = route.params.Folder ? route.params.Folder.split("_")[1] : ''
                this.newFolder.parent = parentID

                const form = {
                    "name": this.newFolder.name,
                    "parent": this.newFolder.parent,
                    "type": "Folder"
                }
                const response = await axios.post(`/api/folders/save`, form);
                this.toggleNewFolder();

                if (response) {
                    location.reload()
                }
            }

        }
    }
}
</script>

  
<style>
/* Add your CSS styling here */
</style>
