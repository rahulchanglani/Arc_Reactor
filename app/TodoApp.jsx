import React, { PropTypes } from 'react';

export default class TodoApp extends React.Component {
  state = {
    draftItem: '',
    items: [],
  }
  handleChange = (e) => {
    this.setState({
      draftItem: e.target.value,
    });
  }
  handleKeyDown = (e) => {
    const ENTER_KEY_CODE = 13;

    if (e.keyCode === ENTER_KEY_CODE) {
      this.setState({
        draftItem: '',
        items: [...this.state.items, this.state.draftItem],
      });
    }
  }
  handleRemoveItem = (itemId) => {
    this.setState({
        items: this.state.items.filter((item, id) => id !== itemId),
    });
  }
  render() {
    return (
      <div className="todo-app">
        <h1>To Do List</h1>
        <input
        type="text" 
        value={this.state.draftItem}
        className="todo-app__input"  
        onChange={this.handleChange} 
        onKeyDown={this.handleKeyDown} 
        />
        {this.state.items.map((item,id) => (
          <TodoItem
            id={id}
            key={id}
            value={item}
            onRemoveItem={this.handleRemoveItem}
           />
        ))}
      </div>
    );
  }
}


class TodoItem extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    value: PropTypes.string,
    onRemoveItem: PropTypes.func,
  };
  render() {
    return (
      <div className="todo-item clearfix">
        <div className="todo-item__content">{this.props.value}</div>
        <span 
         className="todo-item__remove"
         onClick={() => this.props.onRemoveItem(this.props.id)} 
         >&times;</span>
     </div>
    )
  }
}