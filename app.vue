<template>
  <div id="app">
    <textarea v-model="html"></textarea>
    <iframe :srcdoc="html"></iframe>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      html: "<h1>Hello I am H1 block</h1>",
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
