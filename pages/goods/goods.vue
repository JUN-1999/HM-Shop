<template>
	<view class="goods_list">
		<goods-list @goodsItemClick="goGoodsDetail" :goods="goods"></goods-list>
		<view class="isOver" v-if="flag">
			----------到底了------------
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList/goodsList.vue'
	export default {
		data() {
			return {
				pageindex: 1,
				goods: [],
				flag: false
			}
		},
		components: {
			goodsList
		},
		methods: {
			// 获取商品列表的数据
			getGoodsList(callback) {
				this.$myRequest({
					url: '/api/getgoods?pageindex=' + this.pageindex
				}).then(res => {
					this.goods = [...this.goods, ...res.data.message],
					callback && callback()
				})
			},
			// 跳转到商品详情页
			goGoodsDetail(id) {
				// console.log(id)
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id='+id
				})
			}
		},
		onLoad() {
			this.getGoodsList()
		},
		// 触底函数
		onReachBottom() {
			console.log(this.goods.length)
			if (this.goods.length < this.pageindex * 10) return this.flag = true
			this.pageindex++;
			this.getGoodsList();
		},
		// 触发下拉刷新函数
		onPullDownRefresh() {
			// console.log('下拉刷新了')
			this.pageindex = 1,
				this.goods = [],
				this.flag = false,
				this.getGoodsList(()=>{
					uni.stopPullDownRefresh()
				})
		}
	}
</script>

<style lang="scss">
	.goods_list {
		background-color: #eee;

	}

	.isOver {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 28rpx;
	}
</style>
