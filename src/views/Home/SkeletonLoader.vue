<template>
    <div v-for="item in 8">
        <div class="skeleton__loader" role="alert" aria-busy="true" aria-label="loading">
            <div class="circle"></div>
            <div class="mx-2"></div>
            <div>
                <div class="bar my-1"></div>
                
                <div class="short my-1"></div> 
            </div>
        </div>
    </div>
</template>

<style>

.skeleton__loader {
  display: flex;
  padding: 10px 20px;
}

.circle {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.bar {
  width: 150px;
  height: 20px;
  border-radius: 10px;
}

.short {
    border-radius: 10px;
  width: 130px;
  height: 20px;
}


/* Animation */
@keyframes pulse {
  from {
    background-color: rgb(233, 233, 233);
  }
  to {
    background-color: rgb(209, 209, 209);
  }
}

.skeleton__loader > .circle, .bar, .short {
  animation:
    pulse 700ms infinite alternate;
}
</style>