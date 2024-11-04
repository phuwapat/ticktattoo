<template >
    <div>
        <div class="footer">
            <p>Copyright © {{ currentYear }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'FooterComponent',
    computed: {
    currentYear() {
        return new Date().getFullYear();
        }
    }
}
</script>
<style scoped>
    .footer{
        text-align: center;
        padding: 10px;
        font-size: 1.2rem;
        color: white;
        background-color: black;
    }
</style>