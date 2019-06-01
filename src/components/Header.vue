<template>
    <header>
        <div class="menu">
            <ul>
                <li><router-link to="/">/</router-link></li>
                <li><router-link to="/intro">/intro</router-link></li>
                <li><router-link to="/friends">/friends</router-link></li>
                <li><router-link to="/blog">/blog</router-link></li>
                <li><router-link to="/pasteme">/pasteme</router-link></li>
            </ul>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>
