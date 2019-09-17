<template>
    <div id="dseSearchInput">
        <el-input v-model="keyname" :placeholder="placeholder_"></el-input><el-button @click="search" type="primary">搜索</el-button>
    </div>
</template>

<script>

    /**
     *   带有 可点击按钮的 搜索框
     *
     */

    export default {
        name: 'DseSearchInput',
        props:{
            placeholder_:{
                type:String,
                defaultProps:'请输入关键字'
            }
        },
        data(){
            return{
                keyname:''
            };
        },
        methods:{
            search(){
                let temp_keyname = this.keyname;
                this.$emit('search',temp_keyname);
            }
        }
    };
</script>

<style scoped lang="scss">
    #dseSearchInput{
        height: 30px;
        line-height: 30px;
        /deep/ .el-input{
            width: 200px;
          /deep/  .el-input__inner{
                border-right: none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
        /deep/ button.el-button{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }







    }
</style>
