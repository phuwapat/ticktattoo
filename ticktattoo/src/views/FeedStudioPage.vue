
<template>
    <div class="container-feed">
        <section class="title-s">
            <div class="title-page bg-use-grey block p-4">
                <h1 class="text-2xl ml-4 font-medium">Studio Recommended</h1>
            </div>
        </section>
        <section class="categorie-s">
            <CategoriesPage/>
        </section>
        <section class="feed-s">
            <FeedFrameST/>
        </section>
    </div>
</template>
<script>
import CategoriesPage from '@/components/CategoriesPage.vue';
import FeedFrameST from '@/components/FeedFrameST.vue';


export default {
    name:'FeedStudioPage',
    components:{
        CategoriesPage,
        FeedFrameST
    },
};
</script>
<style scoped>
    .container-feed{
        width: 100%;
        height: 100vh;
        scroll-snap-type: y mandatory;
    }
</style>