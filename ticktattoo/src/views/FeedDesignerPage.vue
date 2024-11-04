
<template>
    <div class="container-feed">
        <section class="title-s">
            <div class="title-page bg-use-grey block p-4">
                <h1 class="text-2xl ml-4 font-medium">Designer Recommended</h1>
            </div>
        </section>
        <section class="categorie-s">
            <CategoriesPage/>
        </section>
        <section class="feed-s">
            <FeedFrameDS/>
        </section>
    </div>
</template>
<script>
import CategoriesPage from '@/components/CategoriesPage.vue';
import FeedFrameDS from '@/components/FeedFrameDS.vue';


export default {
    name:'FeedDesignerPage',
    components:{
        CategoriesPage,
        FeedFrameDS
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