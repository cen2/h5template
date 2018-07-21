<template>
    <div class="demo">
        <img :src="logo" alt="">
    </div>
</template>

<script>
    import logo from './logo.png'

    export default {
        data() {
            return {
                logo
            }
        }
    }
</script>

<style lang="less">
    .demo {
        img{
            display: block;
            margin: 30px auto;
        }
    }
</style>