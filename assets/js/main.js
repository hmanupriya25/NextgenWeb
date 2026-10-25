$(function () {
  ("use strict");

		var wind = $(window);
		var parallaxSlider;
		var parallaxSliderOptions = {
			speed: 1500,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			parallax: true,
			loop: true,

			on: {
				init: function () {
					var swiper = this;
					for (var i = 0; i < swiper.slides.length; i++) {
						$(swiper.slides[i])
							.find('.bg-img')
							.attr({
								'data-swiper-parallax': 0.75 * swiper.width
							});
					}
				},
				resize: function () {
					this.update();
				}
			},

			pagination: {
				el: '.slider-prlx .parallax-slider .swiper-pagination',
				dynamicBullets: true,
				clickable: true
			},

			navigation: {
				nextEl: '.slider-prlx .parallax-slider .next-ctrl',
				prevEl: '.slider-prlx .parallax-slider .prev-ctrl'
			}
		};
		parallaxSlider = new Swiper('.slider-prlx .parallax-slider', parallaxSliderOptions);
	
		// Var Background image
		var pageSection = $(".bg-img, section");
		pageSection.each(function (indx) {
			if ($(this).attr("data-background")) {
				$(this).css("background-image", "url(" + $(this).data("background") + ")");
			}
		});
	
        // Header Sticky
		$(window).on('scroll',function() {
            if ($(this).scrollTop() > 120){  
                $('.navbar-section').addClass("is-sticky");
            }
            else{
                $('.navbar-section').removeClass("is-sticky");
            }
        });
        
        // Mean Menu
		jQuery('.mean-menu').meanmenu({
			meanScreenWidth: "991"
        });

        // Popup Video
        $(".popup-video").magnificPopup({
            disableOn: 320,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
        });
		
        // Button Hover JS
        $(function() {
            $('.default-btn, .default-btn-one, .default-btn-two')
            .on('mouseenter', function(e) {
                var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
                $(this).find('span').css({top:relY, left:relX})
            })
            .on('mouseout', function(e) {
                var parentOffset = $(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
                $(this).find('span').css({top:relY, left:relX})
            });
        });

		// Progress bar
		wind.on('scroll', function () {
			$(".skill-progress .progres").each(function () {
				var bottom_of_object = $(this).offset().top + $(this).outerHeight();
				var bottom_of_window = $(window).scrollTop() + $(window).height();
				var myVal = $(this).attr('data-value');
				if (bottom_of_window > bottom_of_object) {
					$(this).css({
						width: myVal
					});
				}
			});
		});
        
        // Testimonial Slider
		$('.testimonial-slider').owlCarousel({
			loop: true,
			nav: true,
			dots: true,
			autoplayHoverPause: true,
            autoplay: true,
            smartSpeed: 1000,
            margin: 20,
            navText: [
                "<i class='fa fa-chevron-left'></i>",
                "<i class='fa fa-chevron-right'></i>"
            ],
			responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                1200: {
                    items: 3,
                }
            }
        });

		//  Star Counter
		$('.counter-number').counterUp({
			delay: 15,
			time: 2000
		});

        // FAQ Accordion
        $(function() {
            $('.accordion').find('.accordion-title').on('click', function(){
                // Adds Active Class
                $(this).toggleClass('active');
                // Expand or Collapse This Panel
                $(this).next().slideToggle('slow');
                // Hide The Other Panels
                $('.accordion-content').not($(this).next()).slideUp('slow');
                // Removes Active Class From Other Titles
                $('.accordion-title').not($(this)).removeClass('active');		
            });
        });
		
		// Porfolio isotope and filter
		$(window).on('load', function () {
			var portfolioIsotope = $('.portfolio-container').isotope({
				itemSelector: ".portfolio-grid-item",
			});
			$('#portfolio-flters li').on('click', function () {
				$("#portfolio-flters li").removeClass('filter-active');
				$(this).addClass('filter-active');
				portfolioIsotope.isotope({
					filter: $(this).data('filter')
				});
			});
		});

        // Go to Top
        $(function(){
            // Scroll Event
            $(window).on('scroll', function(){
                var scrolled = $(window).scrollTop();
                if (scrolled > 600) $('.go-top').addClass('active');
                if (scrolled < 600) $('.go-top').removeClass('active');
            });  
            // Click Event
            $('.go-top').on('click', function() {
                $("html, body").animate({ scrollTop: "0" }, 100);
            });
        });
        
        // Count Time 
        function makeTimer() {
            var endTime = new Date("June 10, 2027 17:00:00 PDT");			
            var endTime = (Date.parse(endTime)) / 1000;
            var now = new Date();
            var now = (Date.parse(now) / 1000);
            var timeLeft = endTime - now;
            var days = Math.floor(timeLeft / 86400); 
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }
            $("#days").html(days + "<span>Days</span>");
            $("#hours").html(hours + "<span>Hours</span>");
            $("#minutes").html(minutes + "<span>Minutes</span>");
            $("#seconds").html(seconds + "<span>Seconds</span>");
        }
        setInterval(function() { makeTimer(); }, 1000);

	
	// WOW JS
	$(window).on ('load', function (){
        if ($(".wow").length) { 
            var wow = new WOW ({
                boxClass:     'wow',      // Animated element css class (default is wow)
                animateClass: 'animated', // Animation css class (default is animated)
                offset:       20,         // Distance to the element when triggering the animation (default is 0)
                mobile:       true,       // Trigger animations on mobile devices (default is true)
                live:         true,       // Act on asynchronously loaded content (default is true)
            });
            wow.init();
        }
    });

    // Preloader Area
	$(window).on('load', function() {
		$('.preloader').addClass('preloader-deactivate');
	});

}(jQuery));

