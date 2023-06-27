import {useState} from 'react'
import axios from "axios";
import {GrAdd} from "react-icons/gr"

//Creates a todo
export default function TodoInput() {
    const [description, setDescription] = useState("")
    const handleCreateTodo = async () => {
        try {
            const createTodo = await axios.post(`${import.meta.env.VITE_SERVER_URL}/todo`, {
                description: description,
            });
        } catch(err) {
            console.log("There has been a error creating a post")
        }
    }

  return (
    <div>
        <h1 className='py-10'>Todo List</h1>
        <form className='flex justify-center'>
            <input type="text" onChange={(e) => setDescription(e.target.value)} className='text-black sm:h-[40px] h-[30px] w-[250px] sm:w-[500px] mr-4 sm:mr-6 p-2 text-2xl outline-none shadow-[lg]'/>
            <button type='submit' onClick={handleCreateTodo}><GrAdd className="sm:h-[35px] h-[25px]"/></button>        
        </form>
    </div>
  )
}
