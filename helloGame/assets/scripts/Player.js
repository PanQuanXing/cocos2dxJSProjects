// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    //继承自主件Component类
    extends: cc.Component,

    properties: {
    	
    	jumpHeight:0,
    	jumpDuration:0,
    	maxMoveSpeed:0,
    	accel:0,
        jumpAudio:{
            default:null,
            url:cc.AudioClip
        }

    },


    //使用的是CommonJs规范

    setJumpAction:function(){
        //弹起动作
        var jumpUp=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        //落下动作
        var jumpDown=cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback=cc.callFunc(this.playJumpSound,this);
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown,callback));
    },

    //播放音效函数
    playJumpSound:function(){
        cc.audioEngine.playEffect(this.jumpAudio,false);
    },
    //action入口
    onLoad:function(){
        //初始化跳跃动作
        this.jumpAction=this.setJumpAction();
        this.node.runAction(this.jumpAction);

        this.accLeft=false;
        this.accRight=false;

        this.xSpeed=0;

        this.setInputControl();
    },
    //添加键盘输入事件
    setInputControl:function(){
        var self=this;
        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.a:
                        self.accLeft=true;
                        self.accRight=false;
                        break;
                    case cc.KEY.d:
                        self.accLeft=false;
                        self.accRight=true;
                        break;
                }
            },
            onKeyReleased:function(keyCode,event){
                switch(keyCode){
                    case cc.KEY.a:
                        self.accLeft=false;
                        break;
                    case cc.KEY.d:
                        self.accRight=false;
                        break;
                }
            }
        },self.node);
    },
    //update接口用于更新主角的action
    update:function(dt){
        if(this.accLeft){
            this.xSpeed-=this.accel*dt;
        }else if(this.accRight){
            this.xSpeed+=this.accel*dt;
        }
        //限制MaxSpeed
        if(Math.abs(this.xSpeed)>this.maxMoveSpeed){
            this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed);
        }
        this.node.x+=this.xSpeed*dt;
    },

    start () {

    },

    // update (dt) {},
});
