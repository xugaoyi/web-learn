function CTextButton(a, f, c, e, b, g, d) {
    var k, l, h, p, q;
    this._init = function(a, d, b, g, c, e, f) {
        k = [];
        l = [];
        c = createBitmap(b);
        var z = Math.ceil(f / 20);
        q = new createjs.Text(g, "bold " + f + "px " + PRIMARY_FONT, "#000000");
        q.textAlign = "center";
        q.textBaseline = "alphabetic";
        var w = q.getBounds();
        q.x = b.width / 2 + z;
        q.y = Math.floor(b.height / 2) + w.height / 3 + z;
        p = new createjs.Text(g, "bold " + f + "px " + PRIMARY_FONT, e);
        p.textAlign = "center";
        p.textBaseline = "alphabetic";
        w = p.getBounds();
        p.x = b.width / 2;
        p.y = Math.floor(b.height / 2) + w.height / 3;
        h = new createjs.Container;
        h.x = a;
        h.y = d;
        h.regX = b.width / 2;
        h.regY = b.height / 2;
        h.addChild(c, q, p);
        s_oStage.addChild(h);
        s_bMobile || (h.cursor = "pointer");
        this._initListener()
    };
    this.unload = function() {
        h.off("mousedown");
        h.off("pressup");
        s_oStage.removeChild(h)
    };
    this.setVisible = function(a) {
        h.visible = a
    };
    this._initListener = function() {
        oParent = this;
        h.on("mousedown", this.buttonDown);
        h.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(h, a, b) {
        k[h] = a;
        l[h] = b
    };
    this.buttonRelease = function() {
        h.scaleX = 1;
        h.scaleY = 1;
        k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(l[ON_MOUSE_UP])
    };
    this.buttonDown = function() {
        h.scaleX = .9;
        h.scaleY = .9;
        k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN])
    };
    this.setTextPosition = function(h) {
        p.y = h;
        q.y = h + 2
    };
    this.setPosition = function(a, b) {
        h.x = a;
        h.y = b
    };
    this.setX = function(a) {
        h.x = a
    };
    this.setY = function(a) {
        h.y = a
    };
    this.getButtonImage = function() {
        return h
    };
    this.getX = function() {
        return h.x
    };
    this.getY = function() {
        return h.y
    };
    this._init(a, f, c, e, b, g, d);
    return this
}

function CScoreBoard(a, f, c, e) {
    var b, g, d, k, l;
    this._init = function(h, a, c) {
        l = {
            x: h,
            y: a
        };
        k = new createjs.Container;
        k.x = h;
        k.y = a;
        e.addChild(k);
        b = createBitmap(c);
        b.regX = .5 * c.width;
        b.regY = .5 * c.height;
        k.addChild(b);
        d = new createjs.Text(TEXT_SCORE + "\n0", "36px " + PRIMARY_FONT, "#025cce");
        d.x = 0;
        d.y = -26;
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.outline = 4;
        d.lineHeight = 50;
        k.addChild(d);
        g = new createjs.Text(TEXT_SCORE + "\n0", "36px " + PRIMARY_FONT, "#ffd800");
        g.x = 0;
        g.y = -26;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.lineHeight = 50;
        k.addChild(g)
    };
    this.refreshScore = function(a) {
        g.text = TEXT_SCORE + "\n" + a;
        d.text = TEXT_SCORE + "\n" + a
    };
    this.getStartPos = function() {
        return l
    };
    this.setPosition = function(a, b) {
        k.x = a;
        k.y = b
    };
    this._init(a, f, c);
    return this
}

