<template>
    <div id="app">

        <router-view></router-view>
    </div>
</template>

<script>
    //    import {DSE} from './moduleConfig';
    //    import DseToken from "./components/DseToken.vue";
    //    import DseUser from "./common/components/DseUser.vue";
    // import {DSE, userInfo} from './moduleConfig';

    export default {
        data() {
            return {
                opt: {},
                config: '',
                user: ''
            };
        },
        beforeCreate() {
            //
        },
        mounted() {
//            console.log(this.isCas);
        }
    };
</script>

<style lang="scss">
    @import "./common/styles/main.scss";

    @import './assets/css/pipeSetting_sites.scss';
</style>
