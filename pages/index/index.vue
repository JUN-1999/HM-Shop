<template>
	<view class="index">
		<!-- 轮播图区域 -->
		<swiper indicator-dots circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav-item" v-for="(item,index) in navs" :key="index" @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 推荐商品区域 -->
		<view class="hot_goods">
			<view class="tit"> 推荐商品 </view>
			<goods-list @goodsItemClick="goGoodsDetail" :goods="goods"></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList/goodsList.vue'

	export default {
		data() {
			return {
				swipers: [],
				goods: [],
				navs: [{
						icon: "iconfont icon-ziyuan",
						title: "黑马超市",
						path: "/pages/goods/goods"
					},
					{
						icon: "iconfont icon-guanyuwomen",
						title: "联系我们",
						path: "/pages/contact/contact"
					},
					{
						icon: "iconfont icon-tupian",
						title: "社区图片",
						path: "/pages/pics/pics"
					},
					{
						icon: "iconfont icon-shipin",
						title: "学习视频",
						path: "/pages/videos/videos"
					}
				]
			}
		},
		components: {
			goodsList
		},
		onLoad() {
			this.getSwipers(),
				this.getHotGoods()
		},
		methods: {
			// 获取轮播图的数据
			getSwipers() {
				// uni.request({
				// 	url: "http://localhost:8082/api/getlunbo",
				// 	success: res => {
				// 		if (res.data.status !== 0) {
				// 			return uni.showToast({
				// 				title: "获取数据失败"
				// 			})
				// 		}
				// 		this.swipers = res.data.message
				// 	}
				// })
				this.$myRequest({
					url: '/api/getlunbo'
				}).then(res => {
					// console.log(res)
					this.swipers = res.data.message
				})
			},
			// 获取热门商品列表数据

			getHotGoods() {
				this.$myRequest({
					url: '/api/getgoods?pageindex=1'
				}).then(res => {
					this.goods = res.data.message
				})
			},
			//导航点击的处理函数
			navItemClick(url) {
				uni.navigateTo({
					url
				})
			},
			// 跳转到商品详情页
			goGoodsDetail(id) {
				// console.log(id)
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;

			}
		}
	}

	.nav {
		display: flex;
		margin-top: 20rpx;

		.nav-item {
			flex: 1;
			text-align: center;

			view {
				width: 120rpx;
				height: 120rpx;
				background-color: $shop-color;
				border-radius: 50%;
				margin: 10rpx auto;
				line-height: 120rpx;
				color: #F8F8F8;
				font-size: 50rpx;
			}

			text {
				font-size: 30rpx;
			}
		}
	}

	.hot_goods {
		background-color: #eee;
		overflow: hidden;
		margin-top: 10px;

		.tit {
			height: 100rpx;
			line-height: 100rpx;
			color: $shop-color;
			text-align: center;
			letter-spacing: 40rpx;
			background-color: #fff;
			margin: 7rpx 0;
			font-weight: 900;
		}


	}
</style>