function CPreloader() {
    var a, f, c, e, b, g, d;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        d = new createjs.Container;
        s_oStage.addChild(d)
    };
    this.unload = function() {
        d.removeAllChildren()
    };
    this.hide = function() {
        var a = this;
        setTimeout(function() {
            createjs.Tween.get(g).to({
                alpha: 1
            }, 500).call(function() {
                a.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var k = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        d.addChild(k);
        k = s_oSpriteLibrary.getSprite("progress_bar");
        e = createBitmap(k);
        e.x = CANVAS_WIDTH / 2 - k.width / 2;
        e.y = CANVAS_HEIGHT - 240;
        d.addChild(e);
        a = k.width;
        f = k.height;
        b = new createjs.Shape;
        b.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, 1, f);
        d.addChild(b);
        e.mask =
            b;
        c = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT - 250;
        c.shadow = new createjs.Shadow("#000", 2, 2, 2);
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        d.addChild(c);
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.alpha = 0;
        d.addChild(g)
    };
    this.refreshLoader = function(d) {
        c.text = d + "%";
        b.graphics.clear();
        d = Math.floor(d * a / 100);
        b.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(e.x, e.y, d, f)
    };
    this._init()
}

function CPause() {
    var a, f, c;
    this._init = function() {
        a = new createjs.Container;
        a.alpha = 0;
        f = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        f.alpha = 1;
        f.on("click", function() {});
        a.addChild(f);
        var e = s_oSpriteLibrary.getSprite("pause_text");
        c = createBitmap(e);
        c.x = CANVAS_WIDTH_HALF;
        c.y = CANVAS_HEIGHT_HALF - 200;
        c.regX = .5 * e.width;
        c.regY = .5 * e.height;
        a.addChild(c);
        e = s_oSpriteLibrary.getSprite("but_continue");
        (new CGfxButton(.5 * CANVAS_WIDTH, .5 * CANVAS_HEIGHT + 100, e, a)).addEventListener(ON_MOUSE_UP, this._onLeavePause,
            this);
        s_oStage.addChild(a);
        this.onPause(!0);
        createjs.Tween.get(a).to({
            alpha: 1
        }, 300, createjs.quartOut).call(function() {
            createjs.Ticker.paused = !0
        })
    };
    this.onPause = function(a) {
        s_oGame.setPause(a);
        s_oGame.canInput(!a)
    };
    this.unload = function() {
        f.off("click", function() {});
        s_oStage.removeChild(a)
    };
    this._onLeavePause = function() {
        playSound("click", 1, 0);
        createjs.Ticker.paused = !1;
        createjs.Tween.removeTweens(a);
        var c = this;
        createjs.Tween.get(a).to({
            alpha: 0
        }, 300, createjs.quartIn).call(function() {
            c.onPause(!1);
            s_oInterface.unloadPause()
        })
    };
    this._init();
    return this
}

function CNumToggle(a, f, c, e) {
    var b, g, d, k, l, h, p, q = [];
    this._init = function(a, c, e, f) {
        g = !1;
        d = [];
        k = [];
        l = new createjs.Container;
        l.x = a;
        l.y = c;
        f.addChild(l);
        a = s_oSpriteLibrary.getSprite("num_button");
        c = {
            images: [a],
            framerate: 5,
            frames: {
                width: a.width / 2,
                height: a.height,
                regX: a.width / 2 / 2,
                regY: a.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        };
        c = new createjs.SpriteSheet(c);
        b = !1;
        h = createSprite(c, "state_" + b, a.width / 2 / 2, a.height / 2, a.width / 2, a.height);
        h.stop();
        a = s_oSpriteLibrary.getSprite("ball");
        c = {
            images: [a],
            frames: {
                width: a.width / NUM_DIFFERENT_BALLS,
                height: a.height,
                regX: a.width / NUM_DIFFERENT_BALLS / 2,
                regY: a.height / 2
            },
            animations: {
                red: [0],
                green: [1],
                cyan: [0],
                violet: [1],
                blue: [1]
            }
        };
        c = new createjs.SpriteSheet(c);
        p = createSprite(c, "red", a.width / NUM_DIFFERENT_BALLS / 2, a.height / 2, a.width / NUM_DIFFERENT_BALLS, a.height);
        p.gotoAndStop(0);
        p.visible = !1;
        l.addChild(h, p);
        this._initListener()
    };
    this.unload = function() {
        l.off("mousedown", this.buttonDown);
        l.off("pressup", this.buttonRelease);
        e.removeChild(l)
    };
    this._initListener =
        function() {
            l.on("mousedown", this.buttonDown);
            l.on("pressup", this.buttonRelease)
        };
    this.addEventListener = function(a, h, b) {
        d[a] = h;
        k[a] = b
    };
    this.addEventListenerWithParams = function(a, h, b, c) {
        d[a] = h;
        k[a] = b;
        q = c
    };
    this.setActive = function(a) {
        b = a;
        h.gotoAndStop("state_" + b)
    };
    this.buttonRelease = function() {
        g || (playSound("click", 1, 0), b = !b, h.gotoAndStop("state_" + b), d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(k[ON_MOUSE_UP], q))
    };
    this.buttonDown = function() {
        g || d[ON_MOUSE_DOWN] && d[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], q)
    };
    this.setPosition =
        function(a, h) {
            l.x = a;
            l.y = h
        };
    this.getGlobalPosition = function() {
        return {
            x: l.localToGlobal(0, 0).x,
            y: l.localToGlobal(0, 0).y
        }
    };
    this.block = function(a) {
        g = a
    };
    this.setExtracted = function(a, h) {
        p.visible = a;
        p.gotoAndStop(h)
    };
    this.highlight = function() {
        h.gotoAndPlay(0)
    };
    this.stopHighlight = function() {
        h.gotoAndStop(1)
    };
    this._init(a, f, c, e)
}

function CNextBlockBoard(a, f, c, e, b) {
    var g, d, k, l, h, p, q, u, r, m;
    this._init = function(a, b, c, e) {
        m = {
            x: a,
            y: b
        };
        l = new createjs.Container;
        l.x = a;
        l.y = b;
        q.addChild(l);
        k = createBitmap(e);
        k.regX = .5 * e.width;
        k.regY = .5 * e.height;
        l.addChild(k);
        g = new createjs.Text(TEXT_NEXT, "32px " + PRIMARY_FONT, "#025cce");
        g.x = 2;
        g.y = -k.regY + 53;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.outline = 5;
        l.addChild(g);
        d = new createjs.Text(g.text, "32px " + PRIMARY_FONT, "#ffd800");
        d.x = g.x;
        d.y = g.y;
        d.textAlign = "center";
        d.textBaseline = "middle";
        l.addChild(d);
        h = new createjs.Container;
        u = .15 * k.regX;
        r = .25 * k.regY + 16;
        l.addChild(h);
        this.createNextBlock(c)
    };
    this.createNextBlock = function(a) {
        p = new CNextBlock(BLOCKS_TYPE[a], s_oSpriteLibrary.getSprite("cell_" + a), h);
        h.x = u - p.getOffsetX();
        h.y = r - p.getOffsetY()
    };
    this.refreshBlock = function(a) {
        p.unload();
        this.createNextBlock(a)
    };
    this.getStartPos = function() {
        return m
    };
    this.setPosition = function(a, h) {
        l.x = a;
        l.y = h
    };
    q = b;
    this._init(a, f, e, c);
    return this
}

function CNextBlock(a, f, c) {
    var e, b, g;
    this._init = function(a, c) {
        b = 0;
        e = this.createSpriteBlock(a, c);
        this.orderCellsChildIndex()
    };
    this.createSpriteBlock = function(a, c) {
        for (var l = [], h = 0, e = 0, f = 0; f < a.length; f++) {
            for (var u = 0; u < a[f].length; u++) 1 === a[f][u] && l.push(this.createCell(h, e, c, 0)), h += CELL_SIZE + CELL_OFFSET.x;
            e += CELL_SIZE + CELL_OFFSET.y;
            h = 0
        }
        b = .5 * (CELL_SIZE + CELL_OFFSET.y) * a[0].length;
        g = .5 * (CELL_SIZE + CELL_OFFSET.x) * a.length;
        return l
    };
    this.createCell = function(a, b, g, h) {
        g = new CCell(a, b, h, g, c);
        g.setPosition(a,
            b);
        return g
    };
    this.orderCellsChildIndex = function() {
        for (var a = c.numChildren - 1, b = 0; b < e.length; b++) e[b].setChildIndex(a), a--
    };
    this.getOffsetX = function() {
        return b
    };
    this.getOffsetY = function() {
        return g
    };
    this.unload = function() {
        for (var a = 0; a < e.length; a++) e[a].unload();
        e = null
    };
    this._init(a, f);
    return this
}

function CMenu() {
    var a, f, c, e, b, g, d, k, l, h, p;
    this._init = function() {
        b = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(b);
        var d = s_oSpriteLibrary.getSprite("logo_menu");
        p = createBitmap(d);
        p.x = CANVAS_WIDTH_HALF;
        p.y = .5 * -d.width;
        p.regX = .5 * d.width;
        p.regY = .5 * d.height;
        p.rotation = -15;
        s_oStage.addChild(p);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) d = s_oSpriteLibrary.getSprite("icon_audio"), c = CANVAS_WIDTH - d.width / 2 + 15, e = d.height / 2 + 30, h = new CToggle(c, e, d, s_bAudioActive), h.addEventListener(ON_MOUSE_UP,
            this._onAudioToggle, this);
        d = s_oSpriteLibrary.getSprite("but_play");
        g = new CGfxButton(CANVAS_WIDTH / 2, 1100, d);
        g.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        g.pulseAnimation();
        d = s_oSpriteLibrary.getSprite("but_info");
        a = d.width / 2 + 30;
        f = d.height / 2 + 30;
        k = new CGfxButton(a, f, d);
        k.addEventListener(ON_MOUSE_UP, this._onCredits, this);
        l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(l);
        createjs.Tween.get(p).wait(300).to({
            rotation: 0
        }, 1E3, createjs.Ease.cubicOut);
        createjs.Tween.get(p).wait(300).to({
            y: CANVAS_HEIGHT_HALF - 100
        }, 1E3, createjs.Ease.bounceOut);
        createjs.Tween.get(l).to({
            alpha: 0
        }, 1E3).call(function() {
            s_oStage.removeChild(l)
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        g.unload();
        g = null;
        k.unload();
        k = null;
        d && (d.unload(), d = null);
        s_oStage.removeChild(b);
        b = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) h.unload(), h = null;
        s_oStage.removeAllChildren();
        s_oMenu = null
    };
    this.exitFromCredits = function() {};
    this.refreshButtonPos = function(b,
        d) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || h.setPosition(c - b, e + d);
        k.setPosition(a + b, f + d)
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onCredits = function() {
        new CCreditsPanel;
        playSound("click", 1, 0)
    };
    this._onButPlayRelease = function() {
        this.unload();
        playSound("click", 1, 0);
        s_oMain.gotoGame()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CMain(a) {
    var f, c = 0,
        e = 0,
        b = STATE_LOADING,
        g, d, k;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas", function(a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        navigator.userAgent.match(/Windows Phone/i) &&
            (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        d = new CPreloader
    };
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        f = !0
    };
    this.soundLoaded = function() {
        c++;
        d.refreshLoader(Math.floor(c / e * 100));
        if (c === e) {
            d.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) s_oSoundTrack = createjs.Sound.play("soundtrack", {
                loop: -1
            });
            this.gotoMenu()
        }
    };
    this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") ||
            0 < navigator.userAgent.indexOf("OPR") ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack"), createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over"), createjs.Sound.registerSound("./sounds/but_press.ogg", "click"), createjs.Sound.registerSound("./sounds/delete_lines.ogg", "delete_lines"), createjs.Sound.registerSound("./sounds/shift_piece.ogg", "shift_piece")) :
            (createjs.Sound.alternateExtensions = ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack"), createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over"), createjs.Sound.registerSound("./sounds/but_press.mp3", "click"), createjs.Sound.registerSound("./sounds/delete_lines.mp3", "delete_lines"), createjs.Sound.registerSound("./sounds/shift_piece.mp3", "shift_piece")), e += 5)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded,
            this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("icon_audio", "./sprites/icon_audio.png");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_continue",
            "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_not", "./sprites/but_not.png");
        s_oSpriteLibrary.addSprite("but_rotation", "./sprites/but_rotation.png");
        s_oSpriteLibrary.addSprite("small_logo", "./sprites/small_logo.png");
        s_oSpriteLibrary.addSprite("block_blur", "./sprites/block_blur.png");
        s_oSpriteLibrary.addSprite("block_rotation", "./sprites/block_rotation.png");
        s_oSpriteLibrary.addSprite("block_down", "./sprites/block_down.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("pause_text", "./sprites/pause_text.png");
        s_oSpriteLibrary.addSprite("cell", "./sprites/cell.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("next_board", "./sprites/next_board.png");
        s_oSpriteLibrary.addSprite("info_board", "./sprites/info_board.png");
        s_oSpriteLibrary.addSprite("score_board", "./sprites/score_board.png");
        s_oSpriteLibrary.addSprite("frame_top", "./sprites/frame_top.png");
        s_oSpriteLibrary.addSprite("frame_bottom", "./sprites/frame_bottom.png");
        s_oSpriteLibrary.addSprite("key_down", "./sprites/key_down.png");
        s_oSpriteLibrary.addSprite("key_up", "./sprites/key_up.png");
        s_oSpriteLibrary.addSprite("key_right", "./sprites/key_right.png");
        s_oSpriteLibrary.addSprite("key_left",
            "./sprites/key_left.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        for (var a = 0; a < BLOCKS_TYPE.length; a++) s_oSpriteLibrary.addSprite("cell_" + a, "./sprites/cell_" + a + ".png");
        e += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        c++;
        d.refreshLoader(Math.floor(c / e * 100));
        if (c === e) {
            d.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) s_oSoundTrack = createjs.Sound.play("soundtrack", {
                loop: -1
            });
            this.gotoMenu()
        }
    };
    this._onAllImagesLoaded =
        function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this.gotoMenu = function() {
        new CMenu;
        b = STATE_MENU
    };
    this.gotoGame = function() {
        k = new CGame(g);
        b = STATE_GAME;
        $(s_oMain).trigger("start_session")
    };
    this.stopUpdate = function() {
        f = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block")
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        f = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none")
    };
    this._update = function(a) {
        if (!1 !== f) {
            var h = (new Date).getTime();
            s_iTimeElaps = h - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = h;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            b === STATE_GAME && k.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    g = a;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_iAdsLevel = 1,
    s_iLevelReached = 1,
    s_aScores = [],
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack, s_oCanvas, s_oSpriteSheetLora;
TEXT_SCORE = "SCORE";
TEXT_SCORE_CASE = "Score";
TEXT_SCORE_GAMEOVER = "TOTAL SCORE";
TEXT_LEVEL_UPPERCASE = TEXT_LEVEL = "LEVEL";
TEXT_GAMEOVER = "GAME OVER";
TEXT_GAME_COMPLETED = "GAME COMPLETED";
TEXT_HOW_TO_PLAY = "HOW TO PLAY";
TEXT_HELP_ENEMY = "Escape from him";
TEXT_SELECT_A_LEVEL = "SELECT A LEVEL";
TEXT_PAUSE = "Pause";
TEXT_HELP_TNT = "Touch this to trigger an explosion";
TEXT_FINAL_SCORE = "FINAL SCORE";
TEXT_ARE_SURE = "ARE YOU SURE?";
TEXT_CREDITS_DEVELOPED = "DEVELOPED BY";
TEXT_LINK1 = "WWW.CODETHISLAB.COM";
TEXT_RESET = "ARE YOU SURE? ALL YOUR PREVIOUS SCORES WILL BE DELETED!";
TEXT_NEXT = "NEXT";
TEXT_LINES = "LINES";
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better";

function CInterface(a) {
    var f, c, e, b, g, d, k, l, h, p, q, u, r, m, n, t, v, y, z, w, x = null;
    this._init = function(a) {
        var q = s_oSpriteLibrary.getSprite("but_exit");
        f = CANVAS_WIDTH - q.width / 2 - 30;
        c = q.height / 2 + 30;
        p = new CGfxButton(f, c, q);
        p.addEventListener(ON_MOUSE_UP, this._onExit, this);
        var m = s_oSpriteLibrary.getSprite("but_pause");
        g = CANVAS_WIDTH - m.width / 2 - q.width - 30 - 15;
        d = m.height / 2 + 30;
        h = new CGfxButton(g, d, m);
        h.addEventListener(ON_MOUSE_UP, this.onButPauseRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) {
            var n = s_oSpriteLibrary.getSprite("icon_audio");
            e = CANVAS_WIDTH - n.width / 2 - m.width - q.width / 2 - 30 - 30;
            b = n.height / 2 + 30;
            l = new CToggle(e, b, n, s_bAudioActive);
            l.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this)
        }
        q = s_oSpriteLibrary.getSprite("next_board");
        v = new CNextBlockBoard(800, 417, q, a, s_oStage);
        a = s_oSpriteLibrary.getSprite("info_board");
        y = new CInfoBoard(800, 757, a, s_oStage);
        a = s_oSpriteLibrary.getSprite("score_board");
        z = new CScoreBoard(800, 1051, a, s_oStage);
        a = s_oSpriteLibrary.getSprite("small_logo");
        k = {
            x: .5 * a.width + 30,
            y: .5 * a.height + 30
        };
        w = createBitmap(a);
        w.x = k;
        w.y = k;
        w.regX = .5 * a.width;
        w.regY = .5 * a.height;
        s_oStage.addChild(w);
        !0 === SHOW_FPS && (u = new createjs.Text("", "normal 60px " + PRIMARY_FONT, "#ffd800"), u.textAlign = "center", u.textBaseline = "alphabetic", u.x = .5 * CANVAS_WIDTH + -330, u.y = .5 * CANVAS_HEIGHT + 550, r = new createjs.Text("", "normal 60px " + PRIMARY_FONT, "#025cce"), r.textAlign = "center", r.textBaseline = "alphabetic", r.x = .5 * CANVAS_WIDTH + -328, r.y = .5 * CANVAS_HEIGHT + 552, s_oStage.addChild(r, u));
        s_bMobile && (x = new CController);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(a, q) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || l.setPosition(e - a, b + q);
        h.setPosition(g - a, d + q);
        p.setPosition(f - a, c + q);
        var r = v.getStartPos();
        v.setPosition(r.x - a, r.y);
        r = y.getStartPos();
        y.setPosition(r.x - a, r.y);
        r = z.getStartPos();
        z.setPosition(r.x - a, r.y);
        w.x = k.x + a;
        w.y = k.y + q;
        null !== x && (r = x.getStartPositionControlLeft(), x.setPositionControlLeft(r.x + a, r.y - q), r = x.getStartPositionControlRight(), x.setPositionControlRight(r.x + a, r.y - q), r = x.getStartPositionControlUp(), x.setPositionControlUp(r.x -
            a, r.y - q), r = x.getStartPositionControlDown(), x.setPositionControlDown(r.x + a, r.y - q))
    };
    this.finishGame = function(a) {
        var h = s_oSpriteLibrary.getSprite("msg_box");
        n = new CCongratulations(h, a)
    };
    this._onButNextLevelRelease = function() {
        setVolume(s_oSoundTrack, .4);
        m = null;
        s_oGame.nextLevel()
    };
    this._onButSpaceBarRelease = function() {
        m && m._onContinue()
    };
    this._onButMenuRelease = function() {
        n && (n.unload(), n = null);
        playSound("click", 1, 0);
        s_oGame.onExit()
    };
    this.refreshScore = function(a) {
        z.refreshScore(a)
    };
    this.refreshLevel =
        function(a) {
            y.refreshLevel(a)
        };
    this.refreshLines = function(a) {
        y.refreshLines(a)
    };
    this.unloadPause = function() {
        t.unload();
        t = null
    };
    this.onButPauseRelease = function() {
        playSound("click", 1, 0);
        t = new CPause
    };
    this.onContinuePauseRelease = function() {
        t && t._onLeavePause()
    };
    this.showHelpPanel = function() {
        var a = s_oSpriteLibrary.getSprite("msg_box");
        q = new CHelpPanel(0, 0, a)
    };
    this.gameOver = function(a, h, b) {
        var c = s_oSpriteLibrary.getSprite("msg_box");
        new CGameOver(c, a, h, b)
    };
    this.unloadHelp = function() {
        q.unload();
        q = null
    };
    this._onButRestartLevelRelease = function() {
        s_oGame.restartLevelFromGameOver();
        p.block(!1)
    };
    this.showLevelNum = function(a) {
        var h = a + 1,
            b;
        a = new createjs.Text(TEXT_LEVEL + " " + h, "normal 90px " + PRIMARY_FONT, "#ffffff");
        a.textAlign = "left";
        a.textBaseline = "alphabetic";
        a.x = -90;
        a.y = 0;
        h = new createjs.Text(TEXT_LEVEL + " " + h, "normal 90px " + PRIMARY_FONT, "#000000");
        h.textAlign = "left";
        h.textBaseline = "alphabetic";
        h.x = -90;
        h.y = 0;
        h.outline = OUTLINE_TEXT + 1;
        b = new createjs.Container;
        b.addChild(h, a);
        b.scaleX = 0;
        b.scaleY = 0;
        b.x = CANVAS_WIDTH /
            2;
        b.y = CANVAS_HEIGHT / 2;
        s_oStage.addChild(b);
        createjs.Tween.get(b).to({
            scaleX: 1,
            scaleY: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            createjs.Tween.get(b).wait(500).to({
                scaleX: 0,
                scaleY: 0
            }, 1E3, createjs.Ease.elasticIn).call(function() {
                s_oStage.removeChild(b);
                s_oGame.setPause(!1);
                s_oGame.canInput(!0);
                s_oGame.startAnimEnemy("walk")
            })
        })
    };
    this.numLevel = function(a) {};
    this.unload = function() {
        p.unload();
        p = null;
        h.unload();
        h = null;
        null !== x && (x.unload(), x = null);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) l.unload(),
            l = null;
        s_oInterface = null
    };
    this.refreshNextBlock = function(a) {
        v.refreshBlock(a)
    };
    this.refreshFPS = function() {
        var a = Math.ceil(createjs.Ticker.getMeasuredFPS());
        u.text = "FPS:" + a;
        r.text = "FPS:" + a
    };
    this._onExit = function() {
        (new CAreYouSurePanel(s_oStage)).show();
        playSound("click", 1, 0)
    };
    this._onButRestartLevelRelease = function() {
        s_oGame.restartGame()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    s_oInterface = this;
    this._init(a);
    return this
}
var s_oInterface = null;

function CInfoBoard(a, f, c, e) {
    var b, g, d, k, l, h, p;
    this._init = function(a, c, f) {
        p = {
            x: a,
            y: c
        };
        h = new createjs.Container;
        h.x = a;
        h.y = c;
        e.addChild(h);
        b = createBitmap(f);
        b.regX = .5 * f.width;
        b.regY = .5 * f.height;
        h.addChild(b);
        d = new createjs.Text(TEXT_LEVEL + "\n0", "33px " + PRIMARY_FONT, "#025cce");
        d.x = 5;
        d.y = .5 * -b.regY - 8;
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.outline = 4;
        d.lineHeight = 50;
        h.addChild(d);
        g = new createjs.Text(TEXT_LEVEL + "\n0", "33px " + PRIMARY_FONT, "#ffd800");
        g.x = 5;
        g.y = .5 * -b.regY - 8;
        g.textAlign = "center";
        g.textBaseline =
            "middle";
        g.lineHeight = 50;
        h.addChild(g);
        l = new createjs.Text(TEXT_LINES + "\n0", "33px " + PRIMARY_FONT, "#025cce");
        l.x = 5;
        l.y = .5 * b.regY - 39;
        l.textAlign = "center";
        l.textBaseline = "middle";
        l.outline = 4;
        l.lineHeight = 50;
        h.addChild(l);
        k = new createjs.Text(TEXT_LINES + "\n0", "33px " + PRIMARY_FONT, "#ffd800");
        k.x = 5;
        k.y = .5 * b.regY - 39;
        k.textAlign = "center";
        k.textBaseline = "middle";
        k.lineHeight = 50;
        h.addChild(k)
    };
    this.refreshLevel = function(a) {
        g.text = TEXT_LEVEL + "\n" + a;
        d.text = TEXT_LEVEL + "\n" + a
    };
    this.refreshLines = function(a) {
        l.text =
            TEXT_LINES + "\n" + a;
        k.text = TEXT_LINES + "\n" + a
    };
    this.getStartPos = function() {
        return p
    };
    this.setPosition = function(a, b) {
        h.x = a;
        h.y = b
    };
    this._init(a, f, c);
    return this
}

function CHelpPanel(a, f, c) {
    var e, b, g, d, k, l, h = !1;
    this._init = function(a, h, c) {
        k = new createjs.Container;
        k.x = a;
        k.y = h;
        s_oStage.addChild(k);
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.alpha = .7;
        k.addChild(d);
        g = createBitmap(c);
        g.x = CANVAS_WIDTH_HALF;
        g.y = CANVAS_HEIGHT_HALF;
        g.regX = .5 * c.width;
        g.regY = .5 * c.height;
        k.addChild(g);
        b = new createjs.Text(TEXT_HOW_TO_PLAY, "50px " + PRIMARY_FONT, "#0025c2");
        b.textAlign = "center";
        b.lineWidth = 500;
        b.x = .5 * CANVAS_WIDTH;
        b.y = .5 * CANVAS_HEIGHT -
            210;
        b.outline = 4;
        k.addChild(b);
        e = new createjs.Text(TEXT_HOW_TO_PLAY, "50px " + PRIMARY_FONT, "#ffd800");
        e.textAlign = "center";
        e.lineWidth = 500;
        e.x = .5 * CANVAS_WIDTH;
        e.y = .5 * CANVAS_HEIGHT - 210;
        k.addChild(e);
        l = new createjs.Container;
        var f, m, n, t;
        s_bMobile ? (f = s_oSpriteLibrary.getSprite("arrow"), m = s_oSpriteLibrary.getSprite("arrow"), n = s_oSpriteLibrary.getSprite("arrow"), t = s_oSpriteLibrary.getSprite("but_rotation")) : (f = s_oSpriteLibrary.getSprite("key_left"), m = s_oSpriteLibrary.getSprite("key_up"), n = s_oSpriteLibrary.getSprite("key_right"),
            t = s_oSpriteLibrary.getSprite("key_down"));
        a = this.createKey(CANVAS_WIDTH_HALF, CANVAS_HEIGHT_HALF - 100, s_oSpriteLibrary.getSprite("block_blur"));
        h = this.createKey(CANVAS_WIDTH_HALF - 125, CANVAS_HEIGHT_HALF + 30, s_oSpriteLibrary.getSprite("block_down"));
        c = this.createKey(CANVAS_WIDTH_HALF + 125, CANVAS_HEIGHT_HALF + 30, s_oSpriteLibrary.getSprite("block_rotation"));
        f = this.createKey(CANVAS_WIDTH_HALF - 135, CANVAS_HEIGHT_HALF - 90, f);
        m = this.createKey(CANVAS_WIDTH_HALF + 125, CANVAS_HEIGHT_HALF + 170, m);
        n = this.createKey(CANVAS_WIDTH_HALF +
            135, CANVAS_HEIGHT_HALF - 90, n);
        t = this.createKey(CANVAS_WIDTH_HALF - 125, CANVAS_HEIGHT_HALF + 170, t);
        s_bMobile && (f.scaleX = -1, m.rotation = 270);
        l.addChild(f, m, n, t, a, h, c);
        k.addChild(l);
        s_bMobile || (k.cursor = "pointer");
        var v = this;
        k.on("pressup", function() {
            v._onExitHelp()
        })
    };
    this.createKey = function(a, h, b) {
        var c;
        c = createBitmap(b);
        c.x = a;
        c.y = h;
        c.regX = .5 * b.width;
        c.regY = .5 * b.height;
        return c
    };
    this.unload = function() {
        createjs.Tween.removeAllTweens();
        createjs.Tween.get(k).to({
            alpha: 0
        }, 500, createjs.Ease.cubicIn).call(function() {
            s_oStage.removeChild(k)
        });
        var a = this;
        k.off("pressup", function() {
            a._onExitHelp()
        })
    };
    this._onExitHelp = function() {
        h || (h = !0, this.unload(), s_oGame._onExitHelpPanel())
    };
    this._init(a, f, c);
    return this
}

function CGfxButton(a, f, c, e) {
    var b, g, d, k, l = [],
        h, p, q, u;
    this._init = function(a, c, e, l) {
        b = g = 1;
        d = [];
        k = [];
        h = createBitmap(e);
        h.x = a;
        h.y = c;
        h.regX = e.width / 2;
        h.regY = e.height / 2;
        s_bMobile || (h.cursor = "pointer");
        q ? q.addChild(h) : s_oStage.addChild(h);
        u = !1;
        this._initListener()
    };
    this.unload = function() {
        h.off("mousedown", this.buttonDown);
        h.off("pressup", this.buttonRelease);
        q ? q.removeChild(h) : s_oStage.removeChild(h)
    };
    this.setVisible = function(a) {
        h.visible = a
    };
    this._initListener = function() {
        h.on("mousedown", this.buttonDown);
        h.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, h, b) {
        d[a] = h;
        k[a] = b
    };
    this.addEventListenerWithParams = function(a, h, b, c) {
        d[a] = h;
        k[a] = b;
        l = c
    };
    this.buttonRelease = function() {
        u || (h.scaleX = g, h.scaleY = b, d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(k[ON_MOUSE_UP], l))
    };
    this.buttonDown = function() {
        u || (h.scaleX = .9 * g, h.scaleY = .9 * b, d[ON_MOUSE_DOWN] && d[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], l))
    };
    this.setScale = function(a) {
        b = g = a;
        h.scaleX = a;
        h.scaleY = a
    };
    this.setScaleX = function(a) {
        g = a;
        h.scaleX = a
    };
    this.setPosition =
        function(a, b) {
            h.x = a;
            h.y = b
        };
    this.setX = function(a) {
        h.x = a
    };
    this.setY = function(a) {
        h.y = a
    };
    this.getButtonImage = function() {
        return h
    };
    this.getX = function() {
        return h.x
    };
    this.getY = function() {
        return h.y
    };
    this.block = function(a) {
        u = a
    };
    this.rotation = function(a) {
        h.rotation = a
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(h).to({
            scaleX: .9 * g,
            scaleY: .9 * b
        }, 850, createjs.Ease.quadOut).to({
            scaleX: g,
            scaleY: b
        }, 650, createjs.Ease.quadIn).call(function() {
            p.pulseAnimation()
        })
    };
    this.trebleAnimation = function() {
        createjs.Tween.get(h).to({
                rotation: 5
            },
            75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            p.trebleAnimation()
        })
    };
    q = e;
    p = this;
    this._init(a, f, c, e);
    return this
}

