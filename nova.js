
/**
 * tumblr-nova - v1.6.3
 * 2013-05-01
 * http://nova.stylehatch.co/
 *
 * Copyright 2013 Style Hatch
 */
(function (t) {
    t(function () {
        if (!Nova.customizeMode) {
            t.getScript("http://platform.twitter.com/widgets.js");
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = "https://apis.google.com/js/plusone.js";
            var i = document.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(e, i)
        }
        if (t(".tumblr_video_container").remove(), getDateFloats = function () {
            Nova.floatDates && t(".date").each(function () {
                var e = t(this),
                    i = e.offset().top;
                e.data("offsetTop", i)
            })
        }, getDateFloats(), t("#likes li:gt(" + (Nova.likesCount - 1) + ")").remove(), t(".reblog-block").each(function () {
            t(this).parent().addClass("credit-block-dash")
        }), t(".source-block").each(function () {
            t(this).parent().addClass("credit-block-dash")
        }), t.fn.setupTumblrShare = function () {
            return this.each(function () {
                var e = t(this);
                if (e.is(":empty")) {
                    var i = e.attr("data-permalink"),
                        o = e.closest("article"),
                        n = o.find("header img, section img");
                    if (n.length > 0) {
                        var a = !0;
                        if (n.first().attr("data-highres")) var r = n.first().attr("data-highres");
                        else var r = n.first().attr("src")
                    } else var a = !1,
                    r = "";
                    if (Nova.twitterUser) var s = Nova.twitterUser;
                    else var s = "";
                    e.tumblrShare({
                        url: i,
                        media: r,
                        via: s,
                        size: "horizontal",
                        pinterest: a,
                        onComplete: function () {
                            try {
                                gapi.plusone.go()
                            } catch (e) {}
                            t.getScript("http://platform.twitter.com/widgets.js") // Removed Pinterest because it was throwing like thirty 400s and massively slowing down page load time
                        }
                    })
                }
            })
        }, t(".share-buttons.visible-bar").length > 0) {
            var o = t(".share-buttons.visible-bar");
            o.setupTumblrShare()
        }
        t(".post-share a").click(function () {
            return t(this).parent().parent().parent().parent().find("div.share-bar").slideToggle(), getDateFloats(), !1
        });
        var n = !1;
        if (t(".custom-photoset").imagesLoaded(function () {
            t(".custom-photoset").removeClass("visuallyhidden"), t(".custom-photoset").tumblrPhotoset({
                width: "100%",
                highres: !0,
                margin: 2,
                onInit: function () {},
                onComplete: function () {
                    t(".custom-photoset").removeClass("visuallyhidden"), n = !0, t(".custom-photoset a").colorbox({
                        photo: !0,
                        maxHeight: "90%",
                        maxWidth: "90%"
                    })
                }
            })
        }), t('.photo header a[href*="media.tumblr.com/"]').each(function () {
            t(this).addClass("highres")
        }), t("a.highres").colorbox({
            photo: !1,
            maxHeight: "95%",
            maxWidth: "95%"
        }), t("article.text, article.photo, article.photoset, article.link, article.quote, article.video, article.ask, #likes").fitVids(), Nova.infScroll) {
            if (t("html").is(".ie6, .ie7, .ie8")) return !1;
            if (Nova.blackStyle) var a = "http://static.tumblr.com/fftf9xi/ySElaj33e/ajax-loader.gif";
            else var a = "http://static.tumblr.com/fftf9xi/3mAlaj32r/ajax-loader-light.gif";
            t("#posts_infinite").infinitescroll({
                navSelector: ".index_page #pagination",
                nextSelector: ".index_page #pagination .icon-next a",
                itemSelector: "#posts article:not('.results')",
                loadingImg: a,
                loadingText: Nova.loadingText,
                bufferPx: 160,
                donetext: "<h4>No more posts to load</h4>"
            }, function (e) {
                t(".reblog-block").each(function () {
                    t(this).parent().addClass("credit-block-dash")
                }), t(".source-block").each(function () {
                    t(this).parent().addClass("credit-block-dash")
                }), t('.photo header a[href*="media.tumblr.com/"]').each(function () {
                    t(this).addClass("highres")
                }), t("a.highres").colorbox({
                    photo: !1,
                    maxHeight: "95%",
                    maxWidth: "95%"
                }), t.each(e, function () {
                    t(this).find(".post-share a").click(function () {
                        return t(this).parent().parent().parent().parent().find("div.share-bar").slideToggle(), !1
                    });
                    var e = !1,
                        i = t(this).find(".custom-photoset");
                    if (i.imagesLoaded(function () {
                        i.removeClass("visuallyhidden"), i.tumblrPhotoset({
                            width: "100%",
                            highres: !0,
                            margin: 2,
                            onInit: function () {},
                            onComplete: function () {
                                i.removeClass("visuallyhidden"), e = !0, i.find("a").colorbox({
                                    photo: !0,
                                    maxHeight: "90%",
                                    maxWidth: "90%"
                                })
                            }
                        })
                    }), t(".share-buttons.visible-bar").length > 0) {
                        var o = t(".share-buttons.visible-bar");
                        o.setupTumblrShare()
                    }
                    t(this).is(".text, .photo, .photoset, .link, .quote, .video, .ask") && t(this).fitVids(), t(this).find(".share-bar").each(function () {
                        $share = t(this)
                    })
                })
            })
        }
        if (Nova.flickrID && !Nova.instagramToken) {
            var r = "link",
                s = "title";
            t("#flickr_gallery").jflickrfeed({
                limit: 6,
                qstrings: {
                    id: Nova.flickrID
                },
                itemTemplate: '<li><a href="{{' + r + '}}"><img src="{{image_s}}" alt="{{' + s + '}}" /></a></li>'
            }, function () {
                t("section.flickr p").remove()
            })
        }
        Nova.instagramCount = 6, Nova.instagramToken && t.ajax({
            url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + Nova.instagramToken + "&count=" + Nova.instagramCount,
            dataType: "jsonp",
            timeout: 5e3,
            success: function (e) {
                var i = t("section.flickr");
                if (i.length > 0) {
                    i.find("ul#flickr_gallery").empty();
                    for (var o = 0; Nova.instagramCount > o; o++) i.find("ul#flickr_gallery").append('<li><a href="' + e.data[o].link + '" target="_blank"><img src="' + e.data[o].images.low_resolution.url + '" /></a></li>');
                    var n = "http://www.instagram.com/" + e.data[0].user.username;
                    i.find("li.icon-flickr a").attr("href", n)
                }
                t("section.flickr p").remove()
            }
        }), Nova.customizeMode || (t.getScript("https://apis.google.com/js/plusone.js"), t(".share-bar").each(function () {
            if ($share = t(this), $tweetBlock = $share.find(".share-bar-twitter"), $tweetBlock.is(":empty")) {
                var e = $tweetBlock.attr("data-permalink"),
                    i = "";
                Nova.twitterUser && (i = "data-via=" + Nova.twitterUser + " ");
                var o = '<a href="http://twitter.com/share" class="twitter-share-button" data-url="' + e + '" ' + i + ' data-count="horizontal" data-related="stylehatch:Hand Crafted Digital Goods &amp; Premium Tumblr Themes"></a>' + '<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';
                $tweetBlock.html(o)
            }
            if ($faceBlock = $share.find(".share-bar-facebook"), $faceBlock.is(":empty")) {
                var n = $faceBlock.attr("data-permalink"),
                    a = '<iframe src="//www.facebook.com/plugins/like.php?href=' + n + '&amp;send=false&amp;layout=button_count&amp;width=110&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:120px; height:21px;" allowTransparency="true"></iframe>';
                $faceBlock.html(a)
            }
            if ($googleBlock = $share.find(".share-bar-google"), $googleBlock.is(":empty")) {
                var r = $googleBlock.attr("data-permalink"),
                    s = '<div class="g-plusone" data-size="medium" data-count="true" data-href="' + r + '"></div>';
                $googleBlock.html(s)
            }
        })), Nova.customizeMode && (t(".audio_player").addClass("customize-audio white"), t(".fluid-width-video-wrapper").addClass("customize-embed"))
    }), t(window).scroll(function () {
        if (Nova.floatDates) {
            var e = t(this).scrollTop();
            t(".date").each(function () {
                var i = t(this);
                e >= i.data("offsetTop") ? i.addClass("fixed_date") : i.removeClass("fixed_date")
            })
        }
    }), t(window).load(function () {
        getDateFloats()
    }), t.fn.jflickrfeed = function (e, i) {
        e = t.extend(!0, {
            flickrbase: "http://api.flickr.com/services/feeds/",
            feedapi: "photos_public.gne",
            limit: 20,
            qstrings: {
                lang: "en-us",
                format: "json",
                jsoncallback: "?"
            },
            cleanDescription: !0,
            useTemplate: !0,
            itemTemplate: "",
            itemCallback: function () {}
        }, e);
        var o = e.flickrbase + e.feedapi + "?",
            n = !0;
        for (var a in e.qstrings) n || (o += "&"), o += a + "=" + e.qstrings[a], n = !1;
        return t(this).each(function () {
            var n = t(this),
                a = this;
            t.getJSON(o, function (o) {
                t.each(o.items, function (t, i) {
                    if (e.limit > t) {
                        if (e.cleanDescription) {
                            var o = /<p>(.*?)<\/p>/g,
                                r = i.description;
                            o.test(r) && (i.description = r.match(o)[2], void 0 != i.description && (i.description = i.description.replace("<p>", "").replace("</p>", "")))
                        }
                        if (i.image_s = i.media.m.replace("_m", "_s"), i.image_t = i.media.m.replace("_m", "_t"), i.image_m = i.media.m.replace("_m", "_m"), i.image = i.media.m.replace("_m", ""), i.image_b = i.media.m.replace("_m", "_b"), delete i.media, e.useTemplate) {
                            var s = e.itemTemplate;
                            for (var l in i) {
                                var h = RegExp("{{" + l + "}}", "g");
                                s = s.replace(h, i[l])
                            }
                            n.append(s)
                        }
                        e.itemCallback.call(a, i)
                    }
                }), t.isFunction(i) && i.call(a, o)
            })
        })
    }
})(jQuery),
function (t) {
    t.tumblrPhotoset = function (e, i) {
        var o = {
            width: "100%",
            margin: "0px",
            highres: !1,
            layout: "",
            margin: "2",
            links: !0,
            onInit: function () {},
            onComplete: function () {}
        }, n = this;
        n.settings = {};
        var r = t(e),
            e = e;
        n.init = function () {
            n.settings = t.extend({}, o, i), n.settings.onInit(), "" == n.settings.layout && void 0 !== r.attr("data-photoset-layout") && (n.settings.layout = r.attr("data-photoset-layout"));
            var e = n.settings.layout.split("");
            for (a in e) e[a] = parseInt(e[a]);
            var s = 0,
                l = r.find("img");
            t.each(e, function (t, e) {
                var i = s,
                    o = e + s;
                l.slice(i, o).wrapAll('<div class="photosetRow cols' + e + '"></div>'), s = o
            }), r.css({
                width: n.settings.width,
                "font-size": "0px"
            });
            var h = n.settings.margin + "px",
                c = 2 * n.settings.margin + "px";
            r.find("img").css({
                display: "inline-block",
                "vertical-align": "top",
                "margin-left": h,
                "margin-right": h
            }), r.find(".photosetRow img:first-child").css({
                "margin-left": "0px"
            }), r.find(".cols1 img").css({
                margin: "0px"
            }), r.find(".photosetRow img:last-child").css({
                "margin-right": "0px"
            }), r.find(".photosetRow").css({
                overflow: "hidden",
                "white-space": "nowrap",
                "margin-bottom": c
            }), r.find(".photosetRow:last-child").css({
                "margin-bottom": "0px"
            }), r.find(".cols1 img").width("100%"), r.find(".cols2 img").width("50%"), r.find(".cols3 img").width("33.4%"), r.find("img").height("auto"), r.find(".photosetRow").each(function () {
                var e = t(this).find("img:eq(0)");
                t(this).find("img").each(function () {
                    t(this).height() < e.height() && (e = t(this))
                }), t(this).data("$smallestImg", e)
            }), n.resizePhotoset(), 1 == n.settings.links && r.find("img").each(function () {
                var e = t(this).attr("data-highres"),
                    i = t(this).attr("data-500px");
                if (void 0 !== e) var o = e;
                else var o = i;
                var n = t(this).attr("alt"),
                    a = t(this).parent().parent().attr("data-photoset-id"),
                    r = '<a href="' + o + '" rel="' + a + '" title="' + n + '"></a>';
                t(this).wrap(r)
            }), n.settings.onComplete()
        }, n.resizePhotoset = function () {
            r.find(".photosetRow").each(function () {
                var e = t(this).data("$smallestImg").height();
                t(this).height(e), t(this).find("img").each(function () {
                    var i = .5 * (e - t(this).height()) + "px";
                    t(this).css({
                        "margin-top": i
                    })
                })
            }), r.find("img").each(function () {
                if (t(this).width() > 250 && 500 >= t(this).width() && "500" !== t(this).attr("data-img-size") && "highres" !== t(this).attr("data-img-size")) {
                    var e = t(this).attr("data-500px");
                    t(this).attr("src", e), t(this).attr("data-img-size", "500")
                }
                if (t(this).width() > 500 && "highres" !== t(this).attr("data-img-size")) {
                    var e = t(this).attr("data-highres");
                    void 0 !== e && (t(this).attr("src", e), t(this).attr("data-img-size", "highres"))
                }
            })
        }, n.init()
    }, t.fn.tumblrPhotoset = function (e) {
        return this.each(function () {
            if (void 0 == t(this).data("tumblrPhotoset")) {
                var i = new t.tumblrPhotoset(this, e);
                t(this).data("tumblrPhotoset", i)
            }
        })
    }
}(jQuery),
function (t) {
    t.fn.imagesLoaded = function (t) {
        function e() {
            t.call(o, n)
        }

        function i(t) {
            0 >= --a && t.target.src !== r && (setTimeout(e), n.unbind("load error", i))
        }
        var o = this,
            n = o.find("img").add(o.filter("img")),
            a = n.length,
            r = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        return a || e(), n.bind("load error", i).each(function () {
            if (this.complete || this.complete === undefined) {
                var t = this.src;
                this.src = r, this.src = t
            }
        }), o
    }
}(jQuery),
function (t, e, i) {
    function o(e) {
        if (!W) {
            if ($ = e, r(), w = t($), B = 0, "nofollow" !== A.rel && (w = t("." + K).filter(function () {
                var e = t.data(this, Q).rel || this.rel;
                return e === A.rel
            }), B = w.index($), -1 === B && (w = w.add($), B = w.length - 1)), !E) {
                if (E = L = !0, d.show(), A.returnFocus) try {
                    $.blur(), t($).one(X, function () {
                        try {
                            this.focus()
                        } catch (t) {}
                    })
                } catch (i) {}
                c.css({
                    opacity: +A.opacity,
                    cursor: A.overlayClose ? "pointer" : "auto"
                }).show(), A.w = l(A.initialWidth, "x"), A.h = l(A.initialHeight, "y"), O.position(), ee && b.bind("resize." + ie + " scroll." + ie, function () {
                    c.css({
                        width: b.width(),
                        height: b.height(),
                        top: b.scrollTop(),
                        left: b.scrollLeft()
                    })
                }).trigger("resize." + ie), a(V, A.onOpen), N.add(C).hide(), z.html(A.close).show()
            }
            O.load(!0)
        }
    }

    function n() {
        var t, e, i, o = U + "Slideshow_",
            n = "click." + U;
        A.slideshow && w[1] ? (e = function () {
            S.text(A.slideshowStop).unbind(n).bind(J, function () {
                (w.length - 1 > B || A.loop) && (t = setTimeout(O.next, A.slideshowSpeed))
            }).bind(G, function () {
                clearTimeout(t)
            }).one(n + " " + Y, i), d.removeClass(o + "off").addClass(o + "on"), t = setTimeout(O.next, A.slideshowSpeed)
        }, i = function () {
            clearTimeout(t), S.text(A.slideshowStart).unbind([J, G, Y, n].join(" ")).one(n, e), d.removeClass(o + "on").addClass(o + "off")
        }, A.slideshowAuto ? e() : i()) : d.removeClass(o + "off " + o + "on")
    }

    function a(e, i) {
        i && i.call($), t.event.trigger(e)
    }

    function r(e) {
        A = t.extend({}, t.data($, Q));
        for (e in A) t.isFunction(A[e]) && "on" !== e.substring(0, 2) && (A[e] = A[e].call($));
        A.rel = A.rel || $.rel || "nofollow", A.href = A.href || t($).attr("href"), A.title = A.title || $.title, "string" == typeof A.href && (A.href = t.trim(A.href))
    }

    function s(t) {
        return A.photo || /\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(t)
    }

    function l(t, e) {
        return Math.round((/%/.test(t) ? ("x" === e ? b.width() : b.height()) / 100 : 1) * parseInt(t, 10))
    }

    function h(i, o, n) {
        return n = e.createElement("div"), i && (n.id = U + i), n.style.cssText = o || "", t(n)
    }
    var c, d, f, u, m, p, g, v, w, b, y, x, k, C, T, S, j, _, z, N, A, I, M, P, D, $, B, H, E, L, W, R, F, O, q = {
            transition: "elastic",
            speed: 300,
            width: !1,
            initialWidth: "600",
            innerWidth: !1,
            maxWidth: !1,
            height: !1,
            initialHeight: "450",
            innerHeight: !1,
            maxHeight: !1,
            scalePhotos: !0,
            scrolling: !0,
            inline: !1,
            html: !1,
            iframe: !1,
            fastIframe: !0,
            photo: !1,
            href: !1,
            title: !1,
            rel: !1,
            opacity: .9,
            preloading: !0,
            current: "image {current} of {total}",
            previous: "previous",
            next: "next",
            close: "close",
            open: !1,
            returnFocus: !0,
            loop: !0,
            slideshow: !1,
            slideshowAuto: !0,
            slideshowSpeed: 2500,
            slideshowStart: "start slideshow",
            slideshowStop: "stop slideshow",
            onOpen: !1,
            onLoad: !1,
            onComplete: !1,
            onCleanup: !1,
            onClosed: !1,
            overlayClose: !0,
            escKey: !0,
            arrowKey: !0,
            top: !1,
            bottom: !1,
            left: !1,
            right: !1,
            fixed: !1,
            data: !1
        }, Q = "colorbox",
        U = "cbox",
        K = U + "Element",
        V = U + "_open",
        G = U + "_load",
        J = U + "_complete",
        Y = U + "_cleanup",
        X = U + "_closed",
        Z = U + "_purge",
        te = t.browser.msie && !t.support.opacity,
        ee = te && 7 > t.browser.version,
        ie = U + "_IE6";
    O = t.fn[Q] = t[Q] = function (e, i) {
        var n = this;
        if (e = e || {}, !n[0]) {
            if (n.selector) return n;
            n = t("<a/>"), e.open = !0
        }
        return i && (e.onComplete = i), n.each(function () {
            t.data(this, Q, t.extend({}, t.data(this, Q) || q, e)), t(this).addClass(K)
        }), (t.isFunction(e.open) && e.open.call(n) || e.open) && o(n[0]), n
    }, O.init = function () {
        b = t(i), d = h().attr({
            id: Q,
            "class": te ? U + (ee ? "IE6" : "IE") : ""
        }), c = h("Overlay", ee ? "position:absolute" : "").hide(), f = h("Wrapper"), u = h("Content").append(y = h("LoadedContent", "width:0; height:0; overflow:hidden"), k = h("LoadingOverlay").add(h("LoadingGraphic")), C = h("Title"), T = h("Current"), j = h("Next"), _ = h("Previous"), S = h("Slideshow").bind(V, n), z = h("Close")), f.append(h().append(h("TopLeft"), m = h("TopCenter"), h("TopRight")), h(!1, "clear:left").append(p = h("MiddleLeft"), u, g = h("MiddleRight")), h(!1, "clear:left").append(h("BottomLeft"), v = h("BottomCenter"), h("BottomRight"))).children().children().css({
            "float": "left"
        }), x = h(!1, "position:absolute; width:9999px; visibility:hidden; display:none"), t("body").prepend(c, d.append(f, x)), u.children().hover(function () {
            t(this).addClass("hover")
        }, function () {
            t(this).removeClass("hover")
        }).addClass("hover"), I = m.height() + v.height() + u.outerHeight(!0) - u.height(), M = p.width() + g.width() + u.outerWidth(!0) - u.width(), P = y.outerHeight(!0), D = y.outerWidth(!0), d.css({
            "padding-bottom": I,
            "padding-right": M
        }).hide(), j.click(function () {
            O.next()
        }), _.click(function () {
            O.prev()
        }), z.click(function () {
            O.close()
        }), N = j.add(_).add(T).add(S), u.children().removeClass("hover"), c.click(function () {
            A.overlayClose && O.close()
        }), t(e).bind("keydown." + U, function (t) {
            var e = t.keyCode;
            E && A.escKey && 27 === e && (t.preventDefault(), O.close()), E && A.arrowKey && w[1] && (37 === e ? (t.preventDefault(), _.click()) : 39 === e && (t.preventDefault(), j.click()))
        })
    }, O.remove = function () {
        d.add(c).remove(), t("." + K).removeData(Q).removeClass(K)
    }, O.position = function (t, i) {
        function o(t) {
            m[0].style.width = v[0].style.width = u[0].style.width = t.style.width, k[0].style.height = k[1].style.height = u[0].style.height = p[0].style.height = g[0].style.height = t.style.height
        }
        var n = 0,
            a = 0;
        b.unbind("resize." + U), d.hide(), A.fixed && !ee ? d.css({
            position: "fixed"
        }) : (n = b.scrollTop(), a = b.scrollLeft(), d.css({
            position: "absolute"
        })), a += A.right !== !1 ? Math.max(b.width() - A.w - D - M - l(A.right, "x"), 0) : A.left !== !1 ? l(A.left, "x") : Math.round(Math.max(b.width() - A.w - D - M, 0) / 2), n += A.bottom !== !1 ? Math.max(e.documentElement.clientHeight - A.h - P - I - l(A.bottom, "y"), 0) : A.top !== !1 ? l(A.top, "y") : Math.round(Math.max(e.documentElement.clientHeight - A.h - P - I, 0) / 2), d.show(), t = d.width() === A.w + D && d.height() === A.h + P ? 0 : t || 0, f[0].style.width = f[0].style.height = "9999px", d.dequeue().animate({
            width: A.w + D,
            height: A.h + P,
            top: n,
            left: a
        }, {
            duration: t,
            complete: function () {
                o(this), L = !1, f[0].style.width = A.w + D + M + "px", f[0].style.height = A.h + P + I + "px", i && i(), setTimeout(function () {
                    b.bind("resize." + U, O.position)
                }, 1)
            },
            step: function () {
                o(this)
            }
        })
    }, O.resize = function (t) {
        if (E) {
            if (t = t || {}, t.width && (A.w = l(t.width, "x") - D - M), t.innerWidth && (A.w = l(t.innerWidth, "x")), y.css({
                width: A.w
            }), t.height && (A.h = l(t.height, "y") - P - I), t.innerHeight && (A.h = l(t.innerHeight, "y")), !t.innerHeight && !t.height) {
                var e = y.wrapInner("<div style='overflow:auto'></div>").children();
                A.h = e.height(), e.replaceWith(e.children())
            }
            y.css({
                height: A.h
            }), O.position("none" === A.transition ? 0 : A.speed)
        }
    }, O.prep = function (e) {
        function i() {
            return A.h = A.h || y.height(), A.h = A.mh && A.mh < A.h ? A.mh : A.h, A.h
        }

        function o() {
            return A.w = A.w || y.width(), A.w = A.mw && A.mw < A.w ? A.mw : A.w, A.w
        }
        if (E) {
            var n, r = "none" === A.transition ? 0 : A.speed;
            y.remove(), y = h("LoadedContent").append(e), y.hide().appendTo(x.show()).css({
                width: o(),
                overflow: A.scrolling ? "auto" : "hidden"
            }).css({
                height: i()
            }).prependTo(u), x.hide(), t(H).css({
                "float": "none"
            }), ee && t("select").not(d.find("select")).filter(function () {
                return "hidden" !== this.style.visibility
            }).css({
                visibility: "hidden"
            }).one(Y, function () {
                this.style.visibility = "inherit"
            }), n = function () {
                function e() {
                    te && d[0].style.removeAttribute("filter")
                }
                var i, o, n, l, h, c, f = w.length;
                !E || (c = function () {
                    clearTimeout(F), k.hide(), a(J, A.onComplete)
                }, te && H && y.fadeIn(100), C.html(A.title).add(y).show(), f > 1 ? ("string" == typeof A.current && T.html(A.current.replace("{current}", B + 1).replace("{total}", f)).show(), j[A.loop || f - 1 > B ? "show" : "hide"]().html(A.next), _[A.loop || B ? "show" : "hide"]().html(A.previous), i = B ? w[B - 1] : w[f - 1], n = f - 1 > B ? w[B + 1] : w[0], A.slideshow && S.show(), A.preloading && (l = t.data(n, Q).href || n.href, o = t.data(i, Q).href || i.href, l = t.isFunction(l) ? l.call(n) : l, o = t.isFunction(o) ? o.call(i) : o, s(l) && (t("<img/>")[0].src = l), s(o) && (t("<img/>")[0].src = o))) : N.hide(), A.iframe ? (h = t("<iframe/>").addClass(U + "Iframe")[0], A.fastIframe ? c() : t(h).one("load", c), h.name = U + +new Date, h.src = A.href, A.scrolling || (h.scrolling = "no"), te && (h.frameBorder = 0, h.allowTransparency = "true"), t(h).appendTo(y).one(Z, function () {
                    h.src = "//about:blank"
                })) : c(), "fade" === A.transition ? d.fadeTo(r, 1, e) : e())
            }, "fade" === A.transition ? d.fadeTo(r, 0, function () {
                O.position(0, n)
            }) : O.position(r, n)
        }
    }, O.load = function (e) {
        var i, o, n = O.prep;
        L = !0, H = !1, $ = w[B], e || r(), a(Z), a(G, A.onLoad), A.h = A.height ? l(A.height, "y") - P - I : A.innerHeight && l(A.innerHeight, "y"), A.w = A.width ? l(A.width, "x") - D - M : A.innerWidth && l(A.innerWidth, "x"), A.mw = A.w, A.mh = A.h, A.maxWidth && (A.mw = l(A.maxWidth, "x") - D - M, A.mw = A.w && A.w < A.mw ? A.w : A.mw), A.maxHeight && (A.mh = l(A.maxHeight, "y") - P - I, A.mh = A.h && A.h < A.mh ? A.h : A.mh), i = A.href, F = setTimeout(function () {
            k.show()
        }, 100), A.inline ? (h().hide().insertBefore(t(i)[0]).one(Z, function () {
            t(this).replaceWith(y.children())
        }), n(t(i))) : A.iframe ? n(" ") : A.html ? n(A.html) : s(i) ? (t(H = new Image).addClass(U + "Photo").error(function () {
            A.title = !1, n(h("Error").text("This image could not be loaded"))
        }).load(function () {
            var t;
            H.onload = null, A.scalePhotos && (o = function () {
                H.height -= H.height * t, H.width -= H.width * t
            }, A.mw && H.width > A.mw && (t = (H.width - A.mw) / H.width, o()), A.mh && H.height > A.mh && (t = (H.height - A.mh) / H.height, o())), A.h && (H.style.marginTop = Math.max(A.h - H.height, 0) / 2 + "px"), w[1] && (w.length - 1 > B || A.loop) && (H.style.cursor = "pointer", H.onclick = function () {
                O.next()
            }), te && (H.style.msInterpolationMode = "bicubic"), setTimeout(function () {
                n(H)
            }, 1)
        }), setTimeout(function () {
            H.src = i
        }, 1)) : i && x.load(i, A.data, function (e, i, o) {
            n("error" === i ? h("Error").text("Request unsuccessful: " + o.statusText) : t(this).contents())
        })
    }, O.next = function () {
        !L && w[1] && (w.length - 1 > B || A.loop) && (B = w.length - 1 > B ? B + 1 : 0, O.load())
    }, O.prev = function () {
        !L && w[1] && (B || A.loop) && (B = B ? B - 1 : w.length - 1, O.load())
    }, O.close = function () {
        E && !W && (W = !0, E = !1, a(Y, A.onCleanup), b.unbind("." + U + " ." + ie), c.fadeTo(200, 0), d.stop().fadeTo(300, 0, function () {
            d.add(c).css({
                opacity: 1,
                cursor: "auto"
            }).hide(), a(Z), y.remove(), setTimeout(function () {
                W = !1, a(X, A.onClosed)
            }, 1)
        }))
    }, O.element = function () {
        return t($)
    }, O.settings = q, R = function (t) {
        0 !== t.button && t.button !== void 0 || t.ctrlKey || t.shiftKey || t.altKey || (t.preventDefault(), o(this))
    }, t.fn.delegate ? t(e).delegate("." + K, "click", R) : t("." + K).live("click", R), t(O.init)
}(jQuery, document, this),
function (t) {
    t.fn.fitVids = function (e) {
        var i = {
            customSelector: null
        }, o = document.createElement("div"),
            n = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
        return o.className = "fit-vids-style", o.innerHTML = "&shy;<style>               .fluid-width-video-wrapper {                 width: 100%;                              position: relative;                       padding: 0;                            }                                                                                   .fluid-width-video-wrapper iframe,        .fluid-width-video-wrapper object,        .fluid-width-video-wrapper embed {           position: absolute;                       top: 0;                                   left: 0;                                  width: 100%;                              height: 100%;                          }                                       </style>", n.parentNode.insertBefore(o, n), e && t.extend(i, e), this.each(function () {
            var e = ["iframe[src^='http://player.vimeo.com']", "iframe[src^='http://www.youtube.com']", "iframe[src^='https://www.youtube.com']", "iframe[src^='http://www.kickstarter.com']", "iframe[src^='//www.tumblr.com']", "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var o = t(this).find(e.join(","));
            o.each(function () {
                var e = t(this);
                if (!("embed" == this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    var i = "object" == this.tagName.toLowerCase() ? e.attr("height") : e.height(),
                        o = i / e.width();
                    if (!e.attr("id")) {
                        var n = "fitvid" + Math.floor(999999 * Math.random());
                        e.attr("id", n)
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * o + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(jQuery),
function (t) {
    t.tumblrShare = function (e, i) {
        var o = {
            url: "",
            title: "",
            media: "",
            via: "",
            twitter: !0,
            facebook: !0,
            gplus: !0,
            pinterest: !1,
            size: "horizontal",
            onInit: function () {},
            onComplete: function () {}
        }, n = this;
        n.settings = {};
        var a = t(e),
            e = e;
        n.init = function () {
            n.settings = t.extend({}, o, i), n.settings.onInit();
            var e = encodeURIComponent(n.settings.url),
                r = encodeURIComponent(n.settings.media);
            if (n.settings.twitter) {
                var s = t('<div class="share-button share-twitter"></div>'),
                    l = t('<a href="http://twitter.com/share" class="twitter-share-button" data-url="' + n.settings.url + '" data-via=' + n.settings.via + "></a>");
                "horizontal" == n.settings.size && l.attr("data-count", "horizontal"), "vertical" == n.settings.size && l.attr("data-count", "vertical"), s.append(l), a.append(s)
            }
            if (n.settings.facebook) {
                var h = t('<div class="share-button share-facebook"></div>');
                if ("horizontal" == n.settings.size) var c = t('<iframe src="http://www.facebook.com/plugins/like.php?href=' + e + '&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe>');
                if ("vertical" == n.settings.size) var c = t('<iframe src="http://www.facebook.com/plugins/like.php?href=' + e + '&amp;send=false&amp;layout=box_count&amp;show_faces=false&amp;action=like&amp;font=lucida+grande&amp;colorscheme=light&amp;height=65&amp;width=55" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:65px;" allowTransparency="true"></iframe>');
                h.append(c), a.append(h)
            }
            if (n.settings.gplus) {
                var d = t('<div class="share-button share-gplus"></div>'),
                    f = t('<g:plusone href="' + n.settings.url + '"></g:plusone>');
                "horizontal" == n.settings.size && f.attr("size", "medium"), "vertical" == n.settings.size && f.attr("size", "tall"), d.append(f), a.append(d)
            }
            if (n.settings.pinterest) {
                var u = t('<div class="share-button share-pinterest"></div>'),
                    m = t('<a href="http://pinterest.com/pin/create/button/?url=' + e + "&media=" + r + '" class="pin-it-button"><img border="0" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a>');
                "horizontal" == n.settings.size && m.attr("count-layout", "horizontal"), "vertical" == n.settings.size && m.attr("count-layout", "vertical"), u.append(m), a.append(u)
            }
            n.settings.onComplete()
        }, n.init()
    }, t.fn.tumblrShare = function (e) {
        return this.each(function () {
            if (void 0 === t(this).data("tumblrShare")) {
                var i = new t.tumblrShare(this, e);
                t(this).data("tumblrShare", i)
            }
        })
    }
}(jQuery),
function (t) {
    t.fn.infinitescroll = function (e, i) {
        function o() {
            m.debug && window.console && console.log.call(console, arguments)
        }

        function n(e) {
            for (var i in e) return i.indexOf && i.indexOf("Selector") > -1 && 0 === t(e[i]).length ? (o("Your " + i + " found no elements."), !1) : !0
        }

        function a(t) {
            if (t.match(g) ? t.match(g)[2] : t, t.match(/^(.*?)\b2\b(.*?$)/)) t = t.match(/^(.*?)\b2\b(.*?$)/).slice(1);
            else if (t.match(/^(.*?)2(.*?$)/)) {
                if (t.match(/^(.*?page=)2(\/.*|$)/)) return t = t.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                o("Trying backup next selector parse technique. Treacherous waters here, matey."), t = t.match(/^(.*?)2(.*?$)/).slice(1)
            } else {
                if (t.match(/^(.*?page=)1(\/.*|$)/)) return t = t.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                o("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."), p.isInvalidPage = !0
            }
            return t
        }

        function r() {
            return m.localMode ? t(p.container)[0].scrollHeight && t(p.container)[0].scrollHeight : t(document).height()
        }

        function s() {
            var e = 0 + r() - (m.localMode ? t(p.container).scrollTop() : t(p.container).scrollTop() || t(p.container.ownerDocument.body).scrollTop()) - t(m.localMode ? p.container : window).height();
            return o("math:", e, p.pixelsFromNavToBottom), e - m.bufferPx < p.pixelsFromNavToBottom
        }

        function l() {
            p.loadingMsg.find("img").hide().parent().find("div").html(m.donetext).animate({
                opacity: 1
            }, 2e3, function () {
                t(this).parent().fadeOut("normal")
            }), m.errorCallback()
        }

        function h() {
            p.isDuringAjax || p.isInvalidPage || p.isDone || s(m, p) && t(document).trigger("retrieve.infscr")
        }

        function c() {
            p.isDuringAjax = !0, p.loadingMsg.appendTo(m.loadMsgSelector).show(), t(m.navSelector).hide(), p.currPage++, o("heading into ajax", v), f = t(m.contentSelector).is("table") ? t("<tbody/>") : t("<div/>"), u = document.createDocumentFragment(), f.load(v.join(p.currPage) + " " + m.itemSelector, null, d)
        }

        function d() {
            if (p.isDone) return l(), !1;
            var e = f.children().get();
            if (0 == e.length) return t.event.trigger("ajaxError", [{
                status: 404
            }]);
            for (; f[0].firstChild;) u.appendChild(f[0].firstChild);
            if (t(m.contentSelector)[0].appendChild(u), p.loadingMsg.fadeOut("normal"), m.animate) {
                var o = t(window).scrollTop() + t("#infscr-loading").height() + m.extraScrollPx + "px";
                t("html,body").animate({
                    scrollTop: o
                }, 800, function () {
                    p.isDuringAjax = !1
                })
            }
            i.call(t(m.contentSelector)[0], e), m.animate || (p.isDuringAjax = !1)
        }
        t.browser.ie6 = t.browser.msie && 7 > t.browser.version;
        var f, u, m = t.extend({}, t.infinitescroll.defaults, e),
            p = t.infinitescroll;
        if (i = i || function () {}, !n(m)) return !1;
        p.container = m.localMode ? this : document.documentElement, m.contentSelector = m.contentSelector || this, m.loadMsgSelector = m.loadMsgSelector || m.contentSelector;
        var g = /(.*?\/\/).*?(\/.*)/,
            v = t(m.nextSelector).attr("href");
        return v ? (v = a(v), m.localMode && (t(p.container)[0].scrollTop = 0), p.pixelsFromNavToBottom = r() + (p.container == document.documentElement ? 0 : t(p.container).offset().top) - t(m.navSelector).offset().top, p.loadingMsg = t('<div id="infscr-loading" style="text-align: center;"><img alt="Loading..." src="' + m.loadingImg + '" /><div>' + m.loadingText + "</div></div>"), (new Image).src = m.loadingImg, t(document).ajaxError(function (e, i) {
            o("Page not found. Self-destructing..."), 404 == i.status && (l(), p.isDone = !0, t(m.localMode ? this : window).unbind("scroll.infscr"))
        }), t(m.localMode ? this : window).bind("scroll.infscr", h).trigger("scroll.infscr"), t(document).bind("retrieve.infscr", c), this) : (o("Navigation selector not found"), void 0)
    }, t.infinitescroll = {
        defaults: {
            debug: !1,
            preload: !1,
            nextSelector: "div.navigation a:first",
            loadingImg: "http://www.infinite-scroll.com/loading.gif",
            loadingText: "<em>Loading the next set of posts...</em>",
            donetext: "<em>Congratulations, you've reached the end of the internet.</em>",
            navSelector: "div.navigation",
            contentSelector: null,
            loadMsgSelector: null,
            extraScrollPx: 150,
            itemSelector: "div.post",
            animate: !1,
            localMode: !1,
            bufferPx: 40,
            errorCallback: function () {}
        },
        loadingImg: void 0,
        loadingMsg: void 0,
        container: void 0,
        currPage: 1,
        currDOMChunk: null,
        isDuringAjax: !1,
        isInvalidPage: !1,
        isDone: !1
    }
}(jQuery), window.log = function () {
    log.history = log.history || [], log.history.push(arguments), this.console && console.log(Array.prototype.slice.call(arguments))
};