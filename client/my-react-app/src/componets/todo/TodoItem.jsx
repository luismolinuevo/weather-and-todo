import {useState} from 'react'
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai"
import {FcCancel} from "react-icons/fc"

export default function TodoItem() {
  const [wantToEdit, setWantToEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  const deleteTodo = async () => {

  }

  const handleCompleted = async () => {
    try {
      setIsChecked(!isChecked);

      if (!isChecked) {
        // Send edit request when checkbox is checked
        const editResponse = await axios.put(`${import.meta.env.VITE_SERVER_URL}/item/${itemId}`, {
          value: 'Edited value',
        });
        console.log('Edit request successful:', editResponse.data);
      } else {
        // Send another request when checkbox is unchecked
        const otherResponse = await axios.post(`${import.meta.env.VITE_SERVER_URL}/item/${itemId}/action`);
        console.log('Other request successful:', otherResponse.data);
      }
    } catch (err) {
      console.log('There has been an error:', err);
    }
  }

  const handleEdit = async () => {

  }
   
  return (
    <div className='flex justify-center'>
      <input type="checkbox" checked={isChecked} onChange={handleCompleted} />
      <input type="text" />
      {
        wantToEdit ? (
          <div>
            <button onClick={() => setWantToEdit(false)}><FcCancel/></button>
            <button><AiOutlineCheck/></button>
          </div>
        ) : <button onClick={() => setWantToEdit(true)}><AiFillEdit/></button>
      }
      <button><AiFillDelete/></button>

    </div>
  )
}
