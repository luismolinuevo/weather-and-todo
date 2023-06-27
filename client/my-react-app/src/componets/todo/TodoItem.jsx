import axios from 'axios';
import {useState} from 'react'
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai"
import {FcCancel} from "react-icons/fc"

//Single todo item
export default function TodoItem({todoId, description, completed}) {
  const [wantToEdit, setWantToEdit] = useState(false);
  const [inputValue, setInputValue] = useState(description)
  const [isChecked, setIsChecked] = useState(completed)

  //Set todo to completed or active
  const handleCompleted = async () => {
    try {
      setIsChecked(!isChecked);

      if (!isChecked) {
        // Send edit request when checkbox is checked
        const setCompletedFalse= await axios.put(`${import.meta.env.VITE_SERVER_URL}/todo/${todoId}`, {
          completed: true,
        });

        console.log("Set completed to false")
        window.location.reload(false);
        
      } else {
        // Send another request when checkbox is unchecked
        const setCompletedTrue = await axios.put(`${import.meta.env.VITE_SERVER_URL}/todo/${todoId}`, {
          completed: false
        });

        console.log("Set to completed")
        window.location.reload(false);
      }
    } catch (err) {
      console.log('There has been an error:', err);
    }
  }

  //Handles the edit of a todo description
  const handleEdit = async () => {
    try {
      const editTodo = await axios.put(`${import.meta.env.VITE_SERVER_URL}/todo/${todoId}`, {
        description: inputValue
      });

      setWantToEdit(false);
      window.location.reload(false);
    } catch(err) {
      console.log("There has been a error editing this post")
    }
  }

  //Handles the deletion of a todo
  const handleDelete = async () => {
    try {
      const deleteTodo = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/todo/${todoId}`);
      console.log("Deleted post");
      // window.location.reload(false);
    } catch(err) {
      console.log("There has been a error trying to delete this post")
    }
  }

  //Cancels the edit process
  const handleCancel = () => {
    setWantToEdit(false);
    setInputValue(description)
  }
   
  return (
    <div className='flex justify-center pt-1'>
      <div className='bg-white flex h-[40px] items-center'>
      <input type="checkbox" checked={isChecked} onChange={handleCompleted} className="h-6 w-6 text-indigo-600 mr-2"/>
      {wantToEdit ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='text-black h-[40px] text-3xl w-[200px] sm:w-[400px]'
        />
      ) : (
        <input type="text" disabled className='text-black bg-white h-[40px] text-3xl w-[250px] sm:w-[400px]' value={description}/>
      )}
      {
        wantToEdit ? (
          <div>
            <button onClick={() => setWantToEdit(false)}><FcCancel className='h-[35px] text-blue-500'/></button>
            <button onClick={handleEdit}><AiOutlineCheck className='h-[35px] text-blue-500'/></button>
          </div>
        ) : <button onClick={() => setWantToEdit(true)}><AiFillEdit className='h-[35px] text-blue-500'/></button>
      }
      <button onClick={handleDelete}><AiFillDelete className='h-[35px] text-blue-500'/></button>
      </div>
    </div>
  )
}
