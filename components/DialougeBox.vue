<template>
    <div class="dialog-overlay">
      <div class="dialog">
        <h2>Update Post</h2>
        <label for="title">Title:</label>
        <input type="text" v-model="updatedPost.title" id="title">
        <label for="body">Body:</label>
        <textarea v-model="updatedPost.body" id="body"></textarea>
        <button @click="updatePost">Update</button>
        <button @click="closeDialog">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: Object // The post to be updated
    },
    data() {
      return {
        updatedPost: { ...this.post } // Use a copy of the post for editing
      };
    },
    methods: {
      updatePost() {
        // Implement the update logic here
        // For example, you can make a fetch request to update the post on the server
        console.log("Updated post:", this.updatedPost);
        this.$emit('close'); // Emit close event to close the dialog
      },
      closeDialog() {
        this.$emit('close'); // Emit close event to close the dialog
      }
    }
  };
  </script>
  
  <style scoped>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog {
    background: white;
    padding: 20px;
    border-radius: 5px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  </style>
+  