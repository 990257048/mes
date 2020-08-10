
class Layer extends React.Component {
    
    refFn (t){
        $(t).off("mousedown");
        $(t).on("mousedown", function (ev){
            //console.log(this.__proto__, ev.target);
            if(this == ev.target){
                var floatBox = $(this).parent();
                var t_position = {
                    x: floatBox[0].offsetLeft,
                    y: floatBox[0].offsetTop
                }
                var e_position = {
                    x: ev.clientX,
                    y: ev.clientY  
                }
                $(document).on("mousemove", function (ev){
                    var ex = ev.clientX;
                    var ey = ev.clientY;
                    var tx = t_position.x + (ex - e_position.x);
                    var ty = t_position.y + (ey - e_position.y);
                    var maxl = window.innerWidth - floatBox[0].clientWidth;
                    var maxt = window.innerHeight - floatBox[0].clientHeight - 90;
                    floatBox.css({
                        left: (tx <= 0 ? 0 : tx > maxl ? maxl : tx ) + "px",
                        top: (ty <= 0 ? 0 : ty > maxt ? maxt : ty) + "px"
                    });
                });
            }
        });
        $(document).on("mouseup", function (ev){
            $(document).off("mousemove");
        });
    }
    render (){
        var {option, onClose, onPrimary, onCancel} = this.props;
        var {Content, title , w, h, display} = option.LayerOption;
        var style = {
            position:"absolute",
            boxSizing:"content-box",
            boxShadow: "0px 10px 15px #111",
            border: "1px solid #4e7af3",
            display:display,
            width: w + "px",
            height: h + 60 + "px",
            left: "calc(50% - "+ w / 2 +"px)",
            top: "calc(50% - "+ (h + 60) / 2 +"px)",
            zIndex:200
        }
        return <div className="mes-layer" style={style}>
            <div className="mes-layer-title" ref={this.refFn.bind(this)}>
                {title}
                <div className="mes-layer-close glyphicon glyphicon-remove" onClick={ev => {onClose(ev)}}></div>
            </div>
            <Content option={option} />
            <div className="mes-layer-bottom">
                <button className="layer-primary" onClick={ev => {onPrimary(ev)}}>确认</button>
                <button className="layer-cancel" onClick={ev => {onCancel(ev)}}>取消</button>
            </div> 
        </div>
    }
}