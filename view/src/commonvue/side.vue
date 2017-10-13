<style scoped lang="sass">
	.left-nav{
		color:#babcc4;
		border-top:solid 1px #494b50;
		.nav-item{
			position:relative;
		}
		.nav-title{
			line-height: 45px;
			padding: 0 10px;
			cursor: pointer;
			font-size:14px;
			border-bottom:solid 1px #494b50;
			span{
				margin-right:6px;
			}
			span:nth-child(1){
			}
		}
		.nav-title:hover{
			span{
				color:#fff;
			}
		}
		.nav-box, .nav-box-two{
			display: none;
			margin: 0;
			padding: 0;
			list-style: none;
			background: #2b2f3c;
			.nav-list{
				text-align: left;
				font-size:12px;
				line-height: 40px;
				a, p{
					padding: 0 20px;
					overflow: hidden;
					display: block;
					text-decoration: none;
					display: block;
					color:#babcc4;
					span{
						float: right;
					}
					&:hover{
						color:#fff;
					}
					&:last-child{
					}
				}
			}
			.cur{
				background:#31333c;
				a{
					color:#fff;
					font-weight:bold;
				}
			}
		}
		.open{
			.nav-box {
				display: block;
			}
			.nav-title {
				color:#fff;
				span{
					color:#fff;
				}
			}
		}
		.mouserover{
			.nav-title {
				span{
				}
			}
		}
		.openslide {
			.nav-title {
				color:#fff;
				span{
					color:#fff;
				}
			}
		}
		.nav-list-two {
			span {
				transition: all .5s;
			}
		}
		.showul {
			span {
				transform:rotateZ(90deg);
			}
		}
		.nav-box-two {
			display: none;
			a {
				padding:0 20px 0 40px  !important;
				border-bottom:none !important;
				border-top:1px solid #d5d6d8;
			}
		}
		.slideUl{
			display:block;
			position: absolute;
		    width: 220px;
		    top:0;
		    left: 45px;
		    z-index: 100;
		}
		.slideUl li:nth-child(1){
			margin-left:-1px;
		}
	}
</style>

<template>
	<div class="left-nav " id="left-nav">
		<div class="nav-item" :class="{'open' : isProject}">
			<div class="nav-title">
				<router-link :to="{name:'projectList'}" tag='span'>
					<span class="iconfont" aria-hidden="true">&#xe625;</span>
					<span class="title" v-show="!leftBarToggle">项目列表</span>
				</router-link>
			</div>
		</div>
		<div class="nav-item" :class="{'open' : isIndex}">
			<div class="nav-title">
				<span class="iconfont" aria-hidden="true">&#xe625;</span>
				<span class="title" v-show="!leftBarToggle">用户管理</span>
			</div>
			<ul class="nav-box">
				<li v-if="user.type=='admin'" class="nav-list" :class="{'cur' : $route.name == 'userList'}">
					<router-link :to="{name:'userList'}">用户列表</router-link>
				</li>
				<li class="nav-list" :class="{'cur' : $route.name == 'userUpdatePass'}">
					<router-link :to="{name:'userUpdatePass'}">密码修改</router-link>
				</li>
			</ul>
		</div>
		<!-- <div class="nav-item" :class="{'open' : isOrder}">
			<div class="nav-title">
				<span class="iconfont" aria-hidden="true">&#xe62e;</span>
				<span class="title" v-show="!leftBarToggle">首页DEMO</span>
			</div>
			<ul class="nav-box">
				<li class="nav-list" :class="{'cur' : $route.name == 'order'}">
					<a href="#!/order/indexdemo">
						首页DEMO
					</a>	
				</li>
				<li class="nav-list" :class="{'cur' : $route.name == 'orderdemo'}">
					<a href="#!/order/indexdemo">
						首页UI
					</a>
				</li>
			</ul>
		</div> -->
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import propsync from 'common/lib/mixin/propsync'
	
	module.exports={
		data(){
			return {
				isIndex:false,
				isProject:false,
				user:{},
			}
		},
		// props:{
		// 	leftBarToggle:{
		// 		type:null,
		// 		toWay:true,
		// 		default:false
		// 	}
		// },
		computed: {
            ...mapState({
                leftBarToggle: state => state.catalog.leftBarToggle,
            })
        },
		mixins: [propsync],
		watch: {
		    $route () {
		    	this.isIndex=/^index\W*/.test(this.$route.name);
		    	this.isProject=/^project\W*/.test(this.$route.name);
		    }
		},
		mounted() {
			// 保证 this.$el 已经插入文档
		  	this.$nextTick(()=>{
				this.user=util.getStorage('local','userMsg')?JSON.parse(util.getStorage('local','userMsg')):''

				var This=this;
				$(".left-nav").on("click", ".nav-title", function(){
					//展开导航
					$(this).parent('.nav-item').addClass('openslide').siblings().removeClass('openslide open');
					if(!This.leftBarToggle){	
						$(this).parent('.nav-item').find('.nav-box').slideToggle().end().siblings().find('.nav-box').slideUp();
						$(this).parent('.nav-item').find('.nav-box-two').slideUp().end().find('.showul').removeClass('showul');
					}
				});
				$(".left-nav").on("click", ".nav-list-two", function(){
					//展开导航
					$(this).toggleClass('showul').next().stop().slideToggle();
					$(this).parent().siblings().find('ul').slideUp();
				});

				//移入时效果
				$(".nav-item").on("mouseenter",function(){
					if(This.leftBarToggle){
						$('#left').css({overflow:'visible'})
						$('#left-nav').find('.nav-item').removeClass('mouserover')
						$(this).addClass('mouserover')
						$('#left-nav').find('ul').hide();
						$(this).find('ul.nav-box').addClass('slideUl').show();
					}
				})
				// //移出时效果
				$(".nav-item").on("mouseleave", function(){
					var _this=this;
					if(This.leftBarToggle){
						setTimeout(function(){
							$(_this).removeClass('mouserover')
							$(_this).find('ul.nav-box').hide();
						}, 10);
					}
				})

				/*----------------------------处理移动端---------------------*/
				$('#left li a').click(function(){
					if($(window).width()<768) {
						if($(this).find('a')) {
							$('#left').css('left',-220);
						}
					}
				});
				$(window).on('resize',function(){
					if($(window).width()>768) {
						$('#left').css('left',0);
					}else {
						$('#left').css('left',-220);
					}
				});
		  	})
		},
	}
</script>