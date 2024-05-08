<template>
<div class="post-list ">
    <div class="top">
        <h2 class="post-list__title">Photo Gallery</h2>
        <div class="m-4 flex">
            <button @click="toggleModal" class="post-list__add-btn">Add Image</button>
            <div v-if="posts.length > 0">
                <button @click="toggleDeleteMode" class="ml-4 text-white bg-green-500 px-4 py-2 rounded-md">
                    {{ deleteMultiple ? "Cancel" : "Delete Multiple" }}
                </button>
                <button v-if="deleteMultiple && anyCheckboxSelected" @click="deletePost(selectedCheckboxes)" class="ml-4 text-white bg-red-500 px-4 py-2 rounded-md">
                    Delete Selected
                </button>
            </div>
        </div>
    </div>

    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <span @click="toggleModal" class="close">&times;</span>
            
            <h2 class="modal-title">Add New Post</h2>
            
            <div class="box">
                <input type="text" v-model="newPost.title" id="newTitle" class="modal-input post-list__update-input" placeholder="Title">
                <textarea v-model="newPost.body" id="newBody" class="modal-textarea post-list__update-input" placeholder="Body"></textarea>
                <input type="file" @change="imageName" ref="fileInput" />
                <img :src="fileUrl" v-if="fileUrl" />
            </div>

            <button @click="addPost" class="post-list__add-btn">Add</button>
            
            <button @click="toggleModal" class="post-list__cancel-btn">Close</button>
        </div>
    </div>

    <div v-if="selectedPost" class="post-list__update">
        <h2 class="post-list__update-title">Update Post</h2>
        <label for="updatedTitle" class="post-list__update-label">Title:</label>
        <input type="text" v-model="updatedPost.title" id="updatedTitle" class="post-list__update-input">
        <label for="updatedBody" class="post-list__update-label">Body:</label>
        <textarea v-model="updatedPost.body" id="updatedBody" class="post-list__update-textarea"></textarea>
        <button @click="updatePost" class="post-list__update-btn">Update</button>
        <button @click="closeUpdateField" class="post-list__cancel-btn">Cancel</button>
    </div>

    <div v-for="post in posts" :key="post._id" class="flex flex-row justify-center items-center">
        <div v-if="deleteMultiple">
            <input id="default-checkbox" type="checkbox" v-model="selectedCheckboxes" :value="post._id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        </div>
        <div class="w-96  mx-4 bg-gray-100 mt-10 rounded-xl overflow-hidden shadow-md">
            <img class="w-96 h-96 object-cover object-center" :src="`${post.image}`" alt="Image">
            <div class="p-6">
                <div class="font-bold text-xl mb-2">{{post.title}}</div>
                <p class="text-gray-700 text-base">{{post.body}}</p>
                <div class="mt-4 flex justify-end">
                    <button @click="openUpdateField(post)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Edit</button>
                    <button @click="deletePost(post._id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            deleteMultiple: false,
            selectedCheckboxes: [],
            posts: [],
            file: null,
            fileUrl: null,
            selectedPost: null,
            deleteId: '',
            showModal: false,
            updatedPost: {
                _id: '',
                title: '',
                body: '',
                image: ''
            },
            newPost: {
                title: '',
                body: '',
                image: ''
            }
        };
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        anyCheckboxSelected() {
            return this.selectedCheckboxes.length > 0;
        }
    },
    methods: {
        toggleDeleteMode() {
            this.deleteMultiple = !this.deleteMultiple;
        },
        deleteSelected() {
            // Your logic to delete selected items
            console.log(this.selectedCheckboxes);
        },
        imageName() {
            this.file = this.$refs.fileInput.files[0];
            this.newPost.image = this.file;
            this.fileUrl = URL.createObjectURL(this.file);
        },
        async fetchPosts() {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                this.posts = await response.json();
            } catch (error) {
                console.error(error);
            }
        },
        openUpdateField(post) {
            console.log(this.file)
            this.selectedPost = post;
            this.deleteId = post._id || '';
            this.updatedPost._id = post._id || '';
            this.updatedPost.title = post.title || '';
            this.updatedPost.body = post.body || '';
        },
        closeUpdateField() {
            this.selectedPost = null;
        },
        async deletePost(post) {
            const data = post;
            try {
                const response = await fetch(`/api/posts/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                this.fetchPosts();
                this.toggleDeleteMode();
                this.closeUpdateField();

            } catch (error) {
                console.error(error);
            }
        },
        async updatePost() {
            try {
                const response = await fetch(`/api/posts/${this.selectedPost._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.updatedPost)
                });

                this.fetchPosts();
                this.closeUpdateField();

            } catch (error) {
                console.error(error);
            }
        },
        async addPost() {
            try {

                const formData = new FormData();

                // Generate a timestamp
                const timestamp = Date.now();
                console.log(timestamp)
                // Get the file extension
                const fileExtension = this.newPost.image.name.split('.').pop();

                // Create the new filename with the timestamp appended
                const newFileName = `image_${timestamp}.${fileExtension}`;

                // Append the renamed file to the FormData object
                formData.append('title', this.newPost.title);
                formData.append('body', this.newPost.body);
                formData.append('image', this.newPost.image, newFileName);

                const response = await fetch(`/api/posts/save`, {
                    method: 'POST',
                    body: formData
                });


                this.fetchPosts();

                this.newPost.title = "";
                this.newPost.body = '';
                this.fileUrl = ""
               
                this.showModal = false;

            } catch (error) {
                console.error(error);
            }
        },
        toggleModal() {
            this.showModal = !this.showModal;
        }
    }
};
</script>

<style scoped>
.post-list {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post-list__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.post-list__add-btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.post-list__add-btn:hover {
    background-color: #0056b3;
}

.box {
    height: 160px;
    width: 300px;
    display: flex;
    flex-direction: column;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 40PX;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

.modal-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px
}

.post-list {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.post-list__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.post-list__update {
    margin-bottom: 20px;
}

.post-list__update-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.post-list__update-label {
    display: block;
    margin-bottom: 5px;
}

.post-list__update-input,
.post-list__update-textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.post-list__update-btn,
.post-list__cancel-btn,
.post-list__delete-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.post-list__update-btn {
    background-color: #007bff;
    color: #fff;
    margin-right: 10px;
}

.post-list__delete-btn:hover {
    background-color: #b30000;
}

.post-list__delete-btn {
    background-color: #ff0000;
    color: #fff;
    margin-right: 10px;
}

.post-list__update-btn:hover {
    background-color: #0056b3;
}

.post-list__cancel-btn {
    background-color: #f8f9fa;
    color: #212529;
}

.post-list__cancel-btn:hover {
    background-color: #e2e6ea;
}

.post-list__items {
    list-style-type: none;
    padding: 0;
}

.post-list__item {
    cursor: pointer;
    margin-bottom: 20px;
}

.post-list__item-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}

.post-list__item-body {
    color: #666;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 40px;
    /* Adjust padding as needed */
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    /* Adjust max-width as needed */
    max-height: 80%;
    /* Adjust max-height as needed */
    overflow: auto;
    /* Add scrollbars if needed */
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

.modal-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

/* Additional Styles for Image in Modal */
.box {
    height: 430px;
    width: 300px;
    display: flex;
    flex-direction: column;
}

.box img {
    max-width: 100%;
    /* Ensure image fits within parent container */
    max-height: 100%;
    /* Ensure image fits within parent container */
    object-fit: contain;
    /* Maintain aspect ratio */
}
</style>
