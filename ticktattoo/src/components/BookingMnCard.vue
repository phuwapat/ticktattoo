<template>
  <div class="booking-card" v-if="status !== 'Canceled'">
    <div class="booking-info">
      <!-- <h3 class="booking-id">Booking ID: {{ numid }}</h3> -->
      <p class="booking-user">User: {{ userName }}</p>
      <p class="booking-status">Status: {{ displayStatus }}</p>
      <p class="booking-date">Date: {{ date }}</p>
    </div>
    <div class="actions" v-if="status === 'pending'">
      <button @click="handleApprove" class="approve-btn">Approve</button>
      <button @click="handleCancel" class="cancel-btn">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookingMnCard",
  props: {
    numid: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    displayStatus() {
      return this.status === "Approved" ? "Approved" : this.status;
    },
  },
  methods: {
    handleApprove() {
      console.log(`Booking ${this.numid} approved`);
      this.$emit("approve", this.numid);
      // Implement approve logic here
    },
    handleCancel() {
      console.log(`Booking ${this.numid} canceled`);
      this.$emit("cancel", this.numid);
      // Implement cancel logic here
    },
  },
};
</script>

<style scoped>
.booking-card {
  border: 2px solid #d4af37; /* Luxurious gold border */
  border-radius: 15px;
  padding: 30px;
  width: 300px;
  background: linear-gradient(
    145deg,
    #000000,
    #2e2e2e
  ); /* Dark and elegant background */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.booking-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
}

.booking-info {
  margin-bottom: 30px;
  color: #e0e0e0; /* Elegant, light text */
}

.booking-id {
  font-size: 1.5em;
  font-weight: 700;
  color: #d4af37; /* Luxurious gold color */
}

.booking-user,
.booking-status,
.booking-date {
  margin: 8px 0;
  font-size: 1.1em;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.approve-btn,
.cancel-btn {
  padding: 10px 15px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.approve-btn {
  background-color: #000000;
  border: 2px solid #3fd437;
  color: #3fd437;
}

.approve-btn:hover {
  background-color: #3fd437;
  color: #000000;
  box-shadow: 0 4px 10px rgba(55, 212, 68, 0.6);
}

.cancel-btn {
  background-color: #000000;
  border: 2px solid #f44336;
  color: #f44336;
}

.cancel-btn:hover {
  background-color: #f44336;
  color: #000000;
  box-shadow: 0 4px 10px rgba(244, 67, 54, 0.6);
}
</style>
