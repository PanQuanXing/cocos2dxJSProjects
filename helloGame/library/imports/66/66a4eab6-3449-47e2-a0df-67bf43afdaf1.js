"use strict";
cc._RF.push(module, '66a4eq2NElH4qDfZ79Dr9rx', 'Game');
// scripts/Game.js

'use strict';

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
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,

        ground: {
            default: null,
            type: cc.Node
        },

        player: {
            default: null,
            type: cc.Node
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        //声明得分音效资源
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.groundY = this.ground.y + this.ground.height / 2;
        //this.spawnNewStar();

        //初始化计分
        //this.score=0;

        //初始化计时变量,在调用生成星星方法spawnNewStar()前加入计时需要的变量声明
        this.timer = 0;
        //生成一个新的星星
        this.spawnNewStar();
        //初始化计分
        this.score = 0;
    },

    spawnNewStar: function spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('Star').game = this;

        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function getNewStarPosition() {
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX = this.node.width / 2;
        var randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, randY);
    },

    start: function start() {},
    update: function update(dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },

    gameOver: function gameOver() {
        this.player.stopAllActions();
        //重新加载&开始
        cc.director.loadScene('game');
    },
    //得分后调用的函数
    gainScore: function gainScore() {
        this.score += 1;
        this.scoreLabel.string = 'SCORE:' + this.score.toString();
        //播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }
});

cc._RF.pop();