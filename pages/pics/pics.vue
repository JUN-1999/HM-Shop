<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view v-for="(item,index) in cates" :key="item.id" @click="changIndex(index,item.id)" :class="currentIndex === index ? 'active' : ' ' ">{{item.title}}</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="item in secondData" :key="item.id">
				<image @click="preview(item.img_url)" :src="item.img_url"></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="secondData.length==0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates: [],
				currentIndex: 0,
				secondData: []
			}
		},
		onLoad() {
			this.getPicsCate()
			this.changIndex(0, 14)
		},
		methods: {
			getPicsCate() {
				this.$myRequest({
					url: '/api/getimgcategory'
				}).then(res => {
					// console.log(res)
					this.cates = res.data.message
					this.changIndex(0, this.cates[0].id)
				})
			},
			changIndex(index, id) {
				this.currentIndex = index
				// 获取右侧的数据
				this.$myRequest({
					url: '/api/getimages/' + id
				}).then(res => {
					// console.log(res)
					this.secondData = res.data.message
				})
			},
			preview(current) {
				const urls = this.secondData.map(item => {
					return item.img_url
				})
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pics {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;

			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				background-color: $shop-color;
				color: #fff;
				border-top: 0px
			}
		}

		.right {
			height: 100%;
			width: 530rpx;
			margin: 0 auto;

			.item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}

				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}


		}

	}
</style>
