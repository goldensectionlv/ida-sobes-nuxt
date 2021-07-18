<template>
  <div>
    <basket/>
    <div class="main_container">
      <app_header
        class="app_header"
      />
      <app_title
        class="app_title"
      />
      <app_sidebar
        class="app_sidebar"
      />
      <div class="app_body">
        <Nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import app_header from "@/components/app_header";
import app_title from "@/components/app_title";
import app_sidebar from "@/components/app_sidebar";
import basket from "@/components/basket";

export default {
  components: {
    app_header,
    app_title,
    app_sidebar,
    basket
  },
  mounted() {
    this.$store.dispatch('basket/local_storage_request')
  }
}
</script>

<style lang="scss">

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.main_container {
  font-family: 'PT Sans', sans-serif;
  padding: 0 6.11vw;
  display: grid;
  grid-template-columns: minmax(11vw, 161px) 1fr;
  grid-template-rows: 66px minmax(33px, 66px) 1fr;
  grid-template-areas:
      "app_header app_header"
      "app_title app_title"
      "app_sidebar app_body";
}

.app_header {
  grid-area: app_header;
  @include flex-align-center-space-between;
  height: 66px;
  //border: 1px solid black
}

.app_title {
  grid-area: app_title;
  @include flex-align-center-space-between;
  width: 100%;
  padding-top: 25px;
  //border: 1px solid black
}

.app_sidebar {
  grid-area: app_sidebar;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  //border: 1px solid black
}

.app_body {
  grid-area: app_body;
  padding-top: 25px;
  //border: 1px solid black

}

@media (max-width: 500px) {
  .main_container {
    grid-template-rows: 66px minmax(33px, 66px) minmax(33px, auto) 1fr;
    grid-template-areas:
      "app_header app_header"
      "app_title app_title"
      "app_sidebar app_sidebar"
      "app_body app_body";
  }
}
</style>