function CGameOver(a, f, c, e) {
    var b, g, d, k, l, h;
    this._init = function(a, c, e, f) {
        s_oGame.setPause(!0);
        b = new createjs.Container;
        g = new createjs.Container;
        g.y = -CANVAS_WIDTH_HALF - .5 * a.width;
        d = createBitmap(a);
        d.x = .5 * CANVAS_WIDTH;
        d.y = .5 * CANVAS_HEIGHT;
        d.regX = .5 * a.width;
        d.regY = .5 * a.height;
        g.addChild(d);
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.alpha = 0;
        k.on("click", function() {});
        b.addChild(k);
        a = .5 * CANVAS_WIDTH;
        var m = .5 * CANVAS_HEIGHT - 75,
            n, t;
        t = new createjs.Text(TEXT_GAMEOVER,
            "60px " + PRIMARY_FONT, "#025cce");
        t.textAlign = "center";
        t.textBaseline = "alphabetic";
        t.x = a;
        t.y = m - 50;
        t.outline = OUTLINE_TEXT;
        g.addChild(t);
        n = new createjs.Text(TEXT_GAMEOVER, "60px " + PRIMARY_FONT, "#ffd800");
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        n.x = a;
        n.y = t.y;
        g.addChild(n);
        e = new createjs.Text(TEXT_LEVEL + "\n" + e, "40px " + PRIMARY_FONT, "#025cce");
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.x = a - 150;
        e.y = m + 25;
        e.lineHeight = 50;
        e.outline = OUTLINE_TEXT;
        g.addChild(e);
        n = new createjs.Text(e.text, "40px " +
            PRIMARY_FONT, "#ffd800");
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        n.x = a - 150;
        n.y = e.y;
        n.lineHeight = 50;
        g.addChild(n);
        f = new createjs.Text(TEXT_LINES + "\n" + f, "40px " + PRIMARY_FONT, "#025cce");
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.x = a + 150;
        f.y = m + 25;
        f.lineHeight = 50;
        f.outline = OUTLINE_TEXT;
        g.addChild(f);
        f = new createjs.Text(f.text, "40px " + PRIMARY_FONT, "#ffd800");
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.x = a + 150;
        f.y = e.y;
        f.lineHeight = 50;
        g.addChild(f);
        f = new createjs.Text(TEXT_SCORE_GAMEOVER +
            "\n\n" + c, "40px " + PRIMARY_FONT, "#025cce");
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.x = a;
        f.y = m + 150;
        f.outline = 4;
        g.addChild(f);
        m = new createjs.Text(f.text, "40px " + PRIMARY_FONT, "#ffd800");
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        m.x = a;
        m.y = f.y;
        g.addChild(m);
        b.addChild(g);
        b.x = 0;
        b.y = 0;
        s_oStage.addChild(b);
        a = s_oSpriteLibrary.getSprite("but_restart");
        m = s_oSpriteLibrary.getSprite("but_home");
        l = new CGfxButton(CANVAS_WIDTH / 2 - 250, CANVAS_HEIGHT / 2 + 150, m, g);
        l.addEventListener(ON_MOUSE_UP, this._onMenu,
            this);
        h = new CGfxButton(CANVAS_WIDTH / 2 + 250, CANVAS_HEIGHT / 2 + 150, a, g);
        h.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        h.pulseAnimation();
        createjs.Tween.get(k).to({
            alpha: .5
        }, 750, createjs.Ease.cubicOut);
        createjs.Tween.get(g).to({
            y: 0
        }, 1500, createjs.Ease.bounceOut).call(function() {
            s_iAdsLevel === NUM_LEVEL_FOR_ADS ? ($(s_oMain).trigger("show_interlevel_ad"), s_iAdsLevel = 1) : s_iAdsLevel++
        });
        $(s_oMain).trigger("save_score", c);
        $(s_oMain).trigger("share_event", c)
    };
    this.unload = function() {
        k.off("click", function() {});
        l && (l.unload(), l = null);
        s_oStage.removeChild(b)
    };
    this._onMenu = function() {
        this.unload();
        s_oInterface._onButMenuRelease()
    };
    this._onRestart = function() {
        this.unload();
        s_oInterface._onButRestartLevelRelease()
    };
    this._init(a, f, c, e);
    return this
}

