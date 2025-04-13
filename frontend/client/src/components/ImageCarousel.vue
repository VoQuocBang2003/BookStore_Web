<template>
  <div class="carousel">
    <div class="carousel-row">
      <div class="carousel-item single-image">
        <img :src="banners[0].image" alt="Banner Image" class="banner-image rounded-corners" />
      </div>
      <div class="carousel-item double-image">
        <img v-for="(banner, index) in banners.slice(1, 3)" :key="index" :src="banner.image" alt="Banner Image" class="banner-image equal-height rounded-corners" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  data() {
    return {
      banners: [
        { image: 'https://cdn0.fahasa.com/media/magentothem/banner7/MayTinh_Slide_T4_840x320_1.png' },
        { image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/392x156_vnpay_ngay_sale_t11.png' },
        { image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/shopee_T11_392x156.png' },
      ],
    };
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden; /* Changed from auto to hidden to prevent horizontal scrolling */
  margin-bottom: 20px; /* Added margin-bottom to the carousel */
}

.carousel-row {
  display: flex;
  width: 100%;
}

.carousel-item.single-image {
  flex: 0 0 70%;
  scroll-snap-align: start;
  margin-right: 10px; /* Added margin to the right of the first column */
}

.carousel-item.double-image {
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
}

.banner-image {
  width: 100%; /* Chiều rộng luôn bằng 100% container */
  height: 200px; /* Đặt chiều cao cố định */
  object-fit: cover; /* Giữ tỷ lệ hình ảnh và cắt phần thừa */
  margin-bottom: 10px;
  border-radius: 8px; /* Bo góc cho hình ảnh */
}


.banner-image:last-child {
  margin-bottom: 0;
}

.equal-height {
  height: 50%; /* Ensures both images in the double-image column have equal height */
  object-fit: cover; /* Ensures the image covers the allocated space */
}

.rounded-corners {
  border-radius: 8px; /* Ensures all images have rounded corners */
}
</style> 