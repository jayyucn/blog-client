<template>
    <el-carousel height="300px" type="card" indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
            <el-image class="img" fit="scale-down"
                src="https://gitee.com/jayyucn/static/raw/master/thumbnail/davies-designs-studio-f5_lfi2S-d4-unsplash.jpg"
                alt="Kitten" />
        </el-carousel-item>
    </el-carousel>
</template>
<style lang="scss" scoped>
.el-pagination {
    padding: 4px;
}

.el-carousel {
    background-color: var(--module-bg-light);
    @include border;
}

.img {
    padding: 8px;
}

.el-carousel__item h3 {
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: var(--module-bg-light);
}

// .el-carousel__item:nth-child(2n + 1) {}

.pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: $margin-default;
}
</style>