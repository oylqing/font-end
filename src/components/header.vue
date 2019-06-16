<template>
<div>
    <div id="title" v-text="title">
    </div>
    <div id="line">
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            title: this.Config.title
        }
    }
}
</script>
<style lang="less">
#title{
    text-align: center;
    font-size: 36px;
    font-weight: bold;
}
#line{
    height: 2px;
    width: 100%;
    background-color: #888;
    margin-top: 2px;
}
</style>

