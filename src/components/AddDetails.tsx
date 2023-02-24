import React, { useState } from 'react';
import { Task } from '../types';

interface AddProps{
  handleNewDetail: (newDet: Task) => void
  isActive: string
  setDetFilter: React.Dispatch<React.SetStateAction<Task[]>>
}

const AddDetails = ({handleNewDetail, setDetFilter, isActive}: AddProps) => {

  const [key, setKey] = useState<number>(1);

  const [input, setInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(
      e.target.value
    )
  }

  const handleNewFilter = (newDet: Task): void => {
    setDetFilter(detail => [...detail, newDet])
  }

  const handleSubmit = (): void => {
    if(input){
      handleNewDetail(
        {
          id: key,
          check: false,
          description: input
        }
      )
      
      handleNewFilter(
        {
          id: key,
          check: false,
          description: input
        }
      )

      if(isActive === 'comp'){
        handleNewDetail(
          {
            id: key,
            check: false,
            description: input
          }
        )
      }

      setKey(key + 1)

      setInput('')
    }
  }

  return (
    <div className="input-add" key={key}>
        <input
          name='add'
          className='add-details'
          type="text"
          placeholder='Add details'
          value={input}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add</button>
    </div>
  )
}

export default AddDetails