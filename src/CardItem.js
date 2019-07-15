import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Card } from 'antd';

import {
  DragSource,
  DropTarget,
} from 'react-dnd'

import flow from 'lodash/flow';

// DragSource
const SpecSource = {
  beginDrag(props, monitor, component){ // 拖拽开始时触发的事件，必须，返回props相关对象
    return {
      index: props.index
    }
  },
  canDrag(props, monitor){
    return true
  },
};

// DropTarget
const SpecTarget = {
  hover(props, monitor, component){
    if(!component)
      return null; //异常处理判断

    const dragIndex = monitor.getItem().index;//拖拽目标的Index
    const hoverIndex = props.index; //放置目标Index
    if(dragIndex === hoverIndex)
      return null;// 如果拖拽目标和放置目标相同的话，停止执行

    //如果不做以下处理，则卡片移动到另一个卡片上就会进行交换，下方处理使得卡片能够在跨过中心线后进行交换.
    const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect();//获取卡片的边框矩形

    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;//获取X轴中点
    const clientOffset = monitor.getClientOffset();//获取拖拽目标偏移量
    const hoverClientX = (clientOffset).x - hoverBoundingRect.left;

    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) { // 从前往后放置
      return null
    }

    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) { // 从后往前放置
      return null
    }
  },
  onDrop(props, monitor, component) {
    const dragIndex = monitor.getItem().index;//拖拽目标的Index
    const hoverIndex = props.index; //放置目标Index
    if(dragIndex === hoverIndex)
      return null;// 如果拖拽目标和放置目标相同的话，停止执行

    props.onDND(dragIndex, hoverIndex); // 调用App.js中方法完成交换
    monitor.getItem().index = hoverIndex; //重新赋值index，否则会出现无限交换情况
  }
};

// 设置 connect，把拖拽过程中需要信息注入组件的 props
function collectDragSource(connect, monitor) {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
  }
}
function collectDragTarget(connect, monitor) {
  return {
    isOver: monitor.isOver(), // source 是否在 Target 上方
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),//能否被放置
    itemType: monitor.getItemType(),//获取拖拽组件type

    connectDropTarget: connect.dropTarget(),
  };
}

class CardItem extends Component{
  render(){
    const { isOver, connectDragSource, connectDropTarget, index } = this.props;

    if(isOver) {
      console.log('index:',index)
    }
    // console.log('index,isDragging:',index,isDragging)

    let opacity = isOver ? 0.1 : 1; // 当被拖拽时呈现透明效果

    return connectDragSource( // 使用DragSource 和 DropTarget
      connectDropTarget(
        <div>
          <Card
            title={this.props.title}
            style={{ width: 300 ,opacity}}
          >
            <p>{this.props.content} - {index}</p>
          </Card>
        </div>
      )
    )
  }
}

// 使组件连接 DragSource 和 DropTarget
export default flow(
  DragSource('CARD', SpecSource, collectDragSource),
  DropTarget('CARD', SpecTarget, collectDragTarget)
)(CardItem)
