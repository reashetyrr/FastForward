/* Universal Bypass > general.js > This file contains general bypasses and bypasses for websites without a single dedicated domain, like adf.ly. */

if(typeof Object.nativeDefineProperty != "undefined")
{
	Object.defineProperty = Object.nativeDefineProperty;
}

// Adf.ly
Object.defineProperty(window, "ysmm",
{
	set: function(result)
	{
		let I = '',
		X = '';
		for(let m = 0; m < result.length; m++)
		{
			if(m % 2 == 0)
			{
				I += result.charAt(m);
			}
			else
			{
				X = result.charAt(m) + X;
			}
		}
		result = I + X;
		let U = result.split('');
		for(m = 0; m < U.length; m++)
		{
			if(!isNaN(U[m]))
			{
				for(let R = m + 1; R < U.length; R++)
				{
					if(!isNaN(U[R]))
					{
						let S = U[m]^U[R];
						if(S < 10)
						{
							U[m] = S;
						}
						m = R;
						R = U.length;
					}
				}
			}
		}
		result = U.join('');
		result = window.atob(result);
		result = result.substring(result.length - (result.length - 16));
		result = result.substring(0, result.length - 16);
		if(result && (result.indexOf('http://') === 0 || result.indexOf("https://") === 0))
		{
			document.write('<!--');
			window.stop();
			window.onbeforeunload = null;
			window.location = result;
		}
	}
});

(function()
{
	// AdLinkFly
	let actual_app_vars = forced_app_vars = {
		"counter_start": "load",
		"force_disable_adblock": "0"
	}, isAdLinkFly = false;
	Object.defineProperty(window, "app_vars",
	{
		set: function(val)
		{
			isAdLinkFly = true;
		},
		get: function()
		{
			return actual_app_vars;
		}
	});
	for(let key in forced_app_vars)
	{
		Object.defineProperty(window.app_vars, key,
		{
			writeable: false,
			value: forced_app_vars[key]
		});
	}
	document.addEventListener("DOMContentLoaded", function()
	{
		if(isAdLinkFly)
		{
			let btn1 = document.getElementById("invisibleCaptchaShortlink");
			if(btn1 != null)
			{
				let captcha_timer = window.setInterval(function()
				{
					if(invisibleCaptchaShortlink !== undefined)
					{
						window.clearInterval(captcha_timer);
						btn1.click();
					}
				}, 100);
			}
			else if("$" in window && $("#go-link").length > 0)
			{
				window.setInterval(function()
				{
					let e = $("#go-link"), ad_type = $("body").hasClass("banner-page") ? "banner" : ($("body").hasClass("interstitial-page") ? "interstitial" : "");
					$.ajax({
						dataType: "json",
						type: "POST",
						url: e.attr("action"),
						data: e.serialize(),
						success: function(t, e, n)
						{
							if(t.url)
							{
								location.href = t.url;
							}
						},
						error: function(t, e, n)
						{
							console.log("An error occured: " + t.status + " " + t.statusText)
						}
					});
				}, 1500);
				$(".banner").html("").hide();
			}
			let btn2 = document.querySelectorAll(".get-link");
			if(btn2.length > 0)
			{
				btn2 = btn2[0];
				let link_timer = window.setInterval(function()
				{
					if(document.querySelectorAll(".get-link.disabled").length == 0)
					{
						window.clearInterval(link_timer);
						if(btn2.hasAttribute("href"))
						{
							location.href = btn2.href;
						}
						else
						{
							btn2.click();
						}
					}
				}, 100);
			}
			else if(document.querySelectorAll(".skip-ad").length > 0)
			{
				let link_timer = window.setInterval(function()
				{
					if(document.querySelectorAll(".skip-ad .btn[href]").length > 0 && document.querySelectorAll(".skip-ad .btn[href]")[0].href != location.href)
					{
						window.clearInterval(link_timer);
						location.href = document.querySelectorAll(".skip-ad .btn[href]")[0].href;
					}
				}, 100);
			}
			return;
		}
		// GemPixel Premium URL Shortener
		if(typeof appurl != "undefined" && typeof token != "undefined")
		{
			let scripts = document.getElementsByTagName("script");
			for(let i in scripts)
			{
				let script = scripts[i];
				if(script instanceof HTMLScriptElement)
				{
					let scriptCont = script.textContent;
					if(scriptCont.indexOf('clearInterval(countdown);') > -1)
					{
						if(typeof countdown != "undefined")
						{
							clearInterval(countdown);
						}
						if(document.querySelectorAll("a.redirect").length == 0)
						{
							let a = document.createElement("a");
							a.href = "#";
							a.className = "redirect";
							document.body.appendChild(a);
						}
						scriptCont = scriptCont.substr(scriptCont.split(";")[0].length + 1);
						window._setInterval = window.setInterval;
						window.setInterval = function(func)
						{
							func();
						};
						eval("var count=0;" + scriptCont);
						window.setInterval = window._setInterval;
						document.querySelectorAll("a.redirect")[0].click();
					}
				}
			}
		}
		// Shorte.st
		if(typeof app != "undefined" && "options" in app && "intermediate" in app.options)
		{
			app.options.intermediate.timeToWait = 2;
			let btn = document.getElementById(app.options.intermediate.skipButtonId),
			link_timer = window.setInterval(function()
			{
				if(btn.className.indexOf("show") > -1)
				{
					window.clearInterval(link_timer);
					location.href=app.options.intermediate.destinationUrl;
				}
			}, 100);
			return;
		}
		let general_timer = window.setInterval(function()
		{
			// Shorte.st Embed
			if(document.querySelectorAll(".lay-sh.active-sh").length > 0)
			{
				let elm = document.querySelectorAll(".lay-sh.active-sh")[0];
				elm.parentNode.removeChild(elm);
			}
		}, 500);
		// GetsURL.com
		if(document.querySelectorAll(".img-responsive[alt='Gets URL']").length > 0)
		{
			let btn = document.getElementById("link");
			if(btn != null)
			{
				location.href = btn.href + "&ab" + x;
			}
		}
		// Linkvertise.net
		if(document.querySelectorAll(".logo > a[href='http://linkvertise.net'] > img[src='/assets/img/linkvertise.png']").length > 0)
		{
			let btn = document.querySelectorAll("[data-download]");
			if(btn.length > 0)
			{
				location.href = btn[0].getAttribute("data-download");
			}
		}
		let titles = document.getElementsByTagName("title");
		if(titles.length == 1)
		{
			// Viid.su
			if(titles[0].textContent.trim() == "Viid.su")
			{
				let btn = document.getElementById("link-success-button");
				if(btn != null)
				{
					if(btn.getAttribute("data-url") != null)
					{
						location.href = btn.getAttribute("data-url");
					}
				}
			}
		}
		// OpenLoad
		if(document.querySelectorAll("img[src='/assets/img/logo.png'][alt='Openload']").length > 0)
		{
			secondsdl = 0;
		}
	});
})();
