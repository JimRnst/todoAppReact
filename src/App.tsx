import React, {useEffect, useState} from 'react';
import AddDetails from './components/AddDetails';
import Details from './components/Details';
import { Task } from './types';

interface AppState{
  detail: Array<Task>
  detFilter: Array<Task>
  isActive: string
}

const defatul_state = [
  {
    id: 0,
    check: false,
    description: 'Default Taks'
  }
]

function App() {

  const [details, setDetails] = useState<AppState["detail"]>([]);

  const [detFilter, setDetFilter] = useState<AppState["detail"]>([]);

  const [isActive, setIsActive] = useState<AppState["isActive"]>('all');


  useEffect(() => {
    setDetails(defatul_state)
    setDetFilter(defatul_state)
  }, []);

  useEffect(() => {
    localStorage.setItem('detail', JSON.stringify(details))
  }, [details])

  const handleSelected = (act: string): void => {
    if(act === 'all') setDetFilter(details);
    if(act === 'active') setDetFilter(details.filter(el => el.check === false));
    if(act === 'comp') setDetFilter(details.filter(el => el.check === true));

    setIsActive(act);
  }

  const handleNewDetail = (newDet: Task): void => {
    setDetails(detail => [...detail, newDet])
  }

  return (
    <div className="App">
      <header>
        <h1>#todo</h1>
        <div className='menu'>
          <div
            className={`${isActive === 'all' ? 'menu-link active' : 'menu-link'}`}
            onClick={() => {
              handleSelected('all');
            }}
          >All</div>
          <div
            className={`${isActive === 'active' ? 'menu-link active' : 'menu-link'}`}
            onClick={() => {
              handleSelected('active');
            }}
          >Active</div>
          <div
            className={`${isActive === 'comp' ? 'menu-link active' : 'menu-link'}`}
            onClick={() => {
              handleSelected('comp');
            }}
          >Completed</div>
        </div>
      </header>
      <main>
        {isActive !== 'comp' ?
          <AddDetails handleNewDetail={handleNewDetail} setDetFilter={setDetFilter} isActive={isActive}/>
        :
          ''
        }
        <Details details={details} detFilter={detFilter} isActive={isActive} setDetails={setDetails} setDetFilter={setDetFilter}/>
      </main>
    </div>
  );
}

export default App;