function CGameField() {
    var a = [],
        f = !1;
    this._init = function() {
        s_bMobile && (START_GRID_Y = CANVAS_HEIGHT_HALF - GRID_Y * GRID_Y);
        for (var c = START_GRID_X, e = START_GRID_Y, b = 0; b < GRID_Y; b++) {
            a[b] = [];
            for (var g = 0; g < GRID_X; g++) a[b][g] = {
                x: c,
                y: e,
                occupied: !1,
                cell: null,
                childID: null
            }, this.createCellTest(c, e), c += CELL_SIZE + CELL_OFFSET.x;
            e += CELL_SIZE + CELL_OFFSET.y;
            c = START_GRID_X
        }
        this.setID()
    };
    this.createCellTest = function(a, e) {
        if (SHOW_CELL) {
            var b, g = s_oSpriteLibrary.getSprite("cell");
            b = createBitmap(g);
            b.x = a;
            b.y = e;
            b.regX = .5 * g.width;
            b.regY = .5 * g.height;
            s_oStage.addChild(b);
            s_oStage.setChildIndex(b, 1)
        }
    };
    this.setID = function() {
        for (var c = s_oSpriteLibrary.getSprite("cell_0"), e = GRID_Y - 1; - 1 < e; e--)
            for (var b = GRID_X - 1; - 1 < b; b--) a[e][b].childID = new CCell(a[e][b].x, a[e][b].y, 0, c, s_oGame.getContainerGame()), a[e][b].childID.setVisible(!1)
    };
    this.getMiddleGridX = function() {
        return a[0][GRID_X_HALF].x
    };
    this.getStartGridY = function() {
        return a[0][0].y
    };
    this.getXByCol = function(c) {
        return a[0][c].x
    };
    this.getYByRow = function(c) {
        return a[c][0].y
    };
    this.setCellState =
        function(c, e, b) {
            a[c][e].occupied = b
        };
    this.getCellState = function(c, e) {
        return a[c][e].occupied
    };
    this.checkDirection = function(c, e) {
        for (var b = !1, g = {
                x: 0,
                y: 0
            }, d, f, l = 0; l < c.getWidth() * c.getHeight(); l++) {
            d = c.getCol() + g.x;
            f = c.getRow() + g.y;
            switch (e) {
                case UP:
                    f--;
                    break;
                case RIGHT:
                    d++;
                    break;
                case DOWN:
                    f++;
                    break;
                case LEFT:
                    d--
            }
            if (f > GRID_Y - 1) return !0;
            if (a[f][d].occupied && (d = c.pieceFilled(l))) {
                b = !0;
                break
            }
            g = c.updateRenderOffsets(g)
        }
        return b
    };
    this.getChildID = function(c, e) {
        return a[c][e].childID.getChildIndex()
    };
    this.checkHitBottom =
        function(c) {
            var e = this.checkDirection(c, DOWN);
            c.getRow() + c.getHeight() >= a.length && (e = !0);
            if (e) {
                c.setReplace(!0);
                c = c.getBlock();
                for (e = 0; e < c.length; e++) a[c[e].getRow()][c[e].getCol()].occupied = !0, a[c[e].getRow()][c[e].getCol()].cell = c[e];
                this.checkForFullLines()
            }
        };
    this.badRotation = function(c, e) {
        for (var b = 0, g = 0, d = 0, f, l, h = 0; h < c[0].length * c.length; h++) {
            f = e.getCol() + g;
            l = e.getRow() + d;
            if (l > GRID_Y - 1) return 1;
            if (f > GRID_X - 1) return e.setCol(e.getCol() - e.getWidth() + 1), 2;
            if (a[l][f].occupied) {
                b = 1;
                break
            }
            g++;
            g >= c[0].length &&
                (d++, g = 0)
        }
        return b
    };
    this.isAnimFullLines = function() {
        return f
    };
    this.checkForFullLines = function() {
        for (var c = 0, e, b = [], g = 0, d = 0; d < a.length; d++) {
            for (var k = e = 0; k < a[0].length; k++) a[d][k].occupied && e++;
            if (e === a[0].length) {
                c++;
                b[g] = d;
                g++;
                for (var l = DELAY_CELL_DESTROY_MS, k = 0; k < a[0].length; k++) a[d][k].occupied = !1, this.animCellDestroy(a[d][k], l), l += DELAY_CELL_DESTROY_MS
            }
        }
        0 < c && (f = !0, playSound("delete_lines", 1, 0), l += 2 * CELL_DESTROY_MS, createjs.Tween.get(this).wait(l).call(function() {
            s_oGame.calculateScore(c);
            s_oGame.checkForNewLevel(c);
            this.checkEmptyRowForFall(b);
            f = !1
        }))
    };
    this.animCellDestroy = function(a, e) {
        a.cell.changeState(1);
        createjs.Tween.get(a.cell.getSprite()).wait(e).to({
            scaleX: 0,
            scaleY: 0
        }, CELL_DESTROY_MS, createjs.Ease.cubicOut).call(function() {
            !0 === a.occupied && a.cell.unload()
        })
    };
    this.checkEmptyRowForFall = function(c) {
        for (var e = 0, b = 0; b < c.length; b++)
            for (var g = 0; g < a[b].length; g++)
                for (var d = c[b] - 1; - 1 < d; d--) !0 === a[d][g].occupied && (a[d][g].occupied = !1, a[d + 1][g].cell = a[d][g].cell, a[d][g].cell = null, a[d + 1][g].occupied = !0);
        for (d =
            a[b].length - 1; - 1 < d; d--)
            for (b = a.length - 1; - 1 < b; b--) !0 === a[b][d].occupied && (a[b][d].cell.setChildIndex(this.getChildID(b, d)), this.animateLineDown(a[b][d].cell.getSprite(), a[b][d].y, e), e += DELAY_LINE_DOWN)
    };
    this.animateLineDown = function(a, e, b) {
        createjs.Tween.get(a).wait(b).to({
            y: e
        }, LINE_DOWN_TIME, createjs.Ease.cubicOut)
    };
    this.unload = function() {
        for (var c = 0; c < a.length; c++)
            for (var e = 0; e < a[0].length; e++) a[c][e].occupied && a[c][e].cell.unload();
        s_oGameField = a = null
    };
    this._init();
    s_oGameField = this;
    return this
}
var s_oGameField;

