(function($){
"use strict"; // Start of use strict
//Slider Background
function background(){
	$('.bg-slider .item-slider').each(function(){
		var src=$(this).find('.banner-thumb a img').attr('src');
		$(this).css('background-image','url("'+src+'")');
	});
}
function animated(){
	$('.banner-slider .owl-item').each(function(){
		var check = $(this).hasClass('active');
		if(check==true){
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).addClass(anime);
			});
		}else{
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).removeClass(anime);
			});
		}
	});
	var owl = this;
	var visible = this.owl.visibleItems;
	var first_item = visible[0];
	var last_item = visible[visible.length-1];
	this.$elem.find('.owl-item').removeClass('first-item');
	this.$elem.find('.owl-item').removeClass('last-item');
	this.$elem.find('.owl-item').eq(first_item).addClass('first-item');
	this.$elem.find('.owl-item').eq(last_item).addClass('last-item');
}
//Document Ready
$(document).ready(function(){
	//Back To Top
	$('.back-to-top').on('click',function(event){
		event.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow');
	});
	//Menu Responsive
	if($(window).width()<768){
		$('body').on('click',function(event){
			$('.main-nav>ul').slideUp('slow');
		});
		$('.toggle-mobile-menu').on('click',function(event){
			event.preventDefault();
			event.stopPropagation();
			$('.main-nav>ul').slideToggle('slow');
		});
		$('.main-nav li.menu-item-has-children>a').on('click',function(event){
			event.preventDefault();
			event.stopPropagation();
			$(this).next().slideToggle('slow');
		});
	}

	//Accordions
	if($('.accordion-box').length >0){
		$('.accordion-box').each(function(){
			$('.title-accordion').click(function(){
				$(this).parent().parent().find('.item-accordion').removeClass('active');
				$(this).parent().addClass('active');
				$(this).parent().parent().find('.desc-accordion').stop(true,true).slideUp();
				$(this).next().stop(true,true).slideDown();
			});
		});
	}
	//Toggle Filter
	$('body').on('click',function(){
		$('.box-product-filter').slideUp('slow');
	});
	$('.toggle-link-filter').on('click',function(event) {
		event.stopPropagation();
		event.preventDefault();
		$('.box-product-filter').slideToggle('slow');
	});
	//Product Quick View
	$('.quickview-link').each(function(){
		$(this).fancybox();
	});
	$('.team-gallery-thumb').each(function(){
		$(this).fancybox();
	});
	//Faqs Widget
	$('.list-post-faq li h3').on('click',function(event) {
		$('.list-post-faq li').removeClass('active');
		$(this).parent().addClass('active');
	});
	//World Hover Dir
	$('.world-ad-box').each( function() {
		$(this).hoverdir();
	});
	//Close Adv
	$('.adv-close-link').on('click',function(event) {
		event.preventDefault();
		$('.adv-close').slideUp('slow');
	});
	//Category Hover
	$('.list-category-hover>li:gt(12)').hide();
	$('.expand-list-link').on('click',function(event) {
		event.preventDefault();
		$(this).toggleClass('expanding');
		$('.list-category-hover>li:gt(12)').slideToggle('slow');
	});
	$('.list-category-hover a').on('mouseover',function() {
		var id_hv = $(this).attr('data-id');
		/* console.log(id_hv); */
		$('.inner-right-category-hover').each(function(){
			if($(this).attr('id')==id_hv){
				$(this).addClass('active');
			}else{
				$(this).removeClass('active');
			}
		})

	});
	//Category Toggle
	$('.list-category-dropdown >li:gt(9)').hide();
	$('.expand-category-link').on('click',function(event) {
		event.preventDefault();
		$(this).toggleClass('expanding');
		$('.list-category-dropdown >li:gt(9)').slideToggle('slow');
	});
	//Category Toggle Home 8
	$('.list-category-dropdown8 >li:gt(10)').hide();
	$('.expand-category-link8').on('click',function(event) {
		event.preventDefault();
		$(this).toggleClass('expanding');
		$('.list-category-dropdown8 >li:gt(10)').slideToggle('slow');
	});
	//Outlet mCustom Scrollbar
	if($('.list-outlet-brand').length>0){
		$(".list-outlet-brand").mCustomScrollbar();
	}
	//Deal Count Down
	if($('.super-deal-countdown').length>0){
		$(".super-deal-countdown").TimeCircles({
			fg_width: 0.01,
			bg_width: 1.2,
			text_size: 0.07,
			circle_bg_color: "#ffffff",
			time: {
				Days: {
					show: true,
					text: "Days",
					color: "#f9bc02"
				},
				Hours: {
					show: true,
					text: "Hour",
					color: "#f9bc02"
				},
				Minutes: {
					show: true,
					text: "Mins",
					color: "#f9bc02"
				},
				Seconds: {
					show: true,
					text: "Secs",
					color: "#f9bc02"
				}
			}
		});
	}
	if($('.top-toggle-coutdown').length>0){
		$(".top-toggle-coutdown").TimeCircles({
			fg_width: 0.03,
			bg_width: 1.2,
			text_size: 0.07,
			circle_bg_color: "rgba(27,29,31,0.5)",
			time: {
				Days: {
					show: true,
					text: "day",
					color: "#fbb450"
				},
				Hours: {
					show: true,
					text: "hou",
					color: "#fbb450"
				},
				Minutes: {
					show: true,
					text: "min",
					color: "#fbb450"
				},
				Seconds: {
					show: true,
					text: "sec",
					color: "#fbb450"
				}
			}
		});
	}
	if($('.hot-deal-tab-countdown').length>0){
		$(".hot-deal-tab-countdown").TimeCircles({
			fg_width: 0,
			bg_width: 1,
			text_size: 0.07,
			time: {
				Days: {
					show: true,
					text: "D",
				},
				Hours: {
					show: true,
					text: "H",
				},
				Minutes: {
					show: true,
					text: "M",
				},
				Seconds: {
					show: true,
					text: "S",
				}
			}
		});
	}
	if($('.hotdeal-countdown').length>0){
		$(".hotdeal-countdown").TimeCircles({
			fg_width: 0,
			bg_width: 1,
			text_size: 0.07,
			time: {
				Days: {
					show: true,
					text: "D",
				},
				Hours: {
					show: true,
					text: "H",
				},
				Minutes: {
					show: true,
					text: "M",
				},
				Seconds: {
					show: true,
					text: "S",
				}
			}
		});
	}
	if($('.hotdeal-countdown5').length>0){
		$(".hotdeal-countdown5").TimeCircles({
			fg_width: 0,
			bg_width: 1,
			text_size: 0.07,
			circle_bg_color: "#f4f4f4",
			time: {
				Days: {
					show: false,
					text: "Days",
					color: "#e62e04"
				},
				Hours: {
					show: true,
					text: "Hour",
					color: "#e62e04"
				},
				Minutes: {
					show: true,
					text: "Mins",
					color: "#e62e04"
				},
				Seconds: {
					show: true,
					text: "Secs",
					color: "#e62e04"
				}
			}
		});
	}
	if($('.dealoff-countdown').length>0){
		$(".dealoff-countdown").TimeCircles({
			fg_width: 0,
			bg_width: 1,
			text_size: 0.07,
			circle_bg_color: "#fff",
			time: {
				Days: {
					show: false,
					text: "d",
				},
				Hours: {
					show: true,
					text: "h",
				},
				Minutes: {
					show: true,
					text: "m",
				},
				Seconds: {
					show: true,
					text: "s",
				}
			}
		});
	}
	if($('.great-deal-countdown').length>0){
		$(".great-deal-countdown").TimeCircles({
			fg_width: 0,
			bg_width: 1,
			text_size: 0.07,
			circle_bg_color: "#fff",
			time: {
				Days: {
					show: true,
					text: "d",
				},
				Hours: {
					show: true,
					text: "h",
				},
				Minutes: {
					show: true,
					text: "m",
				},
				Seconds: {
					show: true,
					text: "s",
				}
			}
		});
	}
	if($('.deal-countdown8').length>0){
		$(".deal-countdown8").TimeCircles({
			fg_width: 0.01,
			bg_width: 1.2,
			text_size: 0.07,
			circle_bg_color: "#fafafa",
			time: {
				Days: {
					show: true,
					text: "D",
					color: "#e62e04"
				},
				Hours: {
					show: true,
					text: "H",
					color: "#e62e04"
				},
				Minutes: {
					show: true,
					text: "M",
					color: "#e62e04"
				},
				Seconds: {
					show: true,
					text: "S",
					color: "#e62e04"
				}
			}
		});
	}
	if($('.supperdeal-countdown').length>0){
		$(".supperdeal-countdown").TimeCircles({
			fg_width: 0.03,
			bg_width: 1.2,
			text_size: 0.07,
			circle_bg_color: "#5f6062",
			time: {
				Days: {
					show: true,
					text: "day",
					color: "#c6d43a"
				},
				Hours: {
					show: true,
					text: "hou",
					color: "#c6d43a"
				},
				Minutes: {
					show: true,
					text: "min",
					color: "#c6d43a"
				},
				Seconds: {
					show: true,
					text: "sec",
					color: "#c6d43a"
				}
			}
		});
	}
	if($('.deal-the-day24').length>0){
		$(".deal-the-day24").TimeCircles({
			fg_width: 0.03,
			bg_width: 1.2,
			text_size: 0.07,
			circle_bg_color: "#ed321e",
			time: {
				Days: {
					show: false,
					text: "day",
					color: "#fff"
				},
				Hours: {
					show: true,
					text: "hou",
					color: "#fff"
				},
				Minutes: {
					show: true,
					text: "min",
					color: "#fff"
				},
				Seconds: {
					show: true,
					text: "sec",
					color: "#fff"
				}
			}
		});
	}
	//Tab Control
	$('.title-tab-product li a').on('click',function(event) {
		event.preventDefault();
		$('.title-tab-product li').removeClass('active');
		$(this).parent().addClass('active');
		$('.content-tab-product .tab-pane').each(function(){
			if($(this).attr('id')==$('.title-tab-product li.active a').attr('data-id')){
				$(this).slideDown();
			}else{
				$(this).slideUp();
			}
		});
	});
	//Close Service Box
	$('.close-service-box').on('click',function(event) {
		event.preventDefault();
		$('.list-service-box').slideUp('slow');
	});
	//Close Top Toggle
	$('.close-top-toggle').on('click',function(event) {
		event.preventDefault();
		$('.top-toggle').slideUp('slow');
	});
	//Detail Gallery
	if($('.detail-gallery').length>0){
		$(".detail-gallery .carousel").jCarouselLite({
			btnNext: ".gallery-control .next",
			btnPrev: ".gallery-control .prev",
			speed: 800,
			visible:4,
		});
		//Elevate Zoom
		$('.detail-gallery .mid img').elevateZoom({
			zoomType: "inner",
			cursor: "crosshair",
			zoomWindowFadeIn: 500,
			zoomWindowFadeOut: 750
		});
		$(".detail-gallery .carousel a").on('click',function(event) {
			event.preventDefault();
			$(".detail-gallery .carousel a").removeClass('active');
			$(this).addClass('active');
			$(".detail-gallery .mid img").attr("src", $(this).find('img').attr("src"));
			var z_url = $('.detail-gallery .mid img').attr('src');
			$('.zoomWindow').css('background-image','url("'+z_url+'")');
		});
	}
	//Detail Gallery Full Width
	if($('.detail-gallery-fullwidth').length>0){
		$(".detail-gallery-fullwidth .carousel").jCarouselLite({
			btnNext: ".vertical-next",
			btnPrev: ".vertical-prev",
			speed: 800,
			visible:4,
			vertical: true
		});
		//Elevate Zoom
		$('.detail-gallery-fullwidth .mid img').elevateZoom({
			zoomType: "inner",
			cursor: "crosshair",
			zoomWindowFadeIn: 500,
			zoomWindowFadeOut: 750
		});
		$(".detail-gallery-fullwidth .carousel a").on('click',function(event) {
			event.preventDefault();
			$(".detail-gallery-fullwidth .carousel a").removeClass('active');
			$(this).addClass('active');
			$(".detail-gallery-fullwidth .mid img").attr("src", $(this).find('img').attr("src"));
			var z_url = $('.detail-gallery-fullwidth .mid img').attr('src');
			$('.zoomWindow').css('background-image','url("'+z_url+'")');
		});
	}
	//Sort Pagi Bar
	$('body').on('click',function(){
		$('.product-order-list').slideUp();
		$('.per-page-list').slideUp();
	});
	$('.product-order-toggle').on('click',function(event){
		event.stopPropagation();
		event.preventDefault();
		$('.product-order-list').slideToggle();
	});
	$('.per-page-toggle').on('click',function(event){
		event.stopPropagation();
		event.preventDefault();
		$('.per-page-list').slideToggle();
	});
	//Attr Product
	$('body').on('click',function(){
		$('.list-color').slideUp();
		$('.list-size').slideUp();
	});
	$('.toggle-color').on('click',function(event){
		event.stopPropagation();
		event.preventDefault();
		$('.list-color').slideToggle();
	});
	$('.toggle-size').on('click',function(event){
		event.stopPropagation();
		event.preventDefault();
		$('.list-size').slideToggle();
	});
	$('.list-color a').on('click',function(event){
		event.preventDefault();
		$('.list-color a').removeClass('selected');
		$(this).addClass('selected');
		$('.toggle-color').text($(this).text());
	});
	$('.list-size a').on('click',function(event){
		event.preventDefault();
		$('.list-size a').removeClass('selected');
		$(this).addClass('selected');
		$('.toggle-size').text($(this).text());
	});

	//Qty Up-Down
	$('.info-qty').each(function(){
		var qtyval = parseInt($(this).find('.qty-val').text(),10);
		$('.qty-up').on('click',function(event){
			event.preventDefault();
			qtyval=qtyval+1;
			$(this).prev().text(qtyval);
		});
		$('.qty-down').on('click',function(event){
			event.preventDefault();
			qtyval=qtyval-1;
			if(qtyval>0){
				$(this).next().text(qtyval);
			}else{
				qtyval=0;
				$(this).next().text(qtyval);
			}
		});
	});
	//Rev Slider
	if($('.rev-slider').length>0){
		$('.rev-slider').revolution({
			startwidth:1170,
			startheight:410,
		});
	}
	$('body').on('click',function(){
		$('.list-category-toggle').slideUp();
	});
	$('.list-category-toggle').on('click',function(event){
		event.preventDefault();
	});
	$('.category-toggle-link').on('click',function(event){
		event.stopPropagation();
		event.preventDefault();
		$('.list-category-toggle').slideToggle();
	});
	$('.title-category-dropdown').on('click',function(){
		$(this).next().slideToggle();
	});
	//Widget Shop
	$('.widget.widget-vote a').on('click',function(event){
		event.preventDefault();
		$(this).toggleClass('active');
	});
	$('.widget-filter .widget-title').on('click',function(event){
		$(this).toggleClass('active');
		$(this).next().slideToggle('slow');
	});
	$('.box-filter li a,.list-color-filter a').on('click',function(event){
		event.preventDefault();
		$(this).toggleClass('active');
	});
	if($('.range-filter').length>0){
		$( ".range-filter #slider-range" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 70, 350 ],
			slide: function( event, ui ) {
			$( "#amount" ).html( "<span>" + ui.values[ 0 ] + "</span>" + " - " + "<span>" + ui.values[ 1 ] + "</span>" );
			}
		});
		$( ".range-filter #amount" ).html( "<span>" + $( "#slider-range" ).slider( "values", 0 )+ "</span>" + " - " + "<span>" + $( "#slider-range" ).slider( "values", 1 ) + "</span>" );
	}
	//End Widget Shop
});
//Window Load
$(window).on('load',function(){
	//Sticker Slider
	if($('.bxslider-ticker').length>0){
		$('.bxslider-ticker').bxSlider({
			maxSlides: 2,
			minSlides: 1,
			slideWidth: 400,
			slideMargin: 10,
			ticker: true,
			tickerHover:true,
			useCSS:false,
			speed: 50000,
		});
	}
	//Owl Carousel
	if($('.wrap-item').length>0){
		$('.wrap-item').each(function(){
			var data = $(this).data();
			$(this).owlCarousel({
				addClassActive:true,
				stopOnHover:true,
				itemsCustom:data.itemscustom,
				autoPlay:data.autoplay,
				transitionStyle:data.transition,
				paginationNumbers:data.paginumber,
				beforeInit:background,
				afterAction:animated,
				navigationText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			});
		});
		//Parallax Slider
		if($('.parallax-slider').length>0){
			$(window).scroll(function() {
				var ot = $('.parallax-slider').offset().top;
				var sh = $('.parallax-slider').height();
				var st = $(window).scrollTop();
				var top = (($(window).scrollTop() - ot) * 0.5) + 'px';
				if(st>ot&&st<ot+sh){
					$('.parallax-slider .item-slider').css({
						'background-position': 'center ' + top
					});
				}else{
					$('.parallax-slider .item-slider').css({
						'background-position': 'center 0'
					});
				}
			});
		}
	}
	//Blog Masonry
	if($('.masonry-list-post').length>0){
		$('.masonry-list-post').masonry({
			// options
			itemSelector: '.item-post-masonry',
		});
	}
});
})(jQuery); // End of use strict