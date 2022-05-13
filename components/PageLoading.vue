<template>
    <div class="page-loading d-flex justify-center align-center">
        <div>
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageLoading'
    }
</script>
<style lang="scss">
    .page-loading {position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: rgba(255, 255, 255, 0.6);z-index: 200;}
</style>
