<template>
    <div class="ivu-tree dragtree">
        <li :id='model.id' @click="toggle">
            <span v-show="model.children" :class="[isClicked ? 'nodeClicked' : '','ivu-icon ivu-icon-arrow-right-b']"></span>
            <span class='ivu-tree-title' :code='model.Code'>{{model.title}}</span>
        </li>
        <ul class='ivu-tree-children' v-show="open" v-if="isFolder">
            <mytree v-for="model in model.children" :model="model" :key='model.id' default-text='defaultText' :hover-color='hoverColor'>
            </mytree>
        </ul>
    </div>
</template>

<script>
import * as d3 from 'd3';

let id = 1000
let nodeClicked = undefined   // Attention: 递归的所有组件共享同一个＂顶级作用域＂（这个词或许不太正确，但就这个意思）．即：共享上面这几个let变量．这为实现当前节点的高亮提供了基础．

export default {
    name:'mytree',
    data() {
        return {
            open: false,
            isClicked: false,
        }
    },
    props: {
        model: Object,
        other:'',
        'default-text': String, // 填加节点时显示的默认文本．
        'current-highlight': Boolean, // 当前节点高亮
        'hover-color': String,
    },
    computed: {
        isFolder() {
            return this.model.children &&
                this.model.children.length
        },
    },
    methods: {
        toggle() {
            if (this.isFolder) {
                this.open = !this.open
            }
            // 调用vue-drag-tree的父组件中的方法,以传递出当前被点击的节点的id值
            let rootTree = this.findRoot()
            //　API: 对外开放的当前被点击节点的信息
            // rootTree.$parent.curNodeClicked(this.model, this)

            // 纪录节点被点击的状态
            this.isClicked = !this.isClicked

            // 用户需要节点高亮？　-->　this.currentHighlight ? 高亮 : 不高亮
            if (this.currentHighlight) {
                // 第一次点击当前节点．当前节点高亮，遍历重置其他节点的样式
                if (nodeClicked != this.model.id) {
                    let treeParent = rootTree.$parent

                    // 遍历重置所有树组件的高亮样式
                    let nodeStack = [treeParent.$children[0]]
                    while (nodeStack.length != 0) {
                        let item = nodeStack.shift()
                        if (item.$children && item.$children.length > 0) {
                            nodeStack = nodeStack.concat(item.$children)
                        }
                    }

                    // 设置为当前节点
                    nodeClicked = this.model.id
                }
            }
        },
        exchangeData(rootCom, from, to) {
            //如果drag的目的地是 + - 符号的话，退出。
            if (!to || !from || typeof to == 'string' || from.id == to.id) {
                return
            }

            from = JSON.parse(JSON.stringify(from))
            to = JSON.parse(JSON.stringify(to))
            // copy一个,最后再赋值给state.treeData.这样能保证值的变化都会触发视图刷新(因为JS判断引用类型是否相同是根据内存地址.)
            let treeData = JSON.parse(JSON.stringify(this.model))
            let nodeStack = [treeData]
            let status = 0

            // 如果from或者to节点存在父子/祖辈关系，会报id of undefined的错。这种情况不考虑拖拽功能，所以catch住，返回/return就行
            try {
                // 广度优先遍历,找到涉及数据交换的两个对象.然后交换数据.
                while (!(status === 2)) {
                    let item = nodeStack.shift()
                    if (item.id == from.id) {
                        item.id = to.id
                        item.name = to.name
                        if (to.children && to.children.length > 0) {
                            item['children'] = to.children
                        } else {
                            item.children = []
                        }
                        status++
                        //找到后,跳出当前循环.
                        continue;
                    }
                    if (item.id == to.id) {
                        item.id = from.id
                        item.name = from.name
                        if (from.children && from.children.length > 0) {
                            item['children'] = from.children
                        } else {
                            item.children = []
                        }
                        status++
                        //找到后,跳出当前循环.
                        continue;
                    }
                    if (item.children && item.children.length > 0) {
                        nodeStack = nodeStack.concat(item.children)
                    }
                }
            } catch (e) {
                return
            }
            //API: 对外开放交换后的数据的赋值操作
            rootCom.assignData(treeData)
        },
        findRoot() {
            // 返回Tree的根,即递归Tree时的最顶层那个vue-drag-tree组件
            let ok = false
            let that = this
            while (!ok) {
                // 如果父组件有data属性，说明当前组件是Tree组件递归调用发生时的第一个组件。
                // Warning: 因为是判断data属性是否存在，所有在别人使用该组件时，属性名必须得是data
                // v1.0.9-update: add another judgement method.
                if (!/VueDragTreeCom42/.test(that.$parent.$vnode.tag) || that.$parent.data) {
                    ok = true
                    // 交换两者的数据 
                    break
                }
                that = that.$parent
            }
            return that
        },
    },
}
</script>

<style lang="scss" scoped>
    .dragtree{
        /deep/.ivu-tree-title{
          -webkit-user-drag: element;
          cursor: move;
          -webkit-user-select: none;
        }
    }
    li{
        list-style:none;
    }
    .ivu-icon-arrow-right-b{
        cursor:pointer;
    }
    .ivu-tree-children{
        margin: 0;
        padding: 0 0 0 18px;
    }

    .bold {
        font-weight: bold;
    }

    .treeNodeText {
        margin: 2px;
        padding: 0.2rem 0.5rem;
        width: fit-content;
        font-size: 18px;
        color: #324057;
    }

    .treeMargin {
        margin-left: 2rem;
    }

    .changeTree {
        width: 1rem;
        color: #324057;
    }

    .vue-drag-node-icon {
        display: inline-block;
        width: 0;
        height: 0;
        padding-right: 3px;
        border-left: 6px solid black;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 0 solid yellow;
        transition: transform .3s ease-in-out;
    }

    .nodeClicked {
        transform: rotate(90deg);
    }
</style>
