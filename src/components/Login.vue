<template>
    <Modal
        title="Login"
        v-model="modal10"
        class-name="vertical-center-modal">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>

<script>
    export default {
        name: "Login",
        props: {
            msg: String
        },
    }
</script>