function CGame(a) {
    function f(a) {
        n || t || s_oGameField.isAnimFullLines() || (37 === a.keyCode ? (s_oGame.onLeft(), n = !0) : 39 === a.keyCode ? (s_oGame.onRight(), n = !0) : 38 === a.keyCode && (s_oGame.onUp(), n = !0));
        if (40 === a.keyCode && !1 === v && !t) s_oGame.onDown();
        a.preventDefault();
        return !1
    }

    function c(a) {
        !n || t || s_oGameField.isAnimFullLines() || (37 === a.keyCode ? (n = !1, s_oGame.dirKeyUp()) : 39 === a.keyCode ? (n = !1, s_oGame.dirKeyUp()) : 38 === a.keyCode ? n = !1 : 80 === a.keyCode ? n = !1 : 32 === a.keyCode && (n = !1));
        if (40 === a.keyCode && !0 === v) s_oGame.onDownKeyUp();
        a.preventDefault();
        return !1
    }
    var e, b, g, d, k, l, h, p, q, u, r, m, n, t, v = !1,
        y = !1,
        z, w, x, A;
    this._init = function() {
        setVolume(s_oSoundTrack, .4);
        this.setPause(!0);
        e = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(e);
        h = new CEdges;
        this.createGameContainer();
        n = !1;
        g = new CGameField;
        m = r = u = p = 0;
        z = w = TIME_REFRESH_GAME;
        A = [];
        for (var a = 0; a < BLOCKS_TYPE.length; a++)
            for (; 0 < BLOCKS_OCCURENCE[a]; a++) A.push(a);
        this.createBlock(A[Math.floor(Math.random() * A.length)]);
        this.nextType();
        b = new CInterface(q);
        b.refreshLevel(u +
            1);
        this.canInput(!0);
        h.createIEdge();
        $(s_oMain).trigger("start_level", 1);
        b.showHelpPanel();
        s_bMobile || (document.onkeydown = f, document.onkeyup = c)
    };
    this.createGameContainer = function() {
        k = new createjs.Container;
        s_oStage.addChild(k)
    };
    this.nextType = function() {
        q = A[Math.floor(Math.random() * A.length)]
    };
    this.setPause = function(a) {
        t = a
    };
    this._onExitHelpPanel = function() {
        this.setPause(!1);
        b.unloadHelp()
    };
    this.onExit = function() {
        setVolume(s_oSoundTrack, 1);
        s_oGame.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_level",
            1);
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad")
    };
    this.restartGame = function() {
        g.unload();
        g = null;
        k.removeAllChildren();
        d = null;
        y = !1;
        this.nextType();
        b.refreshNextBlock(q);
        g = new CGameField;
        this.createBlock(A[Math.floor(Math.random() * A.length)]);
        w = TIME_REFRESH_GAME;
        m = r = u = p = 0;
        b.refreshLevel(u + 1);
        b.refreshLines(r);
        b.refreshScore(p);
        t = !1
    };
    this.unload = function() {
        s_bMobile || (document.onkeydown = null, document.onkeyup = null);
        g.unload();
        g = null;
        b.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    };
    this.onLeft = function() {
        d.getReplace() || (l = s_oGame.onLeft, y = !0, x = TIME_REFRESH_DIRECTION, 0 < d.getCol() && !g.checkDirection(d, LEFT) && (d.setCol(d.getCol() - 1), d.refreshCellPosition()))
    };
    this.onRight = function() {
        d.getReplace() || (l = s_oGame.onRight, y = !0, x = TIME_REFRESH_DIRECTION, d.getCol() < GRID_X - d.getWidth() && !g.checkDirection(d, RIGHT) && (d.setCol(d.getCol() + 1), d.refreshCellPosition()))
    };
    this.onUp = function() {
        playSound("shift_piece", 1, 0);
        d.setOrientation(d.getOrientation() + 90);
        d.refreshCellPosition()
    };
    this.onDown = function() {
        v = !0;
        d.getReplace() || d.down();
        z = TIME_REFRESH_GAME_KEY_DOWN
    };
    this.calculateScore = function(a) {
        this.addScore(SCORE_LINE[a - 1] * (u + 1))
    };
    this.checkForNewLevel = function(a) {
        r += a;
        m += a;
        b.refreshLines(r);
        m >= LEVEL_UP_LINES && (u++, m -= LEVEL_UP_LINES, b.refreshLevel(u + 1), a = w - STEP_DECREASE, a >= MIN_REFRESH_GAME && (w = a), STEP_DECREASE -= .05, .05 > STEP_DECREASE && (STEP_DECREASE = .05))
    };
    this.canInput = function(a) {};
    this.addScore = function(a) {
        p += a;
        b.refreshScore(p)
    };
    this.dirKeyUp = function() {
        y = !1
    };
    this.onDownKeyUp =
        function() {
            v = !1;
            z = w
        };
    this.createBlock = function(a) {
        var h = s_oSpriteLibrary.getSprite("cell_" + a);
        d = new CBlock(a, h, k)
    };
    this.getContainerGame = function() {
        return k
    };
    this.gameOver = function() {
        this.setPause(!0);
        var a = playSound("game_over", 1, 0);
        s_oSoundTrack.volume = 0;
        a.on("complete", function() {
            a.removeAllEventListeners();
            s_oSoundTrack.volume = .4
        });
        $(s_oMain).trigger("end_level", 1);
        b.gameOver(p, u + 1, r)
    };
    this.keysDirectionPress = function() {
        y && l()
    };
    this.update = function() {
        if (!1 === t && !s_oGameField.isAnimFullLines()) {
            if (!0 ===
                d.getReplace() && (d = null, this.createBlock(q), this.nextType(), b.refreshNextBlock(q), s_oGameField.checkDirection(d))) {
                this.gameOver();
                return
            }
            0 > z ? (d.down(), z = v ? TIME_REFRESH_GAME_KEY_DOWN : 1E3 * w) : z -= s_iTimeElaps;
            0 > x ? (x = TIME_REFRESH_DIRECTION, this.keysDirectionPress()) : y && (x -= FPS_TIME)
        }
    };
    s_oGame = this;
    LEVEL_UP_LINES = a.level_up_lines;
    MIN_REFRESH_GAME = a.min_refresh_game;
    SCORE_LINE = a.score_line;
    TIME_REFRESH_GAME = a.start_refresh_game;
    STEP_DECREASE = a.step_decrease_refresh_game;
    BLOCKS_OCCURENCE = a.blocks_occurence;
    NUM_LEVEL_FOR_ADS = a.num_levels_for_ads;
    TIME_REFRESH_GAME_KEY_DOWN = MIN_REFRESH_GAME;
    this._init()
}
var s_oGame, s_oScrollStage;

