<template>
	<view>
		<view v-for="item in newsList" @click="navigator(item.id)" :key="item.id" class="news_item">
			<image :src="item.img_url"></image>
			<view class="right">
				<view class="tit">
					{{item.title}}
				</view>
				<view class="info">
					<text>发表时间：{{item.add_time | formaDate}}</text>
					<text>浏览：{{item.click}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			"newsList": {
				type: Array,
				default: []
			}
		},
		filters: {
			formaDate(date) {
				const newdate = new Date(date)
				const year =newdate.getFullYear()
				const month=(newdate.getMonth()+1).toString().padStart(2,0)
				const day=newdate.getDate().toString().padStart(2,0)
				return year+'年'+month+'月'+day+'日'
			}
		},
		methods:{
			navigator(id){
				this.$emit('itemClick',id)
			}
		}
	}
</script>

<style lang="scss">
	.news_item {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid $shop-color;

		image {
			max-width: 200rpx;
			min-width: 200rpx;
			height: 150rpx;
		}

		.right {
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.tit {
				font-size: 30rpx;
			}

			.info {
				font-size: 24rpx;

				text:nth-child(2) {
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
