<template>

<div  class=" flex items-center w-full max-w-xs p-4 flex-col text-black bg-use-grey rounded-lg shadow  " role="alert">
    <h1 class="text-xl font-bold mb-1 border-b-2 border-black w-full text-center">Notification</h1>
    <div class="flex flex-row">
        <div class="flex w-3/4 text-sm  break-words">{{ props.message }}</div>
        <div class="flex flex-col items-center w-2/4"> 
            <div class="text-center text-lg w-full border-b-2 border-black">Date</div> 
            <div class="text-center w-full">{{props.date}}</div> 
            <div class="text-center w-full">
                <button @click="handleCancel" class="bg-red-600 text-white rounded-md text-sm p-1 w-full" v-if="props.state == 'active'">
                    Click for cancel
                </button>
                <button @click="handleRating" class="bg-yellow-500 text-white rounded-md text-sm p-1 w-full" v-if="props.state == 'finish'">
                    Rating
                </button>
            </div> 
        </div>
    </div>
    <div class="align-text-left w-full text-left">Name : {{props.name}}</div>
    <button @click="handleRemove" type="button" class="absolute right-3 ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-use-grey dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
    <RatingStar
  v-if="showRating"
:message="props.message"
:date="props.date"
:name="props.name"
:state="props.state"
:studioId= "props.UserID"
  @closeModal="showRating = false"
  @finish="handleFinish"
  @hideNotification="handleNotification"
/>
</div>

</template>
<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import RatingStar from './RatingStar'
import axios from 'axios';
const props = defineProps({
    message: {
        type:String
    },
    date: {
        type:String
    },
    name: {
        type:String
    },
    state: {
        type:String
    },
    studioId: {
        type:String
    }
})
const emit = defineEmits(['remove', 'hide'])
// console.log(props)
const showRating = ref(false)
const store = useStore();

const bookingID = store.state.items?.find(item => item.name === props.name)?.id;
// const items = store.state.items
const handleCancel = async () => {
    handleNotification();
    
    try {
        const response = await axios.delete(`/studio/bookings/${bookingID}`);

        console.log("Response from backend:", response.data);

        emit('remove'); 
    } catch (error) {
        console.error("Error sending request to backend:", error);
    }
};

const handleRating = () => {
    console.log("Rating button clicked ", showRating.value);
    showRating.value = true;
    console.log(store.state.items)
    // handleNotification()
};
const handleFinish = () =>{
    emit('remove')
}  
const handleNotification = () => {
    emit('hide')
    // console.log('hide')
}
const handleRemove = () => {
    emit('remove')
    handleNotification()
}
onMounted(async () => {

    // Fetch notifications when the component mounts
    await store.dispatch('fetchNotifications');
    console.log('Store state items after fetch:', store.state);
});
</script>
<script>
export default {
    name:'NotificationComponent',
}
</script>
<style scoped>
    .toast-alert {
        background-color: white !important;
}

</style>