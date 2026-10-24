/* Mobile mega-menu fix: lets the Tally Software / Tally Services / Tally Addons / Other Products headings open and close on phones. */
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
		var col = t.parentNode, sibs = col.parentNode.children;
		for (var i = 0; i < sibs.length; i++) { if (sibs[i] !== col) sibs[i].classList.remove('open'); }
		col.classList.toggle('open');
	});
})();