function CEdges() {
    var a, f;
    this._init = function() {
        var c = s_oSpriteLibrary.getSprite("frame_bottom");
        a = createBitmap(c);
        a.x = 300 + .5 * c.width;
        a.y = 713;
        a.regX = c.width;
        a.regY = .5 * c.height;
        s_oStage.addChild(a)
    };
    this.createIEdge = function() {
        var a = s_oSpriteLibrary.getSprite("frame_top");
        f = createBitmap(a);
        f.x = 88;
        f.y = 709;
        f.regX = .5 * a.width;
        f.regY = .5 * a.height;
        s_oStage.addChild(f)
    };
    this._init();
    return this
}

function CCreditsPanel() {
    var a, f, c, e, b, g, d, k, l;
    this._init = function() {
        l = new createjs.Container;
        l.y = -130;
        s_oStage.addChild(l);
        var h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 130, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.alpha = .7;
        l.addChild(h);
        h = s_oSpriteLibrary.getSprite("msg_box");
        a = createBitmap(h);
        l.addChild(a);
        a.x = .5 * CANVAS_WIDTH;
        a.y = .5 * CANVAS_HEIGHT + 130;
        a.regX = .5 * h.width;
        a.regY = .5 * h.height;
        g = new createjs.Shape;
        g.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.alpha =
            .01;
        g.on("click", this._onLogoButRelease);
        s_bMobile || (g.cursor = "pointer");
        l.addChild(g);
        h = s_oSpriteLibrary.getSprite("but_exit");
        c = new CGfxButton(800, 640, h, l);
        c.addEventListener(ON_MOUSE_UP, this.unload, this);
        b = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + PRIMARY_FONT, "#025cce");
        b.textAlign = "center";
        b.textBaseline = "alphabetic";
        b.x = CANVAS_WIDTH / 2;
        b.y = 770;
        b.outline = OUTLINE_TEXT;
        l.addChild(b);
        e = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + PRIMARY_FONT, "#ffd800");
        e.textAlign = "center";
        e.textBaseline =
            "alphabetic";
        e.x = CANVAS_WIDTH / 2;
        e.y = b.y;
        l.addChild(e);
        h = s_oSpriteLibrary.getSprite("logo_ctl");
        f = createBitmap(h);
        f.regX = h.width / 2;
        f.regY = h.height / 2;
        f.x = CANVAS_WIDTH / 2;
        f.y = 850;
        l.addChild(f);
        k = new createjs.Text(TEXT_LINK1, "40px " + PRIMARY_FONT, "#025cce");
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.x = CANVAS_WIDTH / 2;
        k.y = 980;
        k.outline = OUTLINE_TEXT;
        l.addChild(k);
        d = new createjs.Text(TEXT_LINK1, "40px " + PRIMARY_FONT, "#ffd800");
        d.textAlign = "center";
        d.textBaseline = "alphabetic";
        d.x = CANVAS_WIDTH / 2;
        d.y = k.y;
        l.addChild(d);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(a, b) {};
    this.unload = function() {
        playSound("click", 1, 0);
        g.off("click", this._onLogoButRelease);
        c.unload();
        c = null;
        s_oStage.removeChild(l);
        s_oMenu.exitFromCredits()
    };
    this._onLogoButRelease = function() {
        playSound("click", 1, 0);

    };
    this._init()
}

function CController() {
    var a, f, c, e, b, g, d, k;
    this._init = function() {
        a = {
            x: .5 * CANVAS_WIDTH - 210,
            y: CANVAS_HEIGHT - 80
        };
        f = {
            x: .5 * CANVAS_WIDTH - 380,
            y: CANVAS_HEIGHT - 80
        };
        c = {
            x: .5 * CANVAS_WIDTH + 380,
            y: CANVAS_HEIGHT - 80
        };
        e = {
            x: .5 * CANVAS_WIDTH - 60,
            y: CANVAS_HEIGHT - 80
        };
        var l = s_oSpriteLibrary.getSprite("arrow"),
            h = s_oSpriteLibrary.getSprite("but_rotation");
        b = new CGfxButton(f.x, f.y, l, s_oStage);
        b.addEventListener(ON_MOUSE_DOWN, s_oGame.onLeft, this);
        b.addEventListener(ON_MOUSE_UP, s_oGame.dirKeyUp, this);
        b.setScaleX(-1);
        g = new CGfxButton(a.x,
            a.y, l, s_oStage);
        g.addEventListener(ON_MOUSE_DOWN, s_oGame.onRight, this);
        g.addEventListener(ON_MOUSE_UP, s_oGame.dirKeyUp, this);
        d = new CGfxButton(c.x, c.y, h, s_oStage);
        d.addEventListener(ON_MOUSE_DOWN, s_oGame.onUp, this);
        k = new CGfxButton(e.x, e.y, l, s_oStage);
        k.addEventListener(ON_MOUSE_DOWN, s_oGame.onDown, this);
        k.addEventListener(ON_MOUSE_UP, s_oGame.onDownKeyUp, this);
        k.rotation(90)
    };
    this.getStartPositionControlRight = function() {
        return a
    };
    this.getStartPositionControlLeft = function() {
        return f
    };
    this.getStartPositionControlUp =
        function() {
            return c
        };
    this.getStartPositionControlDown = function() {
        return e
    };
    this.setPositionControlRight = function(a, h) {
        g.setPosition(a, h)
    };
    this.setPositionControlLeft = function(a, h) {
        b.setPosition(a, h)
    };
    this.setPositionControlUp = function(a, h) {
        d.setPosition(a, h)
    };
    this.setPositionControlDown = function(a, h) {
        k.setPosition(a, h)
    };
    this.unload = function() {
        b.unload();
        b = null;
        g.unload();
        g = null;
        d.unload();
        d = null;
        k.unload();
        k = null
    };
    this._init();
    return this
}

