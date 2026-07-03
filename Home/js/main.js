const cloverWrap = document.querySelector(".cloverWarp");

if (cloverWrap) {
    for (let i = 1; i <= 8; i++) {
        const num = String(i).padStart(2, "0");
        const card = document.createElement("a");
        const cardInner = document.createElement("div");
        const front = document.createElement("div");
        const back = document.createElement("div");
        const object = document.createElement("object");
        const backImg = document.createElement("img");

        card.className = "cloverCard";
        card.href = "../products/products_index.html";
        card.setAttribute("aria-label", "Go to products");
        cardInner.className = "cloverCardInner";
        front.className = "cloverCardFace cloverCardFront";
        back.className = "cloverCardFace cloverCardBack";
        object.type = "image/svg+xml";
        object.data = `./img/forlog-forlog_products/clover-products${num}.svg`;
        backImg.src = `./img/SVG files/clover_back/${i}-01.svg`;
        backImg.alt = `clover back ${i}`;

        front.appendChild(object);
        back.appendChild(backImg);
        cardInner.appendChild(front);
        cardInner.appendChild(back);
        card.appendChild(cardInner);
        cloverWrap.appendChild(card);
    }
}

const wateringArea = document.querySelector(".anotherIMG");

if (wateringArea && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const drops = [];
    let lastTime = 0;
    let spawnTimer = 0;
    let wateringAnimationId = null;

    canvas.className = "wateringCanvas";
    wateringArea.appendChild(canvas);

    function resizeWateringCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = wateringArea.getBoundingClientRect();

        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function getWateringImageRect(width, height) {
        const imageSize = Math.min(width, height);

        return {
            x: (width - imageSize) / 2,
            y: (height - imageSize) / 2,
            size: imageSize
        };
    }

    function makeWaterDrop(width, height) {
        const imageRect = getWateringImageRect(width, height);
        const startX = imageRect.x + imageRect.size * 0.385;
        const startY = imageRect.y + imageRect.size * 0.62;
        const targetX = imageRect.x + imageRect.size * (0.20 + Math.random() * 0.16);
        const targetY = imageRect.y + imageRect.size * (0.76 + Math.random() * 0.04);

        drops.push({
            x: startX + Math.random() * imageRect.size * 0.018,
            y: startY + Math.random() * imageRect.size * 0.012,
            vx: (targetX - startX) * (0.5 + Math.random() * 0.18),
            vy: (targetY - startY) * (0.04 + Math.random() * 0.08),
            gravity: imageRect.size * (1.05 + Math.random() * 0.25),
            life: 0,
            maxLife: 0.62 + Math.random() * 0.22,
            floorY: imageRect.y + imageRect.size * 0.8,
            radius: Math.max(2, imageRect.size * (0.003 + Math.random() * 0.0018)),
            alpha: 0.72 + Math.random() * 0.22
        });
    }

    function drawWaterDrop(drop) {
        const fade = Math.max(0, 1 - drop.life / drop.maxLife);

        ctx.save();
        ctx.globalAlpha = drop.alpha * Math.min(1, drop.life * 8) * fade;
        ctx.fillStyle = "#bfe8df";
        ctx.strokeStyle = "rgba(255, 253, 235, 0.65)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(drop.x, drop.y, drop.radius * 0.78, drop.radius * 1.35, 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    function animateWatering(timestamp) {
        if (!lastTime) lastTime = timestamp;

        const delta = Math.min((timestamp - lastTime) / 1000, 0.04);
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        lastTime = timestamp;
        spawnTimer += delta;

        while (spawnTimer > 0.045) {
            makeWaterDrop(width, height);
            spawnTimer -= 0.045;
        }

        ctx.clearRect(0, 0, width, height);

        for (let i = drops.length - 1; i >= 0; i -= 1) {
            const drop = drops[i];

            drop.life += delta;
            drop.x += drop.vx * delta;
            drop.y += drop.vy * delta + drop.gravity * drop.life * delta;

            if (drop.life >= drop.maxLife || drop.y > drop.floorY) {
                drops.splice(i, 1);
                continue;
            }

            drawWaterDrop(drop);
        }

        wateringAnimationId = requestAnimationFrame(animateWatering);
    }

    resizeWateringCanvas();
    wateringAnimationId = requestAnimationFrame(animateWatering);
    window.addEventListener("resize", resizeWateringCanvas);
}

const luckyCloverButtons = document.querySelectorAll(".luckyCloverButton");

