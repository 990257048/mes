class Control_Select_Option extends React.Component{
    constructor(...args){
        super(...args);

    }
    render(){
        return <option>xxxxxxxxxxxxxxxxxxxx</option>
    }
}

class Control_Select extends React.Component{
    constructor(...args){
        super(...args);

    }
    render(){
        return <div className='ctr-wrap'>
            <div className='ctr-lable'></div>
            <div className='ctr'>
                <select>
                    <Control_Select_Option></Control_Select_Option>
                    <Control_Select_Option></Control_Select_Option>
                    <Control_Select_Option></Control_Select_Option>
                    <Control_Select_Option></Control_Select_Option>
                </select>
            </div>
        </div>
    }
}

class Control_Textarea extends React.Component{
    constructor(...args){
        super(...args);

    }
    render(){
        return <div className='ctr-wrap'>
            <div className='ctr-lable'></div>
            <div className='ctr-big'>
                <textarea></textarea>
            </div>
        </div>
    }
}

class Control_Pwd extends React.Component{
    constructor(...args){
        super(...args);

    }
    render(){
        return <div className='ctr-wrap'>
            <div className='ctr-lable'></div>
            <div className='ctr'>
                <input type='password' />
            </div>
        </div>
    }
}

class Control_Text extends React.Component{
    constructor(...args){
        super(...args);

    }
    render(){
        return <div className='ctr-wrap'>
            <div className='ctr-lable'></div>
            <div className='ctr'>
                <input type='text' />
            </div>
        </div>
    }
}

class FloatContent extends React.Component{
    constructor(...args){
        super(...args);

    }
    render(){
        return <div className='float-content'>
            <Control_Text></Control_Text>
            <Control_Pwd></Control_Pwd>
            <Control_Text></Control_Text>
            <Control_Select></Control_Select>
            <Control_Text></Control_Text>
            <Control_Text></Control_Text>
            <Control_Text></Control_Text>
            <Control_Text></Control_Text>
            <Control_Text></Control_Text>
            <Control_Textarea></Control_Textarea>
        </div>
    }
}

class FloatContentWrap extends React.Component{
    constructor(...args){
        super(...args);

    }
    render(){
        return <div className='float-content-wrap'>
            <FloatContent></FloatContent>
        </div>
    }
}


class FloatTop extends React.Component{
    constructor(...args){
        super(...args);


        this.componentDidMount = ()=>{
            console.log("第一次渲染后执行！");
            console.log(this.refs);
            this.ref_call(this.refs.floatTop);
        }
    }

    static contextTypes = {
        cbs:PropTypes.object
    }

    ref_call = t=>{
        //console.log(t);
        $(t).on("mousedown",function (ev){
            //console.log('mousedown event!',this == ev.target);
            if(this == ev.target){
                var ox = ev.offsetX;
                var oy = ev.offsetY;
                var cx = ev.clientX;
                var cy = ev.clientY;
                var x0 = cx-ox;
                var y0 = cy-oy;
                var cw = Number( $(document.body).css('width').replace('px','') );
                var ch = Number( $(document.body).css('height').replace('px','') );
                var w = Number( $(this).parent().css('width').replace('px','') );
                var h = Number( $(this).parent().css('height').replace('px','') );
                $(document).on("mousemove",function (ev){
                    //console.log(ev.clientX,ev.clientY,cx,cy);
                    var dx = ev.clientX - cx;
                    var dy = ev.clientY - cy;
                    var x = x0 + dx;
                    var y = y0 + dy;
    
                    x = x < 0 ? 0 : x > cw - w ? cw - w : x;
                    y = y < 0 ? 0 : y > ch - h ? ch - h : y; 
    
                    $(t).parent().css({
                        'top': y + 'px',
                        'left': x + 'px'
                    });
                });

            }
            
        });
        $(document).on("mouseup",function (ev){
            $(document).off("mousemove");
        });
    }
    close_float = ev=>{
        //console.log('close click!');
        this.context.cbs.report_close_float_box_call();
        
    }
    render(){
        console.log('float top render !');
        return <div ref='floatTop' className='float-top'>
            <p>New</p>
            <div onMouseDown={ ev=>{this.close_float.call(this,ev)} } className='close-float glyphicon glyphicon-remove'></div>
        </div>
    }
}

class FloatBox extends React.Component{
    constructor(...args){
        super(...args);

    }
    render(){
        console.log('float box render !');
        const {w,h,v} = this.props;
        var style = {
            width:w + 'px',
            height:h + 'px',
            top:'calc(50% - '+ h/2 +'px)',
            left:'calc(50% - '+ w/2 +'px)',
            display:v ? 'block':'none'
        }
        return <div style={style}  className='float-box'>
            <FloatTop></FloatTop>
            <FloatContentWrap></FloatContentWrap>
        </div>
    }
}
