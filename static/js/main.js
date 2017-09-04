/**
 * Created by js on 2017/8/28.
 */

    var ww = $(window).width();
    $('.voice-img').css({'transform':'scale(' + ww/750 + ')'});
    var voice =[
        $('audio')[0],
        $('audio')[1],
        $('audio')[2],
        $('audio')[3]
    ];
    function transDelay(swiper){
        $('.ani-ele').removeClass('ani-ele-change');
        var ele = swiper.slides[swiper.activeIndex].querySelectorAll('.ani-ele');
        for(i=0; i<ele.length; i++){
            delay = ele[i].attributes["transition-delay"] ? ele[i].attributes["transition-delay"].value : "";
            delay && (style1 = "transition-delay:" + delay + ";-webkit-transition-delay:" + delay + ";");
            ele[i].setAttribute("style", style1);
            ele[i].className = ele[i].className + " ani-ele-change"
        }
    }
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        //loop: true,
        speed:600,
        //followFinger : false,
        //freeMode:true,
        //freeModeSticky:true,
        //freeModeMomentumRatio:0.1,
        onInit: function(swiper){
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
            typeText($('.slide-one'),80);
            $('.jt-icon').css({'opacity':1});
        },
        onSlideChangeEnd: function(swiper){
            //console.log(swiper);
            var index = swiper.activeIndex;
            swiperAnimate(swiper);
            transDelay(swiper);
            stopVoice();
            $('.ani-zhen').removeClass('zhen-gif');
            if(index === 0){
                typeText($('.slide-one'),80);
                $('.jt-icon').css({'opacity':1});
            }
            if(index=== 1){
                $('.slide-one').find('.typeText').html('');
                //$('.slide-two').find('.country').addClass('country-change');
            }
            if(index === 2){
                $('.ani-zhen').addClass('zhen-gif');
            }
            if(index === 3){
                insideSwiper.slideTo(0);
                $('.voice-img').addClass('anim-voice');
                voice[0].play();
            }
        },
        onTouchMove: function(swiper){
            var index = swiper.activeIndex;
            //console.log(index);
            var aniEle =  $('.out-slide').eq(index+1).find('.ani-bg');
            var preEle =  $('.out-slide').eq(index-1).find('.ani-bg');
            //console.log(aniEle);
            if(index !== 7){
                $('.ani-bg').removeClass('tra-ani');
            }
            aniEle.addClass('tra-ani');
            preEle.addClass('tra-ani');

        }
    });
    var insideSwiper = new  Swiper('.inside-swiper',{
        direction: 'horizontal',
        //loop: true,
        speed:500,
        followFinger : false,
        pagination: '.swiper-pagination',
        onSlideChangeEnd:function(e){
            var n = e.activeIndex;
            stopVoice();
            $('.voice-img').addClass('anim-voice');
            voice[n].play();
        }
    });

    $('.contrl-btn').on('click',function(){
        var _voice = $(this).find('.voice-img');
        var t = $('.inside-swiper .swiper-slide-active').index();
        if(_voice.hasClass('anim-voice')){
            voice[t].pause();
            _voice.removeClass('anim-voice');
        }else{
            $('.voice-img').addClass('anim-voice');
            voice[t].play();
        }
    });
    function typeText(ele,speed){
        var textContainer = ele.find('.typeText');
        var text=textContainer.attr('data-text');
        var textArr=text.split("");
        var i=0;
        var timer=setInterval(show,speed);
        function show(){
            if(i < textArr.length) {
                textContainer.append(textArr[i]);
                i=i+1;
            }
            if( i >= textArr.length){
                clearInterval(timer)
            }
        }

    };
    function stopVoice(){
        var i=0;
        for( i=0;i<=3;i++){
            voice[i].pause();
            voice[i].currentTime = 0;
        }
    }
    //var n=0;
    //var imgData=[];
    //for(n=0;n<149;n++){
    //    imgData.push(
    //        {
    //            name: 'fps_'+(n+1),
    //            path: './images/zhen/fps_'+(n+1)+'.jpg'
    //        }
    //    )
    //}
    //LInit(requestAnimationFrame, "legend", 380, 380, main);
    //function main() {
    //    LLoadManage.load(imgData,
    //        function(progress){
    //            console.log(progress)
    //        },gameInit);
    //}
    //function gameInit(result) {
    //    var datas = [];
    //    var listChild = [];
    //    for (var i = 0; i < 150; i++) {
    //        datas.push(new LBitmapData(result["fps_" + i]));
    //        listChild.push({dataIndex : i, x : 0, y : 0, width : 380, height : 380, sx : 0, sy : 0});
    //    }
    //    var playerRight = new LAnimationTimeline(datas, [listChild]);
    //    addChild(playerRight);
    //}


