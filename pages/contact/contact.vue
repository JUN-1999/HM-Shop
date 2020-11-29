<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="phone"> 联系电话：xxx-xxx-xxxx（点击拨打） </view>
			<view> 校区地址：浙江省杭州市下沙区xx路xx号</view>
		</view>
		<map class="map" :scale="scale" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 120.086919,
				latitude: 28.656104,
				scale:15,
				markers:[
					{
						longitude: 120.086919,
						latitude: 28.656104,
						iconPath:'/static/hmlogo.png',
						width:30,
						height:30
					}
				]
			}
		},
		methods: {
phone(){
	uni.makePhoneCall({
		phoneNumber:'xxx-xxx-xxxx'
	})
}
		}
	}
</script>

<style lang="scss">
	.contact {
		.img {
			width: 750rpx;
			height: 320rpx;
		}

		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;

			view {
				line-height: 80rpx;
				border-bottom: 1px solid #eee;
			}
		}

		.map {
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