function CCell(a, f, c, e, b) {
    var g, d, k;
    this._init = function(a, h, c, d) {
        g = createBitmap(d);
        g.x = a;
        g.y = h;
        a = new createjs.SpriteSheet({
            images: [d],
            frames: {
                width: d.width / 2,
                height: d.height,
                regX: d.width / 2 / 2,
                regY: d.height / 2 + c
            },
            animations: {
                normal: [0],
                complete: [1]
            }
        });
        g = createSprite(a, "normal", d.width / 2 / 2, d.height / 2 + c, d.width / 2, d.height);
        g.stop();
        b.addChild(g)
    };
    this.setPosition = function(a, h) {
        g.x = a;
        g.y = h
    };
    this.getY = function() {
        return g.y
    };
    this.getX = function() {
        return g.x
    };
    this.setRow = function(a) {
        d = a
    };
    this.setCol = function(a) {
        k =
            a
    };
    this.getRow = function() {
        return d
    };
    this.getCol = function() {
        return k
    };
    this.setRegY = function(a) {
        g.regY = a
    };
    this.changeState = function(a) {
        g.gotoAndStop(a)
    };
    this.getSprite = function() {
        return g
    };
    this.getRegY = function() {
        return g.regY
    };
    this.setVisible = function(a) {
        g.visible = a
    };
    this.getChildIndex = function() {
        return b.getChildIndex(g)
    };
    this.setChildIndex = function(a) {
        b.setChildIndex(g, a)
    };
    this.unload = function() {
        b.removeChild(g)
    };
    this._init(a, f, c, e);
    return this
}

function CBlock(a, f, c) {
    var e = 0,
        b, g, d = !1,
        k, l = BLOCKS_TYPE[a];
    this._init = function(a) {
        g = Math.floor(GRID_X_HALF - this.getWidth() / 2);
        b = 0;
        k = this.createSpriteBlock(a);
        this.refreshCellPosition();
        this.orderCellsChildIndex()
    };
    this.getHeight = function() {
        return l.length
    };
    this.getWidth = function() {
        return l[0].length
    };
    this.createSpriteBlock = function(a) {
        for (var c = [], d = g, e = b, f = s_oGameField.getXByCol(d), k = s_oGameField.getYByRow(e), n = l.length * l[0].length, t = 0, v = 0; v < l.length; v++) {
            for (var y = 0; y < l[v].length; y++) 1 === l[v][y] &&
                (c[t] = this.createCell(f, k, a, e, d, 0), t++), d++, f = s_oGameField.getXByCol(d), n--;
            e++;
            d = g;
            k = s_oGameField.getYByRow(e);
            f = s_oGameField.getXByCol(d)
        }
        return c
    };
    this.createCell = function(a, b, d, g, e, f) {
        a = new CCell(a, b, f, d, c);
        a.setRow(g);
        a.setCol(e);
        return a
    };
    this.orderCellsChildIndex = function() {
        for (var a = c.numChildren - 1, b = 0; b < k.length; b++) k[b].setChildIndex(a), a--
    };
    this.updateRenderOffsets = function(a) {
        a.x++;
        a.x >= this.getWidth() && (a.y++, a.x = 0);
        return a
    };
    this.pieceFilled = function(a) {
        a = this.stepToCooordinates(a);
        return !!l[a.y][a.x]
    };
    this.stepToCooordinates = function(a) {
        var b = {
            x: 0,
            y: 0
        };
        b.x = a % this.getWidth();
        b.y = Math.floor(a / this.getWidth());
        return b
    };
    this.down = function() {
        s_oGameField.checkHitBottom(this, DOWN);
        !0 !== d && (b += 1, this.refreshCellPosition())
    };
    this.refreshCellPosition = function() {
        for (var a = g, c = b, d = 0, e = s_oGameField.getXByCol(a), f = s_oGameField.getYByRow(c), m = 0; m < l.length; m++) {
            for (var n = 0; n < l[m].length; n++) 1 === l[m][n] && (k[d].setPosition(e, f), k[d].setRow(c), k[d].setCol(a), k[d].setChildIndex(s_oGameField.getChildID(c,
                a)), d++), a++, a < GRID_X && (e = s_oGameField.getXByCol(a));
            if (c + 1 > GRID_Y - 1) break;
            c++;
            a = g;
            f = s_oGameField.getYByRow(c);
            e = s_oGameField.getXByCol(a)
        }
    };
    this.setReplace = function(a) {
        d = a
    };
    this.getReplace = function() {
        return d
    };
    this.getCol = function() {
        return g
    };
    this.getRow = function() {
        return b
    };
    this.getBlock = function() {
        return k
    };
    this.setRow = function(a) {
        b = a
    };
    this.setCol = function(a) {
        g = a
    };
    this.__rotateBlock = function(a) {
        for (var b = [], c = a[0].length - 1; - 1 < c; c--) {
            for (var d = [], e = 0; e < a.length; e++) d.push(a[e][c]);
            b.push(d)
        }
        return b
    };
    this.getOrientation = function() {
        return e
    };
    this.setOrientation = function(a) {
        360 === a && (a = 0);
        var b = this.__rotateBlock(l),
            c = s_oGameField.badRotation(b, this);
        1 !== c && (0 === c ? (e = a, l = b) : 2 === c && this.setOrientation(a))
    };
    this.unload = function() {
        for (var a = 0; a < k.length; a++) k[a].unload();
        k = null
    };
    this._init(f);
    return this
}

function CAreYouSurePanel(a) {
    var f, c, e, b, g, d, k, l;
    this._init = function() {
        d = new createjs.Container;
        d.visible = !1;
        l.addChild(d);
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.alpha = .7;
        k.on("click", function() {});
        d.addChild(k);
        var a = s_oSpriteLibrary.getSprite("msg_box");
        g = createBitmap(a);
        g.x = CANVAS_WIDTH_HALF;
        g.y = CANVAS_HEIGHT_HALF;
        g.regX = .5 * a.width;
        g.regY = .5 * a.height;
        d.addChild(g);
        g.on("click", function() {});
        f = new createjs.Text(TEXT_ARE_SURE, "60px " + PRIMARY_FONT,
            "#0025c2");
        f.x = CANVAS_WIDTH / 2;
        f.y = .5 * CANVAS_HEIGHT - 100;
        f.textAlign = "center";
        f.textBaseline = "middle";
        f.outline = 5;
        d.addChild(f);
        c = new createjs.Text(f.text, "60px " + PRIMARY_FONT, "#ffd800");
        c.x = f.x;
        c.y = f.y;
        c.textAlign = "center";
        c.textBaseline = "middle";
        d.addChild(c);
        e = new CGfxButton(CANVAS_WIDTH / 2 + 170, f.y + 200, s_oSpriteLibrary.getSprite("but_yes"), d);
        e.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        b = new CGfxButton(CANVAS_WIDTH / 2 - 170, f.y + 200, s_oSpriteLibrary.getSprite("but_not"), d);
        b.addEventListener(ON_MOUSE_UP,
            this._onButNo, this)
    };
    this.onPause = function(a) {
        s_oGame.setPause(a);
        createjs.Ticker.paused = a;
        !0 === a ? s_oGame.canInput(!1) : s_oGame.canInput(!0)
    };
    this.show = function() {
        this.onPause(!0);
        d.visible = !0
    };
    this.unload = function() {
        b.unload();
        e.unload();
        k.off("click", function() {})
    };
    this._onButYes = function() {
        this.unload();
        this.onPause(!1);
        playSound("click", 1, 0);
        s_oGame.onExit()
    };
    this._onButNo = function() {
        this.unload();
        this.onPause(!1);
        playSound("click", 1, 0);
        d.visible = !1
    };
    l = a;
    this._init()
}

function CSpriteLibrary() {
    var a, f, c, e, b, g;
    this.init = function(d, k, l) {
        c = f = 0;
        e = d;
        b = k;
        g = l;
        a = {}
    };
    this.addSprite = function(b, c) {
        a.hasOwnProperty(b) || (a[b] = {
            szPath: c,
            oSprite: new Image
        }, f++)
    };
    this.getSprite = function(b) {
        return a.hasOwnProperty(b) ? a[b].oSprite : null
    };
    this._onSpritesLoaded = function() {
        b.call(g)
    };
    this._onSpriteLoaded = function() {
        e.call(g);
        ++c === f && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var b in a) a[b].oSprite.oSpriteLibrary = this, a[b].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            a[b].oSprite.src = a[b].szPath
    };
    this.getNumSprites = function() {
        return f
    }
}
var CANVAS_WIDTH = 960,
    CANVAS_HEIGHT = 1440,
    CANVAS_WIDTH_HALF = .5 * CANVAS_WIDTH,
    CANVAS_HEIGHT_HALF = .5 * CANVAS_HEIGHT,
    EDGEBOARD_X = 50,
    EDGEBOARD_Y = 130,
    FPS = 30,
    FPS_TIME = 1 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    PRIMARY_FONT = "cosmic_cuberegular",
    OUTLINE_TEXT = 4,
    CELL_OFFSET = {
        x: -9,
        y: -9
    },
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    CONFIRMATION_EXIT = 0,
    CONFIRMATION_RESET = 1,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    ON_TWEEN_ENDED = 6,
    ON_BUT_NO_DOWN = 7,
    ON_BUT_YES_DOWN = 8,
    BLOCK_TIME_SPAWN_RANGE = {
        min: 500,
        max: 1E4
    },
    LEFT = 0,
    RIGHT = 1,
    UP = 2,
    DOWN = 3,
    GRID_Y = 20,
    GRID_X = 10,
    SHOW_CELL = !1,
    TIME_REFRESH_DIRECTION = .2,
    CELL_DESTROY_MS = 15,
    DELAY_CELL_DESTROY_MS = 20,
    DELAY_LINE_DOWN = 10,
    LINE_DOWN_TIME = 40,
    SHOW_FPS = !1,
    TIME_REFRESH_GAME = 1,
    TIME_REFRESH_GAME_KEY_DOWN, GRID_X_HALF = Math.floor(.5 * GRID_X),
    CELL_SIZE = 50,
    START_GRID_X = CANVAS_WIDTH_HALF - CELL_SIZE * GRID_X_HALF - 2.35 * EDGEBOARD_X,
    START_GRID_Y = CANVAS_HEIGHT_HALF - GRID_Y * GRID_Y,
    BLOCKS_TYPE = [
        [
            [0, 1, 0],
            [1, 1, 1]
        ],
        [
            [0, 0, 1],
            [1, 1, 1]
        ],
        [
            [1, 0, 0],
            [1, 1, 1]
        ],
        [
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 1]
        ],
        [
            [1],
            [1],
            [1],
            [1]
        ],
        [
            [1, 1],
            [1, 1]
        ]
    ];

