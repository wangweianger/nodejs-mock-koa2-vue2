<style scoped lang="sass">
	.brank_nav{
		font-size:14px;
		color:#88898c;
		border-bottom:solid 1px #eceaea;
		padding-bottom:10px;
		a{
			color:#333;
			color:#88898c;
		}
		li{
			display:inline-block;
		}
	}
</style>
<template>
  <ol class="brank_nav mt10">
    <li><a href="/#/">首页 / </a></li>
    <slot name="nav_two"></slot>
    <slot name="nav_other"></slot>
    <li>{{$route.meta.title}}</li>
</ol>
</template>