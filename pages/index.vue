<template>
  <div class="post-list">
    <div class="top">
      <h2 class="post-list__title">Post List</h2>
      <button @click="showModal = !showModal" class="post-list__add-btn">Add Button</button>
     
    </div>
    
    <!-- Modal for adding new post -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="showModal = !showModal" class="close">&times;</span>
        <h2 class="modal-title">Add New Post</h2>
        <div class="box"> 
          <input type="text" v-model="newPost.title" id="newTitle" class="modal-input post-list__update-input" placeholder="Title">

          <textarea v-model="newPost.body" id="newBody" class="modal-textarea post-list__update-input" placeholder="Body"></textarea>

        </div>
        <button @click="addPost" class="post-list__add-btn">Add</button>
        <button @click="showModal = !showModal" class="post-list__cancel-btn">Close</button>
      </div>
    </div>
    
    <div v-if="selectedPost" class="post-list__update">
      <h2 class="post-list__update-title">Update Post</h2>
      <label for="updatedTitle" class="post-list__update-label">Title:</label>
      <input type="text" v-model="updatedPost.title" id="updatedTitle" class="post-list__update-input">
      <label for="updatedBody" class="post-list__update-label">Body:</label>
      <textarea v-model="updatedPost.body" id="updatedBody" class="post-list__update-textarea"></textarea>
      <button @click="updatePost" class="post-list__update-btn">Update</button>
      <button @click="deletePost" class="post-list__delete-btn">Delete</button>
      <button @click="closeUpdateField" class="post-list__cancel-btn">Cancel</button>
    </div>
    
    <ul class="post-list__items">
      <li v-for="post in posts" :key="post.id" @click="openUpdateField(post)" class="post-list__item">
        <h3 class="post-list__item-title">{{ post.title }}</h3>
        <p class="post-list__item-body">{{ post.body }}</p>
        <p class="post-list__item-body">{{ post._id }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      selectedPost: null,
      deleteId : '',
      showModal : false,
      updatedPost: {
        _id : '',
        title: '',
        body: ''
      },
      newPost: {
        title: '',
        body: ''
      }
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
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
      this.selectedPost = post;
      this.deleteId = post._id || '';
      this.updatedPost._id = post._id || '';
      this.updatedPost.title = post.title || '';
      this.updatedPost.body = post.body || '';
    },


    closeUpdateField() {
      this.selectedPost = null;
    },


    async deletePost() {
      try {
        const response = await fetch(`/api/posts/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.deleteId)
        });

        this.fetchPosts();
        this.closeUpdateField();

      } catch (error) {
        console.error(error);
      }
    },
    async updatePost() {
      try {
        const response = await fetch(`/api/posts/${this.selectedPost.id}`, {
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
        const response = await fetch(`/api/posts/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newPost)
        });
        this.newPost.title = "";
        this.newPost.body = '';
        this.fetchPosts();  
        this.showModal = false;
      } catch (error) {
        console.error(error);
      }
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

.box{
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
  padding: 20px;
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

top{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height : 40px 
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
.post-list__cancel-btn ,
.post-list__delete-btn{
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
</style>