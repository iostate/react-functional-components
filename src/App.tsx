import React, { useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';



function App() {

  const [list, setList] = useState([
    {
      id: 1,
      task: 'Create tasks',
      completed: false,
    },
    {
      id: 2,
      task: 'Read tasks',
      completed: false,
    },
    {
      id: 3,
      task: 'Mark complete',
      completed: false,
    },
    {
      id: 4,
      task: 'Delete tasks',
      completed: false,
    },
  ]);

  const [currentItem, setCurrentItem] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem(event.target.value);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // list.push(event.target.value);

    // generate an unused id
    let newId = 1;
    let sortedListByIds = list.slice().sort((a, b) => (a.id - b.id))

    for (let i = 0; i < sortedListByIds.length; i++) {
      if (newId === sortedListByIds[i].id) {
        newId++
      }
    }
    const newItem = {
      id: newId,
      task: currentItem,
      completed: false
    }


    // build new state object
    const newState = [...list, newItem];


    setList(newState);
    setCurrentItem('');
  }

  const deleteTask = (id: number) => {

    const removeIndex = list.map(el => el.id).indexOf(id);

    const filterList = list.filter((el) => el.id !== id);
    console.log(filterList)
    setList(filterList)
  }

  return (
    <>
      <Grid fluid>
        <Row>
          <Col xs={6} md={3}>
            <h3>Things to do:</h3>
            <ul>
              {list.length ? (list.map(item => (
                <React.Fragment key={item.id}>
                  <li>
                    {item.task}
                  </li> <button onClick={() => deleteTask(item.id)}> - </button>
                </React.Fragment>
              ))
              ) : (null)
              }
              {currentItem ? (<><li>{currentItem}</li></>) : (null)}
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h4>Add task: </h4>
            <form onSubmit={handleSubmit}>
              <input type="text" id="addTask" autoFocus value={currentItem} onChange={handleChange}>


              </input>
            </form>
          </Col>
        </Row>
      </Grid>

    </>
  );
}

export default App;