function CToggle(a, f, c, e) {
    var b, g, d, k = [],
        l;
    this._init = function(a, c, e, f) {
        g = [];
        d = [];
        var k = new createjs.SpriteSheet({
            images: [e],
            frames: {
                width: e.width / 2,
                height: e.height,
                regX: e.width / 2 / 2,
                regY: e.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        b = f;
        l = createSprite(k, "state_" + b, e.width / 2 / 2, e.height / 2, e.width / 2, e.height);
        l.mouseEnabled = !0;
        l.x = a;
        l.y = c;
        l.stop();
        s_bMobile || (l.cursor = "pointer");
        s_oStage.addChild(l);
        this._initListener()
    };
    this.unload = function() {
        l.off("mousedown", this.buttonDown);
        l.off("pressup",
            this.buttonRelease);
        l.mouseEnabled = !1;
        s_oStage.removeChild(l)
    };
    this._initListener = function() {
        l.on("mousedown", this.buttonDown);
        l.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        g[a] = b;
        d[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, e) {
        g[a] = b;
        d[a] = c;
        k = e
    };
    this.setActive = function(a) {
        b = a;
        l.gotoAndStop("state_" + b)
    };
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        playSound("click", 1, 0);
        b = !b;
        l.gotoAndStop("state_" + b);
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(d[ON_MOUSE_UP], k)
    };
    this.buttonDown = function() {
        l.scaleX = .9;
        l.scaleY = .9;
        g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN], k)
    };
    this.setPosition = function(a, b) {
        l.x = a;
        l.y = b
    };
    this.setVisible = function(a) {
        l.visible = a
    };
    this._init(a, f, c, e)
}
var s_iScaleFactor = 1,
    s_oCanvasLeft, s_oCanvasTop;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(a) {
    console.log(a)
}

function isIOS() {
    for (var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";"); a.length;)
        if (navigator.platform === a.pop()) return !0;
    return !1
}

function getSize(a) {
    var f = a.toLowerCase(),
        c = window.document,
        e = c.documentElement;
    if (void 0 === window["inner" + a]) a = e["client" + a];
    else if (window["inner" + a] != e["client" + a]) {
        var b = c.createElement("body");
        b.id = "vpw-test-b";
        b.style.cssText = "overflow:scroll";
        var g = c.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML = "<style>@media(" + f + ":" + e["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + f + ":7px!important}}</style>";
        b.appendChild(g);
        e.insertBefore(b, c.head);
        a = 7 == g["offset" + a] ? e["client" + a] : window["inner" + a];
        e.removeChild(b)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a;
        a = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var f = getSize("Width"),
            c = Math.min(a / CANVAS_HEIGHT, f / CANVAS_WIDTH),
            e = CANVAS_WIDTH * c,
            c = CANVAS_HEIGHT * c,
            b;
        c < a ? (b = a - c, c += b, e += CANVAS_WIDTH / CANVAS_HEIGHT * b) : e < f && (b = f - e, e += b, c += CANVAS_HEIGHT / CANVAS_WIDTH * b);
        b = a / 2 - c / 2;
        var g = f / 2 - e / 2,
            d = CANVAS_WIDTH / e;
        if (g * d < -EDGEBOARD_X || b * d < -EDGEBOARD_Y) c = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), f / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            e = CANVAS_WIDTH * c, c *= CANVAS_HEIGHT, b = (a - c) / 2, g = (f - e) / 2, d = CANVAS_WIDTH / e;
        s_iOffsetX = -1 * g * d;
        s_iOffsetY = -1 * b * d;
        0 <= b && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", e + "px");
        $("#canvas").css("height", c + "px");
        0 > b ? $("#canvas").css("top", b + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", g + "px")
    }
}

function createBitmap(a, f, c) {
    var e = new createjs.Bitmap(a),
        b = new createjs.Shape;
    f && c ? b.graphics.beginFill("#fff").drawRect(0, 0, f, c) : b.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    e.hitArea = b;
    return e
}

function createSprite(a, f, c, e, b, g) {
    a = null !== f ? new createjs.Sprite(a, f) : new createjs.Sprite(a);
    f = new createjs.Shape;
    f.graphics.beginFill("#000000").drawRect(-c, -e, b, g);
    a.hitArea = f;
    return a
}

function randomFloatBetween(a, f, c) {
    "undefined" === typeof c && (c = 2);
    return parseFloat(Math.min(a + Math.random() * (f - a), f).toFixed(c))
}

function formatTime(a) {
    a /= 1E3;
    var f = Math.floor(a / 60);
    a = Math.floor(a - 60 * f);
    var c = "",
        c = 10 > f ? c + ("0" + f + ":") : c + (f + ":");
    return 10 > a ? c + ("0" + a) : c + a
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}

function shuffle(a) {
    for (var f = a.length, c, e; 0 < f;) e = Math.floor(Math.random() * f), f--, c = a[f], a[f] = a[e], a[e] = c;
    return a
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var f = document.createEvent("MouseEvents");
            f.initEvent("click", !0, !0);
            a.dispatchEvent(f)
        }
    }
};

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(a) {
    for (var f = window.location.search.substring(1).split("&"), c = 0; c < f.length; c++) {
        var e = f[c].split("=");
        if (e[0] == a) return e[1]
    }
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.stop()
}

function playSound(a, f, c) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? createjs.Sound.play(a, {
        loop: c,
        volume: f
    }) : null
}

function setVolume(a, f) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) a.volume = f
}

function setMute(a, f) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.setMute(f)
}

function easeLinear(a, f, c, e) {
    return c * a / e + f
}

function collisionWithCircle(a, f, c) {
    var e = a.getX() - f.getX(),
        b = a.getY() - f.getY();
    return Math.sqrt(e * e + b * b) < a.getCollision() * c + f.getCollision() * c ? !0 : !1
}

function saveItem(a, f) {
    localStorage.setItem(a, f)
}

function getItem(a) {
    return localStorage.getItem(a)
}

function clearAllItem() {
    localStorage.clear()
}

function CTextToggle(a, f, c, e, b, g, d, k, l) {
    var h = 1,
        p, q = !1,
        u, r, m, n, t, v;
    this._init = function(a, b, c, d, e, g, f, h, k) {
        p = !1;
        u = [];
        r = [];
        v = createBitmap(c);
        var l = Math.ceil(f / 20);
        t = new createjs.Text(d, " " + f + "px " + e, "#000000");
        t.textAlign = "center";
        t.textBaseline = "alphabetic";
        var q = t.getBounds();
        t.x = c.width / 2 + l;
        t.y = Math.floor(c.height / 2) + q.height / 3 + l - 7;
        n = new createjs.Text(d, " " + f + "px " + e, g);
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        q = n.getBounds();
        n.x = c.width / 2;
        n.y = Math.floor(c.height / 2) + q.height / 3 - 7;
        m = new createjs.Container;
        m.x = a;
        m.y = b;
        m.regX = c.width / 2;
        m.regY = c.height / 2;
        h || (a = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 2,
                height: c.height,
                regX: c.width / 2 / 2,
                regY: c.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        }), v = createSprite(a, "state_false", c.width / 2 / 2, c.height / 2, c.width / 2, c.height), t.x = l, t.y = l + 17, n.x = 0, n.y = 17, m.regX = 0, m.regY = 0);
        m.addChild(v, t, n);
        s_bMobile || (m.cursor = "pointer");
        k.addChild(m);
        this._initListener()
    };
    this.unload = function() {
        m.off("mousedown");
        m.off("pressup");
        l.removeChild(m)
    };
    this.setVisible =
        function(a) {
            m.visible = a
        };
    this._initListener = function() {
        oParent = this;
        m.on("mousedown", this.buttonDown);
        m.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        u[a] = b;
        r[a] = c
    };
    this.buttonRelease = function() {
        p || q || (m.scaleX = 1 * h, m.scaleY = 1 * h, u[ON_MOUSE_UP] && u[ON_MOUSE_UP].call(r[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        p || q || (m.scaleX = .9 * h, m.scaleY = .9 * h, u[ON_MOUSE_DOWN] && u[ON_MOUSE_DOWN].call(r[ON_MOUSE_DOWN]))
    };
    this.enable = function() {
        p = !1;
        k || v.gotoAndStop("state_true")
    };
    this.disable =
        function() {
            p = !0;
            k || v.gotoAndStop("state_false")
        };
    this.setTextPosition = function(a, b) {
        var c = Math.ceil(d / 20);
        t.x = a + c;
        t.y = b + c;
        n.x = a;
        n.y = b
    };
    this.setText = function(a) {
        n.text = a;
        t.text = a
    };
    this.setPosition = function(a, b) {
        m.x = a;
        m.y = b
    };
    this.setX = function(a) {
        m.x = a
    };
    this.setY = function(a) {
        m.y = a
    };
    this.getButtonImage = function() {
        return m
    };
    this.getX = function() {
        return m.x
    };
    this.getY = function() {
        return m.y
    };
    this.block = function(a) {
        q = a
    };
    this.setScale = function(a) {
        h = a;
        m.scaleX = a;
        m.scaleY = a
    };
    this.setScaleX = function(a) {
        v.scaleX =
            a
    };
    this._init(a, f, c, e, b, g, d, k, l);
    return this
};