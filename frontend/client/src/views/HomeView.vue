<template>
  <div class="container">
    <ImageCarousel />
    <div class="promo-container">
      <PromoCard
        v-for="(promo, index) in promotions"
        :key="index"
        :title="promo.title"
        :image="promo.image"
      />
    </div>
    <BooksByCategory category="Fiction" />
  </div>
</template>

<script>
import PromoCard from '@/components/PromoCard.vue';
import ImageCarousel from '@/components/ImageCarousel.vue';
import BooksByCategory from '../components/BooksByCategory.vue';

export default {
  name: 'HomeView',
  components: {
    PromoCard,
    ImageCarousel,
    BooksByCategory,
  },
  data() {
    return {
      promotions: [
        { title: 'THẾ GIỚI MÁY TÍNH CHÍNH HÃNG', image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/SmallBanner_T11_310x210_1.png' },
        { title: 'SÁCH HAY GIÁ TỐT', image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/Trang20_11_SmallBanner_T11_310x210_1.jpg' },
        { title: 'SÁCH HAY GIÁ TỐT', image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/Trang20_11_SmallBanner_T11_310x210_1.jpg' },
        { title: 'SÁCH HAY GIÁ TỐT', image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/Trang20_11_SmallBanner_T11_310x210_1.jpg' },

      ],
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.promo-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

</style>
