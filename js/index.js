/**
 * Created by TD on 2015-06-29.
 */
(function(window, document, SlideMgr){

    var controller = {};
    var scroll = {};
    scroll.value = 0;
    scroll.max = 100;
    scroll.min = 0;

    controller.initialize = function(){
        controller.container.initialize();
    };

    controller.header = {};
    controller.container = {};
    controller.footer = {};

    //header controller
    //------------------------------------------------
    controller.header.status = {
        WHITE : 'white',
        BLACK : 'black',
        CURRENT : 'white'
    };

    controller.header.toggle = function(){
        var w_header = $('#header');
        var b_header = $('#_header');
        switch(controller.header.status.CURRENT){
            case 'white' :
                w_header.fadeOut(1000);
                b_header.css('display','block').animate({
                    opacity : 0.75
                },1000);
                controller.header.status.CURRENT = 'black';
                break;
            case 'black' :
                w_header.fadeIn(1000);
                b_header.fadeOut(1000);
                controller.header.status.CURRENT = 'white';
                break;
        }
    };


    controller.header.show = function(){
        $('#header').animate({
            top : 0
        },1000);
        $('#_header').animate({
            top : 0
        },1000);
    };

    controller.header.hide = function(){
        $('#header').animate({
           top : -1000
        },1000);
        $('#_header').animate({
            top : -1000
        },1000);
    };

    //container controller
    //------------------------------------------------
    controller.container.initialize = function(){

        controller.container.nodeCoordinate = [];
        controller.container.gridUnit = 30;

        var node_am = {name : 'am', left : 0, top : 0};
        var node_history = {name : 'mhistory', left : 9, top : 0};
        var node_board = {name : 'board', left : 16, top : 0};
        var node_logo = {name : 'logo', left : 23, top : 0};
        var node_lab = {name : 'lab', left : 0, top : 10};
        var node_project = {name : 'project', left : 5, top : 10};
        var node_posting = {name : 'posting', left : 16, top : 8};

        controller.container.nodeCoordinate.push(node_am);
        controller.container.nodeCoordinate.push(node_history);
        controller.container.nodeCoordinate.push(node_board);
        controller.container.nodeCoordinate.push(node_logo);
        controller.container.nodeCoordinate.push(node_lab);
        controller.container.nodeCoordinate.push(node_project);
        controller.container.nodeCoordinate.push(node_posting);

        controller.container.arrangePosition();
        controller.container.setNodeCoordinate();
    };

    controller.container.arrangePosition = function(){
        var $c = $('#container');
        //container size
        var c_width = $c.width();
        var c_height = $c.height();
        //screen size
        var $w = $(window);
        var s_width = $w.width();
        var s_height = $w.height();

        $c.css({
            left : s_width / 2 - c_width / 2,
            top : s_height / 2 - c_height / 2
        });
    };

    controller.container.setNodeCoordinate = function(){
        var len = controller.container.nodeCoordinate.length;
        var unit = controller.container.gridUnit;
        for(var i=0; i<len; i++){
            var node = controller.container.nodeCoordinate[i];
            if(node){
                $('#container .' + node.name).css({
                    position : 'absolute',
                    left : node.left * unit,
                    top : node.top * unit
                });
            }
        }
    };

    controller.container.hide = function(){
        $('#container').fadeOut(1000);
    };

    controller.container.show = function(){
        $('#container').fadeIn(1000);
    };

    $(function(){

        controller.initialize();

        $(window).on('resize', function(){
            controller.container.arrangePosition();
        });

        addWheelListener(document.body, function(event){

            var flag = 0; // 1:hide, -1:show, 0:nothing

            if(!scroll.value && event.deltaY > 0){
                flag = 1;
            }

            if(event.deltaY > 0 && scroll.value != scroll.max){
                scroll.value++;
            }else if(event.deltaY < 0 && scroll.value != scroll.min){
                scroll.value--;
                if(!scroll.value) flag = -1;
            }

            //console.log('scroll value : ' + scroll.value);

            if(flag == 1){
                controller.header.toggle();
                controller.container.hide();
            }else if(flag == -1){
                controller.header.toggle();
                controller.container.show();
            }

        });

        var $canvas = $('.osi-canvas');
        $canvas.width(window.screen.availWidth).height(window.screen.availHeight);

        SlideMgr.setConfig({
            container : $canvas.get(0),
            start : 7,
            end : 100,
            prefix : 'osi/img/Journey.To.The.Edge.Of.The.Universe.2008.720p.BluRay.x264-REQ [PublicHD].avi-',
            extendType : 'jpg',
            scrollColor : 'white',
            render_interval : 30,
            animate_interval : 10,
            callback : function(){

                $('#container').fadeIn(1000);

                /*SlideMgr.addText({
                    show_frame : 10,
                    hide_frame : 50,
                    animate_frame : 10,
                    text : 'My Vision',
                    font : '30px Georgia',
                    x : 100,
                    y : 100
                });

                SlideMgr.addText({
                    show_frame : 40,
                    hide_frame : 70,
                    animate_frame : 10,
                    text : 'is co-working',
                    font : '30px Georgia',
                    x : 200,
                    y : 200
                });*/

            }
        });


    });


})(window, document, SlideMgr);
