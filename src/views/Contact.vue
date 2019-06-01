<template>
    <main>
        <h1 id="get-in-touch">Message Board</h1>
        <form @submit="onSubmit">
            <label><input v-model="form.name" type="text" placeholder="name*:"/></label>
            <label><input v-model="form.email" type="email" placeholder="email*:"/></label>
            <label><input v-model="form.url" type="url" placeholder="url:"/></label>
            <label><textarea v-model="form.text" rows="5" placeholder="text*:"></textarea></label>
            <input type="submit" value="[ submit ]" />
        </form>
    </main>
</template>

<script>
    export default {
        name: "Contact",
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    url: '',
                    text: ''
                }
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault();
                alert('还在建设中');
            }
        }
    }
</script>

<style scoped>

</style>
