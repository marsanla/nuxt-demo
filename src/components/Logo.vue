<template>
  <img class="brand" src="~/assets/logo.png" />
</template>
<style>
.brand {
  animation: 1s appear;
  margin: auto;
  height: 100%;
  vertical-align: top;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
