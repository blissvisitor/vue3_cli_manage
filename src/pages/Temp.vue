<template>
    <div id="temp"></div>
</template>

<script>
    export default {
        name: 'Temp',
        data() {
            return {
                staticPath: window.DSE.static_baseUrl
            }
        },
        mounted() {
            let that = this;
            if (!window.IE_flag){
                let flag = sessionStorage.getItem('loginFlag');
                if (!flag) {
                    that.$router.push({name: 'login'});
                }
            }
        }
    };
</script>

<style scoped>

</style>
