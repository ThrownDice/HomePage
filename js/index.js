/**
 * Created by TD on 2015-06-29.
 */
(function(window, document, SlideMgr){

    var controller = {};

    controller.initialize = function(){
        controller.container.initialize();
    };

    controller.header = {};
    controller.container = {};
    controller.footer = {};

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

    $(function(){

        controller.initialize();

        $(window).on('resize', function(){
            controller.container.arrangePosition();
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