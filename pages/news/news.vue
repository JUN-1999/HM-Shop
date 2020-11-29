<template>
	<view class="news">
		<news-item @itemClick="goDetail" :newsList="newsList" />
	</view>
</template>

<script>
	import newsItem from "../../components/newsItem/newsItem.vue"
	export default {
		data() {
			return {
				newsList: []
			}
		},
		methods: {
			getNews() {
				this.$myRequest({
					url: '/api/getnewslist'
				}).then(res => {
					this.newsList = res.data.message
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id=' + id
				})
			}
		},
		components: {
			newsItem
		},
		onLoad() {
			this.getNews()
		}
	}
</script>

<style lang="scss">
	.news {}
</style>
