/* Swiper */ 
$(function(){
	const linkArray=[".main_slider", "#page1", "#page2", ".guide"];
	let n=0;
	let pos=0;

	function scrollInteraction(t){
		if(t < $("#page1").offset().top){
			n=0;
		}
		else if(t < $("#page2").offset().top){
			n=1;
		}
		else if(t < $(".guide").offset().top){
			n=2;

			if($(window).height()+t == $(document).height()){
				n=3;
			}
		}
		else{
			n=3;
		}

		for(let i=0; i<$(".menu li").length; i++){
			if(i == n){
				$(".menu li").eq(i).addClass("active");
			}
			else{
				$(".menu li").eq(i).removeClass("active");
			}
		}

		if(n > 0){
			if($("#header").hasClass("dark") == false){
				$("#header").addClass("dark");
			}
		}
		else{
			if($("#header").hasClass("dark") == true){
				$("#header").removeClass("dark");
			}
		}

		if(t > 100){
			$(".btn_top").addClass("active");
			$("#header").addClass("active");
		}
		else{
			$(".btn_top").removeClass("active");
			$("#header").removeClass("active");
		}
	}

	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		},
		scroll: {
			element: window,
			callback: (offset, dir) => scrollInteraction(offset.y)
		}
	});

	trigger.add(".main_slider, section[id^=page], #contact");

	$(".menu li").click(function(e){
		e.preventDefault();

		$("body").removeClass("fixed");
		$("#header").removeClass("active");
		$(".total").removeClass("active");
		n=$(this).index();
		let target=$(linkArray[n]);
		pos=Math.round(target.offset().top)+1;

		setTimeout(function(){
			$("html").animate({scrollTop: pos}, 600);
		}, 1000);
	});
	$("#header .tab").click(function(e){
		e.preventDefault();

		$("body").addClass("fixed");
		$("#header").addClass("active");
		$(".total").addClass("active");
	});
	$(".total .close").click(function(e){
		e.preventDefault();

		$("#header").removeClass("active");
		$(".total").removeClass("active");
		$("body").removeClass("fixed");
	});

	let mainCurrent, mainTotal;

	const mainSwiper=new Swiper(".mainSwiper", {
		speed: 1000,
		loop: false,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		on: {
			init: function(){
				mainCurrent=this.activeIndex;
				// mainCurrent=this.realIndex;
				mainTotal=this.slides.length;
				$(".main_slider .account .current").text(mainCurrent+1);
				$(".main_slider .account .length").text(mainTotal);
				$(".main_slider .direction a.prev").removeClass("visible");
				$(".main_slider .direction a.next").addClass("visible");

				setTimeout(function(){
					$(".main_slider .swiper-slide-active .content_box").addClass("active");
					$(".main_slider .progressbar span").animate({width: "100%"}, 6000);
				}, 50);
			},
			slideChange: function(){
				mainCurrent=this.activeIndex;
				// mainCurrent=this.realIndex;
				$(".main_slider .account .current").text(mainCurrent+1);
				$(".main_slider .content_box").removeClass("active");
				$(".main_slider .progressbar span").stop().removeAttr("style");

				switch(mainCurrent){
					case 0 :
						$(".main_slider .direction a.prev").removeClass("visible");
						$(".main_slider .direction a.next").addClass("visible");
						break;
					case this.slides.length-1 :
						$(".main_slider .direction a.prev").addClass("visible");
						$(".main_slider .direction a.next").removeClass("visible");
						break;
					default:
						$(".main_slider .direction a.prev").addClass("visible");
						$(".main_slider .direction a.next").addClass("visible");
						break;
				}

				setTimeout(function(){
					$(".main_slider .swiper-slide-active .content_box").addClass("active");
	
					if($("#pause_play").hasClass("pause")){
						$(".main_slider .progressbar span").animate({width: "100%"}, 6000);
					}
					else{
						$(".main_slider .progressbar span").removeAttr("style");
					}
				}, 50);
			}
		}
	});

	$(".main_slider .direction .prev").click(function(e){
		e.preventDefault();
		mainSwiper.slidePrev();
	});
	$(".main_slider .direction .next").click(function(e){
		e.preventDefault();
		mainSwiper.slideNext();
	});
	$("#pause_play").click(function(e){
		e.preventDefault();

		if($(this).hasClass("play")){
			$(this).removeAttr("class");
			$(this).addClass("pause");
			$(this).text("pause");
			mainSwiper.autoplay.start();
			$(".main_slider .progressbar span").stop().removeAttr("style");

			setTimeout(function(){
				$(".main_slider .progressbar span").animate({width: "100%"}, 6000);
			}, 50);
		}
		else{
			$(this).removeAttr("class");
			$(this).addClass("play");
			$(this).text("play");
			mainSwiper.autoplay.stop();
			$(".main_slider .progressbar span").stop();
		}
	});
	$(window).resize(function(){
		if($(window).height() < 620){
			$(".main_slider .swiper_control").addClass("invisible");
		}
		else{
			$(".main_slider .swiper_control").removeClass("invisible");
		}
	});

	$(window).trigger("resize");

	let timerN=1;

	setTimeout(function(){
		$(".motion_text .text"+timerN).addClass("active");
	}, 50);

	let textTimer=setInterval(function(){
		if(timerN < 2){
			timerN++;
		}
		else{
			timerN=1;
		}

		$(".motion_text div[class^=text]").removeClass("active");
		$(".motion_text .text"+timerN).addClass("active");
	}, 5000);

	$(".btn_top").click(function(e){
		e.preventDefault();
		$("html").animate({scrollTop:0}, 400);
	});

	let tabArray=[];
	let tab1=0;
	let tab2=0;
	let tabLeft=30;
	let tabTop=260;
	let wint, winw, targety;

	$(window).resize(function(){
		tabLeft=$("#page2 .category .tab_lst").offset().left;
		winw=$(window).width();
	});

	// category_tap
	$(window).trigger("resize");

	$(window).scroll(function(){
		wint=$(window).scrollTop();

		if(wint > $(".work_list").offset().top){
			if($("#page2 .category").hasClass("fixed") == false){
				$("#page2 .category").addClass("fixed");
			}
		}else{
			if($("#page2 .category").hasClass("fixed") == true){
				$("#page2 .category").removeClass("fixed");
			}
		}
	});

	$("#page2 .category .tab_lst li").eq(tab2).addClass("active");

	$("#page2 .category .tab_lst li").each(function(i){
		tabArray.push($(this).find("a span.pc").width());
	});

	function tabInteraction(){
		$("#page2 .category .line").css({
			left: $("#page2 .category .tab_lst li").eq(tab1).offset().left-tabLeft,
			width: tabArray[tab1]
		});
	};

	tabInteraction();

	$("#page2 .category .tab_lst li").hover(
		function(){
			tab1=$(this).index();
			tabInteraction();
		},
		function(){
			tab1=tab2;
			tabInteraction();
		}
	);
	$("#page2 .category .tab_lst li").click(function(e){
		e.preventDefault();
		tab2=$(this).index();

		$("#page2 .category .tab_lst li").removeClass("active");
		$("#page2 .category .tab_lst li").eq(tab2).addClass("active");

		targety=$(".work_list li").eq(tab2).offset().top-tabTop;
		$("html").animate({scrollTop: targety}, 600);
	});
});