<template>
    <div id="app" class="container">
        <Header/>
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";
    export default {
        components: {Footer, Header}
    }

</script>

<style scoped>

</style>
