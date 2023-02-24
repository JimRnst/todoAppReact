import React from 'react';
import { Task } from '../types';
import { FaTrashAlt } from 'react-icons/fa';

interface Props{
  details: Array<Task>
  detFilter: Array<Task>
  isActive: string
  setDetails: React.Dispatch<React.SetStateAction<Task[]>>
  setDetFilter: React.Dispatch<React.SetStateAction<Task[]>>
}

const Details = ({details, detFilter, isActive, setDetails, setDetFilter}: Props) => {

  const handleSelect = (id: number): void => {
    
    setDetails(
      details.map(todo => {
        if (todo.id === id) return { ...todo, check: !todo.check };
        return todo;
      })
    )
    
    setDetFilter(
        detFilter.map(todo => {
          if (todo.id === id) return { ...todo, check: !todo.check };
          return todo;
        })
    )

    if(isActive === 'active'){
      setDetFilter(
        detFilter.filter(det => det.id !== id)
      )
    }

    if(isActive === 'comp'){  
      setDetFilter(
        detFilter.filter(det => det.id !== id)
      )
    }
  
  }

  const handleDelete = (id: number) => {
    setDetails(
      details.filter(det => det.id !== id)
    )

    setDetFilter(
      detFilter.filter(det => det.id !== id)
    )

  }

  const handleDeleteAll = () => {
    setDetails(
      details.filter(det => det.check !== true)
    )

    setDetFilter(
      detFilter.filter(det => det.check !== true)
    )

  }

  return (
    <div className="content">
      {
          detFilter.map((el: Task) => {
            return(
                <div className='datails' key={el.id}>
                    <input 
                      className='checkbox'
                      type="checkbox"
                      defaultChecked={el.check}
                      onClick={() => {handleSelect(el.id)}}
                    />
                    <div
                      className = {`${
                        el.check ? 'line-through' : ''
                      } datail-text`}
                    >
                      {el.description}
                    </div>
                    {isActive === 'comp' ?
                        <div 
                        className="completed"
                        onClick={() => handleDelete(el.id)}
                        >
                          <FaTrashAlt />
                        </div>
                        
                      : ''
                    }
                </div>
            )
          })
        }
      {details.filter(el => el.check === true).length > 0 && isActive === 'comp' ?
        <div className='btn-delete'>
          <button 
            className='delete'
            onClick={handleDeleteAll}
          >
            <FaTrashAlt />
            Delete All
          </button>
        </div>
      :
        ''

      }
    </div>

  )
}

export default Details;