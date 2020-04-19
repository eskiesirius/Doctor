<template>
  <div id="ecommerce-wishlist-demo">
        <div class="items-grid-view vx-row match-height" v-if="favoriteListitems.length" appear>
            <div class="vx-col lg:w-1/4 md:w-1/3 sm:w-1/2 w-full" v-for="item in favoriteListitems" :key="item.objectID">

                <item-grid-view :item="item">

                    <!-- SLOT: ACTION BUTTONS -->
                    <template slot="action-buttons">
                        <div class="flex flex-wrap">

                            <!-- PRIMARY BUTTON : REMOVE -->
                            <div
                                class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                                @click="removeItemFromFavoriteList(item)">
                                <feather-icon icon="XIcon" svgClasses="h-4 w-4" />

                                <span class="text-sm font-semibold ml-2">REMOVE</span>
                            </div>

                            <!-- SECONDARY BUTTON: MOVE TO CART -->
                            <div
                                class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                                @click="chatDoctor(item)">
                                <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                                <span class="text-sm font-semibold ml-2">ASK FOR CONSULTATION</span>
                            </div>
                        </div>
                    </template>
                </item-grid-view>

            </div>
        </div>

        <!-- IF NO ITEMS IN CART -->
        <vx-card title="You don't have any items in your favorite list." v-else>
            <vs-button @click="$router.push({ name: 'doctors' }).catch(() => {})">Browse Doctors</vs-button>
        </vx-card>
  </div>
</template>

<script>
const ItemGridView = () => import('./components/ItemGridView.vue')

export default {
  components: {
    ItemGridView
  },
  computed: {
    favoriteListitems () {
      return this.$store.state.doctors_list.favoriteList.slice().reverse()
    },
    isInFavoriteList () {
      return (itemId) => this.$store.getters['doctors_list/isInFavoriteList'](itemId)
    }
  },
  methods: {
    removeItemFromFavoriteList (item) {
      this.$store.dispatch('doctors_list/toggleItemInFavoriteList', item)
    },
    chatDoctor(item){
        this.$router.push({name: 'chat', params: item})
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
#ecommerce-wishlist-demo {
    .item-view-primary-action-btn {
        color: #2c2c2c !important;
        background-color: #f6f6f6;
        min-width: 50%;
    }

    .item-view-secondary-action-btn {
        min-width: 50%;
    }
}
</style>