if (luckyCloverButtons.length > 0) {
    const luckyRewards = [
        "./img/character image/jeju.png",
        "./img/character image/jeju2.png",
        "./img/character image/jeju3.png"
    ];

    const luckyModal = document.createElement("div");

    luckyModal.className = "luckyCloverModal";
    luckyModal.innerHTML = `
        <div class="luckyCloverModalBox">
            <button class="luckyCloverClose" type="button" aria-label="Close">&times;</button>
            <img class="luckyCloverCoupon" src="" alt="">
        </div>
    `;

    document.body.appendChild(luckyModal);

    function openLuckyCloverModal() {
        const reward = luckyRewards[Math.floor(Math.random() * luckyRewards.length)];
        const image = luckyModal.querySelector(".luckyCloverCoupon");

        image.src = reward;
        image.alt = "Lucky clover reward";
        luckyModal.classList.add("on");
    }

    function closeLuckyCloverModal() {
        luckyModal.classList.remove("on");
    }

    luckyCloverButtons.forEach(function (button) {
        button.addEventListener("click", openLuckyCloverModal);
    });

    luckyModal.addEventListener("click", function (e) {
        if (e.target === luckyModal || e.target.closest(".luckyCloverClose")) {
            closeLuckyCloverModal();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeLuckyCloverModal();
        }
    });
}

const eventPop = document.querySelector(".eventPop");
const eventPopSessionKey = "forlogEventPopPlayed";

function hasPlayedEventPop() {
    try {
        return window.sessionStorage.getItem(eventPopSessionKey) === "true";
    } catch (error) {
        return false;
    }
}

function rememberEventPopPlayed() {
    try {
        window.sessionStorage.setItem(eventPopSessionKey, "true");
    } catch (error) {
        // Ignore storage errors so private browsing or blocked storage still runs the page.
    }
}

const shouldPlayEventPop = eventPop && !hasPlayedEventPop();
let isEventIntroDone = !shouldPlayEventPop;
let isHeroLogoReady = !shouldPlayEventPop;

if (eventPop && !shouldPlayEventPop) {
    eventPop.classList.add("hide");
}