/* Mobile mega-menu fix: lets the Tally Software / Tally Services / Tally Addons / Other Products headings open and close on phones.
   It also works on pages that have their own toggle script: it notes the state first and sets the final state afterwards. */
(function () {
	if (window.__megaMobileMenu) return; window.__megaMobileMenu = true;
	var mq = window.matchMedia('(max-width: 991px)');
	var st = document.createElement('style');
	st.textContent = '.mean-container .mega-toggle{cursor:pointer;position:relative;padding-right:44px;-webkit-tap-highlight-color:transparent}' +
		'.mean-container .mega-toggle::after{content:"+";position:absolute;right:18px;top:50%;transform:translateY(-50%);font-size:20px;font-weight:600;color:#7b68ee}' +
		'.mean-container .mega-menu-column.open .mega-toggle::after{content:"\\2212"}';
	document.head.appendChild(st);
	document.addEventListener('click', function (e) {
		var t = e.target.closest ? e.target.closest('.mega-toggle') : null;
		if (!t || !mq.matches) return;
		var col = t.parentNode, was = col.classList.contains('open');
		setTimeout(function () {
			var sibs = col.parentNode.children;
			for (var i = 0; i < sibs.length; i++) { if (sibs[i] !== col) sibs[i].classList.remove('open'); }
			col.classList.toggle('open', !was);
		}, 0);
	}, true);
})();

/* WhatsApp: small floating icon (bottom-left), a WhatsApp icon next to Facebook in the footer, and a footer contact row.
   Change NUMBER to change where it opens. Set FLOATING to false to remove the floating icon and keep only the footer links. */
(function () {
	if (window.__nextgenWA) return; window.__nextgenWA = true;
	var NUMBER = '94775932323', FLOATING = true;
	var t = (document.title || '').split('|')[0].trim();
	var msg = (!t || /^NextGen/i.test(t)) ? 'Hello NextGen, I would like to know more about your Tally services.' : 'Hello NextGen, I am interested in ' + t + '.';
	var url = 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(msg);
	if (FLOATING) {
		var st = document.createElement('style');
		st.textContent = '.wa-float{position:fixed;left:14px;bottom:14px;z-index:900;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#25d366;color:#fff;text-decoration:none;box-shadow:0 4px 14px -4px rgba(0,0,0,.35);opacity:.92;transition:transform .2s,opacity .2s}' +
			'.wa-float:hover,.wa-float:focus-visible{color:#fff;opacity:1;transform:scale(1.08)}.wa-float:focus-visible{outline:3px solid #fff;outline-offset:2px}.wa-float i{font-size:24px;line-height:1}';
		document.head.appendChild(st);
		var a = document.createElement('a');
		a.className = 'wa-float'; a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.title = 'Chat on WhatsApp';
		a.setAttribute('aria-label', 'Chat with NextGen on WhatsApp');
		a.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
		document.body.appendChild(a);
	}
	var social = document.querySelector('.footer-social');
	if (social) {
		var li = document.createElement('li');
		li.innerHTML = '<a href="' + url + '" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>';
		social.appendChild(li);
	}
	var rows = document.querySelectorAll('.footer-info-contact');
	if (rows.length >= 2) {
		var d = document.createElement('div'); d.className = 'footer-info-contact';
		d.innerHTML = '<i class="fab fa-whatsapp"></i><h3>WhatsApp</h3><span><a href="' + url + '" target="_blank" rel="noopener noreferrer">Chat with us</a></span>';
		rows[1].parentNode.insertBefore(d, rows[1].nextSibling);
	}
})();
