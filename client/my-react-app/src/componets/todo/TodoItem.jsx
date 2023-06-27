import {useState} from 'react'
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai"
import {FcCancel} from "react-icons/fc"

export default function TodoItem({todoId, description}) {
  const [wantToEdit, setWantToEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  const [inputValue, setInputValue] = useState(description)
  const deleteTodo = async () => {

  }

  const handleCompleted = async () => {
    try {
      setIsChecked(!isChecked);

      if (!isChecked) {
        // Send edit request when checkbox is checked
        const setCompletedFalse= await axios.put(`${import.meta.env.VITE_SERVER_URL}/todo/${todoId}`, {
          completed: false,
        });

        console.log("Set completed to false")
        
      } else {
        // Send another request when checkbox is unchecked
        const setCompletedTrue = await axios.put(`${import.meta.env.VITE_SERVER_URL}/todo/${todoId}`, {
          completed: true
        });

        console.log("Set to completed")
      }
    } catch (err) {
      console.log('There has been an error:', err);
    }
  }

  const handleEdit = async () => {
    try {
      const editTodo = await axios.put(`${import.meta.env.VITE_SERVER_URL}/todo/${todoId}`, {
        description: inputValue
      });
    } catch(err) {
      console.log("There has been a error editing this post")
    }
  }

  const handleCancel = () => {
    setWantToEdit(false);
    setInputValue(description)
  }
   
  return (
    <div className='flex justify-center'>
      <input type="checkbox" checked={isChecked} onChange={handleCompleted} />
      {wantToEdit ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='text-black'
        />
      ) : (
        <input type="text" disabled className='text-black bg-white' value={"ehey I love you"}/>
      )}
      {
        wantToEdit ? (
          <div>
            <button onClick={() => setWantToEdit(false)}><FcCancel/></button>
            <button onClick={handleEdit}><AiOutlineCheck/></button>
          </div>
        ) : <button onClick={() => setWantToEdit(true)}><AiFillEdit/></button>
      }
      <button><AiFillDelete/></button>

    </div>
  )
}