if (shouldPlayEventPop) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const clovers = [];
    const duration = 3200;
    const fadeOutDuration = 550;
    const heroLogoLeadTime = 800;
    let startTime = 0;
    let animationId = null;

    canvas.className = "eventPopCanvas";
    eventPop.appendChild(canvas);
    document.body.classList.add("eventIntroPlaying");
    rememberEventPopPlayed();

    function eventEaseOut(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function eventEaseInOut(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function eventLerp(a, b, t) {
        return a + (b - a) * t;
    }

    function eventKeyframeValue(t, frames) {
        if (t <= frames[0][0]) return frames[0][1];

        for (let i = 1; i < frames.length; i += 1) {
            const prev = frames[i - 1];
            const next = frames[i];

            if (t <= next[0]) {
                const local = (t - prev[0]) / (next[0] - prev[0]);
                return eventLerp(prev[1], next[1], eventEaseInOut(local));
            }
        }

        return frames[frames.length - 1][1];
    }

    function resizeEventCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        makeEventClovers(width, height);
        drawEventPop(0);
    }

    function makeEventClovers(width, height) {
        const colors = ["#5e7e3a", "#7f9850", "#aab664", "#c3ca75"];
        const gap = Math.max(54, Math.min(width, height) * 0.09);
        const cols = Math.ceil(width / gap) + 3;
        const rows = Math.ceil(height / gap) + 3;

        clovers.length = 0;

        for (let row = -1; row < rows; row += 1) {
            for (let col = -1; col < cols; col += 1) {
                const x = col * gap + Math.random() * gap * 0.55;
                const y = row * gap + Math.random() * gap * 0.55;
                const dist = Math.hypot(x - width / 2, y - height / 2);
                const maxDist = Math.hypot(width / 2, height / 2);
                const angle = Math.atan2(y - height / 2, x - width / 2);

                clovers.push({
                    x,
                    y,
                    size: gap * (0.65 + Math.random() * 0.28),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    lineColor: Math.random() > 0.35 ? "#34552c" : "#fffdeb",
                    rotation: Math.random() * Math.PI * 2,
                    delay: (dist / maxDist) * 0.32,
                    moveX: Math.cos(angle) * (24 + Math.random() * 54),
                    moveY: Math.sin(angle) * (24 + Math.random() * 54)
                });
            }
        }
    }

    function drawEventClover(item, progress) {
        const local = Math.max(0, Math.min(1, (progress - item.delay) / 0.68));
        const eased = eventEaseOut(local);
        const alpha = 1 - eased;
        const size = item.size * (1 - eased * 0.25);

        if (alpha <= 0.01) return;

        ctx.save();
        ctx.translate(item.x + item.moveX * eased, item.y + item.moveY * eased);
        ctx.rotate(item.rotation + eased * 1.4);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = item.color;

        for (let i = 0; i < 4; i += 1) {
            ctx.save();
            ctx.rotate((Math.PI / 2) * i);
            ctx.beginPath();
            ctx.ellipse(-size * 0.13, -size * 0.24, size * 0.27, size * 0.36, -Math.PI / 5, 0, Math.PI * 2);
            ctx.ellipse(size * 0.13, -size * 0.24, size * 0.27, size * 0.36, Math.PI / 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        ctx.strokeStyle = item.lineColor;
        ctx.lineWidth = Math.max(1.3, size * 0.045);
        ctx.lineCap = "round";
        ctx.globalAlpha = alpha * 0.78;

        for (let i = 0; i < 4; i += 1) {
            ctx.save();
            ctx.rotate((Math.PI / 2) * i);
            ctx.beginPath();
            ctx.moveTo(0, -size * 0.05);
            ctx.lineTo(0, -size * 0.36);
            ctx.stroke();
            ctx.restore();
        }

        ctx.restore();
    }

    function drawEventCloverShape(x, y, size, rotation, fillColor, lineColor, alpha) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = fillColor;

        for (let i = 0; i < 4; i += 1) {
            ctx.save();
            ctx.rotate((Math.PI / 2) * i);
            ctx.beginPath();
            ctx.ellipse(-size * 0.13, -size * 0.24, size * 0.27, size * 0.36, -Math.PI / 5, 0, Math.PI * 2);
            ctx.ellipse(size * 0.13, -size * 0.24, size * 0.27, size * 0.36, Math.PI / 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        if (lineColor) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = Math.max(1.3, size * 0.045);
            ctx.lineCap = "round";
            ctx.globalAlpha = alpha * 0.78;

            for (let i = 0; i < 4; i += 1) {
                ctx.save();
                ctx.rotate((Math.PI / 2) * i);
                ctx.beginPath();
                ctx.moveTo(0, -size * 0.05);
                ctx.lineTo(0, -size * 0.36);
                ctx.stroke();
                ctx.restore();
            }
        }

        ctx.restore();
    }

    function drawEventCloverReveal(x, y, size, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        for (let i = 0; i < 4; i += 1) {
            ctx.save();
            ctx.rotate((Math.PI / 2) * i);
            ctx.beginPath();
            ctx.ellipse(-size * 0.13, -size * 0.24, size * 0.27, size * 0.36, -Math.PI / 5, 0, Math.PI * 2);
            ctx.ellipse(size * 0.13, -size * 0.24, size * 0.27, size * 0.36, Math.PI / 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        ctx.restore();
    }

    function drawEventFinalMotion(progress, width, height) {
        const start = 0.46;
        const local = Math.max(0, Math.min(1, (progress - start) / (1 - start)));

        if (local <= 0) return;

        const baseSize = Math.min(width, height);
        const moveEnd = 0.82;
        const moveProgress = Math.min(local / moveEnd, 1);
        const zoom = local > 0.52 ? eventEaseOut((local - 0.52) / 0.48) : 0;
        const drift = eventEaseInOut(moveProgress);
        const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
        const floorOffset = rootFontSize * 10;
        const startX = width * 0.12;
        const endX = width * 0.66;
        const startY = height * 0.26;
        const endY = height - floorOffset;
        const arc = Math.sin(moveProgress * Math.PI) * baseSize * 0.28;
        const x = eventLerp(startX, endX, drift);
        const y = eventLerp(startY, endY, drift) - arc;
        const cloverSize = baseSize * 0.08;
        const visibleCloverSize = cloverSize + (baseSize * 1.2 * zoom);
        const visibleAlpha = Math.min(local * 3.2, 1) * (1 - zoom * 0.25);
        const rotation = -0.35 + moveProgress * 1.05;

        drawEventCloverShape(
            x,
            y,
            visibleCloverSize,
            rotation,
            "#aab664",
            "#6d883f",
            visibleAlpha
        );

        if (zoom > 0) {
            const revealSize = visibleCloverSize + (baseSize * 2.8 * zoom);

            ctx.save();
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "#000";
            drawEventCloverReveal(x, y, revealSize, rotation);
            ctx.restore();
        }
    }

    function drawEventPop(progress) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#fffdeb";
        ctx.fillRect(0, 0, width, height);

        clovers.forEach(function (item) {
            drawEventClover(item, progress);
        });

        drawEventFinalMotion(progress, width, height);
    }

    function notifyHeroLogoReady() {
        if (isHeroLogoReady) return;

        isHeroLogoReady = true;
        window.dispatchEvent(new Event("heroLogoReady"));
    }

    function animateEventPop(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        drawEventPop(progress);

        if (elapsed >= duration - heroLogoLeadTime) {
            notifyHeroLogoReady();
        }

        if (progress < 1) {
            animationId = requestAnimationFrame(animateEventPop);
            return;
        }

        eventPop.classList.add("hide");
        cancelAnimationFrame(animationId);
        notifyHeroLogoReady();

        setTimeout(function () {
            document.body.classList.remove("eventIntroPlaying");
            isEventIntroDone = true;
            window.dispatchEvent(new Event("eventIntroDone"));
        }, fadeOutDuration);
    }

    resizeEventCanvas();
    animationId = requestAnimationFrame(animateEventPop);
    window.addEventListener("resize", resizeEventCanvas);
}

const sec3CloverCanvas = document.querySelector(".sec3CloverCanvas");

if (sec3CloverCanvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const sec3 = sec3CloverCanvas.closest(".sec3");
    const ctx = sec3CloverCanvas.getContext("2d");
    const clovers = [];
    let sec3CloverAnimationId = null;

    function makeNonGreenHue() {
        let hue = Math.random() * 360;

        while (hue > 70 && hue < 170) {
            hue = Math.random() * 360;
        }

        return hue;
    }

    function resizeSec3CloverCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = sec3.getBoundingClientRect();

        sec3CloverCanvas.width = Math.floor(rect.width * dpr);
        sec3CloverCanvas.height = Math.floor(rect.height * dpr);
        sec3CloverCanvas.style.width = `${rect.width}px`;
        sec3CloverCanvas.style.height = `${rect.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        makeSec3Clovers(rect.width, rect.height);
    }

    function makeSec3Clovers(width, height) {
        clovers.length = 0;

        for (let i = 0; i < 12; i += 1) {
            const size = 34 + Math.random() * 58;

            clovers.push({
                x: size + Math.random() * Math.max(1, width - size * 2),
                y: size + Math.random() * Math.max(1, height - size * 2),
                size,
                speedX: -1.2 + Math.random() * 2.4,
                speedY: -1.2 + Math.random() * 2.4,
                rotate: Math.random() * Math.PI * 2,
                rotateSpeed: -0.01 + Math.random() * 0.02,
                color: `hsla(${makeNonGreenHue()}, 70%, 80%, 0.3)`
            });
        }
    }

    function drawSec3Clover(clover) {
        const size = clover.size;

        ctx.save();
        ctx.translate(clover.x, clover.y);
        ctx.rotate(clover.rotate);
        ctx.fillStyle = clover.color;

        for (let i = 0; i < 4; i += 1) {
            ctx.save();
            ctx.rotate((Math.PI / 2) * i);
            ctx.beginPath();
            ctx.moveTo(0, size * 0.06);
            ctx.bezierCurveTo(-size * 0.52, -size * 0.18, -size * 0.5, -size * 0.72, 0, -size * 0.54);
            ctx.bezierCurveTo(size * 0.5, -size * 0.72, size * 0.52, -size * 0.18, 0, size * 0.06);
            ctx.fill();
            ctx.restore();
        }
        ctx.restore();
    }

    function animateSec3Clovers() {
        const width = sec3CloverCanvas.clientWidth;
        const height = sec3CloverCanvas.clientHeight;

        ctx.clearRect(0, 0, width, height);

        clovers.forEach(function (clover) {
            clover.x += clover.speedX;
            clover.y += clover.speedY;
            clover.rotate += clover.rotateSpeed;

            if (clover.x + clover.size > width || clover.x - clover.size < 0) {
                clover.speedX *= -1;
            }

            if (clover.y + clover.size > height || clover.y - clover.size < 0) {
                clover.speedY *= -1;
            }

            drawSec3Clover(clover);
        });

        sec3CloverAnimationId = requestAnimationFrame(animateSec3Clovers);
    }

    resizeSec3CloverCanvas();
    sec3CloverAnimationId = requestAnimationFrame(animateSec3Clovers);
    window.addEventListener("resize", resizeSec3CloverCanvas);
}

 $(function(){
            $(document).on('mouseenter', '.gnb > li', function(){
                $('.snb').stop().slideUp(300)
                $(this).children('.snb').stop().slideDown(300)
            })
            $(document).on('mouseleave', '.gnb > li', function(){
                $('.snb').stop().slideUp(300)
            })

            $(document).on('click', '.ham', function(){
                $('.dim').addClass('on')
                $('.hamSideMenu').addClass('on')
            })
            $(document).on('click', '.dim', function(){
                $('.dim').removeClass('on')
                $('.hamSideMenu').removeClass('on')
            })
            $(document).on('click', '.close', function(){
                $('.dim').removeClass('on')
                $('.hamSideMenu').removeClass('on')
            })
            //?�이???�라?�드 메뉴) :: ?�코?�언 구현
            $(document).on('click', '.hamGnb>li>a', function(e){
                if ($(this).attr('href') !== '#') {
                    return true
                }

                e.preventDefault() //a?�그가 ?�래 가지�??�던 기능??막기

                let myMenu = $(this).siblings('.hamSnb') //?�릭??li a?�그???�제(hamSnb)

                $('.hamSnb').not(myMenu).stop().slideUp(300) //?��? ?�릭??메뉴 말고 ???�기

                $(this).siblings('.hamSnb').stop().slideToggle(300) //?��? ?�택??메뉴???�브메뉴�?보이�?
            })
        })

        const rule=document.querySelector(".BestGallery")
        const observer30=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.3

        })

        if (rule) {
    observer30.observe(rule);
}
// ?�기??Shot?�쩌고의 ?�리
    const txt1=document.querySelector(".heroContent2")
        const observer2=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.3

        })

if (txt1) {
    observer2.observe(txt1);
}
// ?�트컷의 ?��?지가 ?�라?�는 부�?
 const slowUp=document.querySelector(".boxUp")
        const observer10=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.3

        })

        if (slowUp) {
    observer10.observe(slowUp);
}

 const slowUp2=document.querySelector(".boxDown")
        const observer11=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.3

        })

        if (slowUp2) {
    observer11.observe(slowUp2);
}

// ??----------------------------

// About For-log???�작(?��?�?----------------------
 const pikabu=document.querySelector(".character span:nth-child(1)")
        const observer12=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.3

        })

        if (pikabu) {
    observer12.observe(pikabu);
}

 const pikabu2=document.querySelector(".character span:nth-child(2)")
        const observer13=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.3

        })

        if (pikabu2) {
    observer13.observe(pikabu2);
}

 const characterImg=document.querySelector(".character img")
        const observer14=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.3
        })

        if (characterImg) {
    observer14.observe(characterImg);
}

// ?�래?�명??CSS?� ?�같??.characterWrap?�로 맞춰주세??
const cham = document.querySelector(".character span:nth-child(2)");

const observerBB = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            const target = entry.target;
            
            // 1. 먼�? ?��?�??�용 ?�래?��? 추�??�서 �?번째 ?�니메이???�작!
            target.classList.add("on"); 
            
            // 2. �?번째 ?�니메이?�이 ?�나???�점??감시?�는 ?�벤??리스???�록
            // CSS가 transition 기반?�라�?'transitionend', @keyframes 기반?�라�?'animationend' ?�용
            target.addEventListener("animationend", function handleNextAnimation() {
                
                // ?�기???��?�??�니메이?�이 ?�난 ???�행??코드�??�습?�다.
                console.log("?��?�??�니메이??종료! ?�음 ?�니메이?�을 ?�작?�니??");
                
                // ?�시: ?�음 ?�니메이?�을 ?�리거할 ?�래??추�?
                target.classList.add("next-animation-on");
                
                // ?�벤?��? ??번만 ?�행?�고 ?�거 (메모�?관�?�?중복 ?�행 방�?)
                target.removeEventListener("animationend", handleNextAnimation);
            });

            // ??�??�어?�???�행?�다�??��?�?관찰을 종료 (?�치 ?�으?�면 지?�셔???�니??
            observerBB.unobserve(target);
        }
    });
}, {
    threshold: 0.3
});

if (cham) {
    observerBB.observe(cham);
}

//?�남-----------------------------

const fadeSlider = document.querySelector(".slider");
const fadeDots = document.querySelectorAll(".dots > div");

if (fadeSlider) {
    const fadeImages = fadeSlider.querySelectorAll("img");
    let fadeIndex = 0;
    let fadeTimer = null;

    function showFadeSlide(index) {
        fadeIndex = index;

        fadeImages.forEach(function (img, imgIndex) {
            img.classList.toggle("on", imgIndex === index);
        });

        fadeDots.forEach(function (dot, dotIndex) {
            dot.classList.toggle("on", dotIndex === index);
        });
    }

    function startFadeAuto() {
        clearInterval(fadeTimer);

        fadeTimer = setInterval(function () {
            showFadeSlide((fadeIndex + 1) % fadeImages.length);
        }, 3000);
    }

    if (fadeImages.length > 0) {
        showFadeSlide(fadeIndex);
        startFadeAuto();

        fadeDots.forEach(function (dot, dotIndex) {
            dot.addEventListener("click", function () {
                showFadeSlide(dotIndex);
                startFadeAuto();
            });
        });
    }
}

const reviewStart = document.querySelector(".reviewStart");

if (reviewStart) {
    fetch("./products.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (categories) {
            reviewStart.innerHTML = "";

            categories.slice(0, 4).forEach(function (category, categoryIndex) {
                const band = document.createElement("div");
                band.className = "productBand";

                band.innerHTML = `
                    <img class="productBandBg" src="./img/SVG files/pattern/circliewhite.svg" alt="product background">
                    <section class="productSection">
                        <div class="productList">
                            <div class="categoryRow">
                                <h3 class="categoryTitle">${category.category}</h3>
                                <div class="productViewport">
                                    <div class="productTrack"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                `;

                const track = band.querySelector(".productTrack");

                category.items.forEach(function (item, itemIndex) {
                    const card = document.createElement("article");
                    const price = 18000 + categoryIndex * 3200 + itemIndex * 1200;
                    const formattedPrice = `${price.toLocaleString("ko-KR")}\uC6D0`;

                    card.className = "productCard";
                    card.dataset.title = item.title;
                    card.dataset.creator = item.creator;
                    card.dataset.desc = item.desc;
                    card.dataset.image = item.image;
                    card.dataset.price = formattedPrice;
                    card.dataset.rating = (4.7 + (itemIndex % 3) * 0.1).toFixed(1);

                    card.innerHTML = `
                        <div class="productInner">
                            <img class="productImg" src="${item.image}" alt="${item.title}" draggable="false">
                            <div class="productInfo">
                                <h4>${item.title}</h4>
                                <p class="productCreator">${item.creator}</p>
                                <p>${item.desc}</p>
                            </div>
                        </div>
                    `;

                    track.appendChild(card);
                });

                reviewStart.appendChild(band);
            });

            makeProductModal();
            makeProductDrag();
        });
}

function makeProductDrag() {
    const viewports = document.querySelectorAll(".productViewport");

    viewports.forEach(function (viewport, viewportIndex) {
        const slideDirection = viewportIndex % 2 === 0 ? 1 : -1;
        let isDown = false;
        let isMoved = false;
        let startX = 0;
        let scrollLeft = 0;
        let autoTimer = null;
        let pressedCard = null;
        let segmentStart = 0;
        let segmentWidth = 0;
        let cardStep = 0;
        let slideIndex = 0;
        let centerUpdateFrame = null;

        function setupInfiniteTrack() {
            const track = viewport.querySelector(".productTrack");

            if (!track || track.dataset.infiniteReady === "true") return;

            const originalCards = Array.from(track.querySelectorAll(".productCard"));

            if (originalCards.length === 0) return;

            const beforeClones = originalCards.map(function (card) {
                const clone = card.cloneNode(true);
                clone.classList.add("productCardClone");
                return clone;
            });

            const afterClones = originalCards.map(function (card) {
                const clone = card.cloneNode(true);
                clone.classList.add("productCardClone");
                return clone;
            });

            beforeClones.reverse().forEach(function (clone) {
                track.insertBefore(clone, track.firstChild);
            });

            afterClones.forEach(function (clone) {
                track.appendChild(clone);
            });

            segmentStart = originalCards[0].offsetLeft;
            segmentWidth = afterClones[0].offsetLeft - originalCards[0].offsetLeft;
            cardStep = originalCards[1]
                ? originalCards[1].offsetLeft - originalCards[0].offsetLeft
                : originalCards[0].offsetWidth;

            syncCircleBackgroundSize();
            viewport.scrollLeft = segmentStart;
            slideIndex = 0;
            track.dataset.infiniteReady = "true";
            updateCenterCard();
        }

        function syncCircleBackgroundSize() {
            const band = viewport.closest(".productBand");

            if (!band || !cardStep) return;

            const circleGap = 360.2;
            const svgHeight = 1450.6;
            const backgroundSize = (cardStep * svgHeight / circleGap / band.offsetHeight) * 100;

            band.style.setProperty("--circle-bg-size", `${backgroundSize}%`);
        }

        function normalizeInfiniteScroll() {
            if (!segmentWidth) return;

            if (viewport.scrollLeft < segmentStart - 1) {
                viewport.scrollLeft += segmentWidth;
            }

            if (viewport.scrollLeft >= segmentStart + segmentWidth - 1) {
                viewport.scrollLeft -= segmentWidth;
            }

            slideIndex = Math.round((segmentStart - viewport.scrollLeft) / getCardStep());
            updateCenterCard();
        }

        function updateCenterCard() {
            const cards = Array.from(viewport.querySelectorAll(".productCard"));

            if (cards.length === 0) return;

            const viewportRect = viewport.getBoundingClientRect();
            const viewportCenter = viewportRect.left + (viewportRect.width / 2);
            let closestCard = null;
            let closestDistance = Infinity;

            cards.forEach(function (card) {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + (cardRect.width / 2);
                const distance = Math.abs(viewportCenter - cardCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCard = card;
                }
            });

            cards.forEach(function (card) {
                card.classList.toggle("is-center", card === closestCard);
            });
        }

        function requestCenterCardUpdate() {
            if (centerUpdateFrame) return;

            centerUpdateFrame = requestAnimationFrame(function () {
                centerUpdateFrame = null;
                updateCenterCard();
            });
        }

        function getCardStep() {
            if (!cardStep) {
                const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;

                return 30 * rootFontSize;
            }

            return cardStep;
        }

        function startAutoSlide() {
            stopAutoSlide();

            autoTimer = setInterval(function () {
                const cardStep = getCardStep();

                normalizeInfiniteScroll();
                const nextScrollLeft = viewport.scrollLeft - (cardStep * slideDirection);

                viewport.scrollTo({
                    left: nextScrollLeft,
                    behavior: "smooth"
                });
                setTimeout(normalizeInfiniteScroll, 700);
            }, 2000);
        }

        function stopAutoSlide() {
            if (!autoTimer) return;

            clearInterval(autoTimer);
            autoTimer = null;
        }

        viewport.addEventListener("pointerdown", function (e) {
            e.preventDefault();
            stopAutoSlide();
            isDown = true;
            isMoved = false;
            pressedCard = e.target.closest(".productCard");
            viewport.classList.add("dragging");
            viewport.setPointerCapture(e.pointerId);
            startX = e.pageX;
            scrollLeft = viewport.scrollLeft;
        });

        viewport.addEventListener("pointermove", function (e) {
            if (!isDown) return;

            e.preventDefault();

            const moveX = e.pageX - startX;
            const walk = moveX * 1.8;

            if (Math.abs(moveX) > 8) {
                isMoved = true;
            }

            viewport.scrollLeft = scrollLeft - walk;
        });

        viewport.addEventListener("pointerup", function () {
            isDown = false;
            viewport.classList.remove("dragging");

            if (pressedCard && !isMoved) {
                openProductModal(pressedCard.dataset);
            }

            pressedCard = null;
            normalizeInfiniteScroll();
            startAutoSlide();
        });

        viewport.addEventListener("pointercancel", function () {
            isDown = false;
            pressedCard = null;
            viewport.classList.remove("dragging");
            normalizeInfiniteScroll();
            startAutoSlide();
        });

        viewport.addEventListener("mouseenter", stopAutoSlide);
        viewport.addEventListener("scroll", requestCenterCardUpdate);
        window.addEventListener("resize", requestCenterCardUpdate);
        viewport.addEventListener("mouseleave", function () {
            isDown = false;
            pressedCard = null;
            viewport.classList.remove("dragging");
            normalizeInfiniteScroll();
            startAutoSlide();
        });

        setupInfiniteTrack();
        startAutoSlide();
    });
}

function makeProductModal() {
    if (document.querySelector(".productModal")) return;

    const modal = document.createElement("div");
    modal.className = "productModal";
    modal.innerHTML = `
        <div class="productModalBox">
            <button class="productModalClose" type="button" aria-label="Close">&times;</button>
            <div class="productModalImageWrap">
                <img class="productModalImg" src="" alt="">
            </div>
            <div class="productModalText">
                <div class="productModalMeta">
                    <span class="productModalBadge">NEW</span>
                    <span class="productModalRating"><span>&#9733;&#9733;&#9733;&#9733;&#9733;</span> <em></em></span>
                </div>
                <h3></h3>
                <p class="productModalCreator"></p>
                <strong class="productModalPrice"></strong>
                <p class="productModalDesc"></p>
            </div>
            <button class="productModalCart" type="button">Add to cart</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", function (e) {
        if (e.target.closest(".productModalCart")) {
            addCurrentModalProductToCart();
            window.location.href = "../products/cart_test.html";
            return;
        }

        if (e.target === modal || e.target.closest(".productModalClose")) {
            closeProductModal();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeProductModal();
        }
    });
}

function getHomeProductCartId(title) {
    let hash = 0;
    const text = String(title || "home-product");

    for (let i = 0; i < text.length; i += 1) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash |= 0;
    }

    return 900000 + Math.abs(hash % 99999);
}

