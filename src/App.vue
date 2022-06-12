<script setup lang="ts">

</script>

<template>
  <div class="container">
    <header id="container-header" class="menu">
      <ul>
        <li>
          <router-link to="/">/</router-link>
        </li>
        <li>
          <router-link to="/chat">/chat</router-link>
        </li>
      </ul>
    </header>
    <router-view id="container-view"></router-view>
    <footer id="container-footer">
      Follow me on <a href="https://github.com/LucienShui" target="_blank">GitHub</a>
    </footer>
  </div>
</template>

<style>

</style>
