import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import CardItem from './CardItem';

class App extends Component {
  state = {
    CardList: [{ // 定义卡片内容
      title: '1 Card',
      id: 1,
      content: 'this is first Card',
    }, {
      title: '2 Card',
      id: 2,
      content: 'this is second Card',
    }, {
      title: '3 Card',
      id: 3,
      content: 'this is Third Card',
    },  {
      title: '4 Card',
      id: 4,
      content: 'this is Third Card',
    },  {
      title: '5 Card',
      id: 5,
      content: 'this is Third Card',
    },  {
      title: '6 Card',
      id: 6,
      content: 'this is Third Card',
    }],
  };

  handleDND = (dragIndex,hoverIndex) => {
    console.log('handleDND:', dragIndex, hoverIndex);
    let CardList = this.state.CardList;
    let tmp = CardList.splice(dragIndex, 1) //移除拖拽项
    CardList.splice(hoverIndex, 0, tmp[0]) //插入放置项
    this.setState({
      CardList
    })
  };

  render() {
    const { CardList } = this.state;
    console.log('CardList:', CardList);

    return (
      <DndProvider backend={HTML5Backend}>
        <div className="card">
          {CardList.map((item, index) => {
            return (
              <CardItem //向次级界面传递参数
                key={item.id}
                title={item.title}
                content={item.content}
                index={index}
                onDND={this.handleDND}
              />
            );
          })}
        </div>
      </DndProvider>
    );
  }
}

export default App
// export default DragDropContext(HTML5Backend)(App);