function getHomeProductCartPrice(priceText) {
    const parsed = parseInt(String(priceText || "").replace(/[^\d]/g, ""), 10);

    return Number.isNaN(parsed) ? 22000 : parsed;
}

function getHomeProductCartImage(imagePath) {
    if (!imagePath) return "";
    if (/^(https?:|data:|\/)/.test(imagePath)) return imagePath;

    return `../Home/${imagePath.replace(/^\.\//, "")}`;
}

function getHomeProductModalDesc(desc) {
    return String(desc || "").replace(/<br\s*\/?>/gi, "\n");
}

function addCurrentModalProductToCart() {
    const modal = document.querySelector(".productModal");

    if (!modal) return;

    const title = modal.dataset.title || modal.querySelector(".productModalText h3").textContent;
    const priceText = modal.dataset.price || modal.querySelector(".productModalPrice").textContent;
    const imagePath = modal.dataset.image || modal.querySelector(".productModalImg").getAttribute("src");
    const productId = getHomeProductCartId(title);
    const cartItem = {
        id: productId,
        name: title,
        price: getHomeProductCartPrice(priceText),
        image: getHomeProductCartImage(imagePath),
        quantity: 1
    };
    const cart = JSON.parse(localStorage.getItem("forlog_cart")) || [];
    const existingItem = cart.find(function (item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem("forlog_cart", JSON.stringify(cart));
}

function openProductModal(item) {
    const modal = document.querySelector(".productModal");

    if (!modal) return;

    const img = modal.querySelector(".productModalImg");

    img.src = item.image;
    img.alt = item.title;
    modal.querySelector(".productModalText h3").textContent = item.title;
    modal.querySelector(".productModalCreator").textContent = item.creator;
    modal.querySelector(".productModalPrice").textContent = item.price || "22,000\uC6D0";
    modal.querySelector(".productModalRating em").textContent = `(${item.rating || "4.9"})`;
    modal.querySelector(".productModalDesc").textContent = getHomeProductModalDesc(item.desc);
    modal.dataset.title = item.title;
    modal.dataset.price = item.price || "22,000\uC6D0";
    modal.dataset.image = item.image;
    modal.classList.add("on");
    document.body.classList.add("modalOpen");
}

function closeProductModal() {
    const modal = document.querySelector(".productModal");

    if (!modal) return;

    modal.classList.remove("on");
    document.body.classList.remove("modalOpen");
}

const mainPopup = document.querySelector("#mainPopup");

function setMainPopupCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getMainPopupCookie(name) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(function (item) {
        return item.startsWith(name + "=");
    });

    return cookie ? cookie.split("=")[1] : null;
}

function updateMainPopupState() {
    if (!mainPopup) return;

    const visibleItems = mainPopup.querySelectorAll(".mainPopupItem:not(.hide)");

    mainPopup.classList.toggle("hide", visibleItems.length === 0);
}

if (mainPopup) {
    const popupItems = mainPopup.querySelectorAll(".mainPopupItem");

    popupItems.forEach(function (item) {
        const popupId = item.dataset.popupId;
        const cookieName = `mainPopupPreview_${popupId}`;

        if (getMainPopupCookie(cookieName) === "close") {
            item.classList.add("hide");
        }

        item.querySelector(".mainPopupClose").addEventListener("click", function () {
            const todayCheckbox = item.querySelector(".mainPopupToday input");

            if (todayCheckbox && todayCheckbox.checked) {
                setMainPopupCookie(cookieName, "close", 1);
            }

            item.classList.add("hide");
            updateMainPopupState();
        });
    });

    updateMainPopupState();
}

// 베스??리뷰???�리
        const View=document.querySelector(".sec5>div>span")
        const observerView=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.3

        })

        if (View) {
    observerView.observe(View);
}
//메인글??빼먹?�서 ?��?�?추�?

const MM=document.querySelector(".heroLogo")
        const observerMM=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    entry.target.classList.add("on")
                }
                // }else{
                //     entry.target.classList.remove("on")
                // }
            })
        },{
            threshold: 0.1

        })

if (MM) {
    function startHeroLogoObserver() {
        observerMM.observe(MM);
    }

    if (isHeroLogoReady) {
        startHeroLogoObserver();
    } else {
        window.addEventListener("heroLogoReady", startHeroLogoObserver, { once: true });
    }
}
