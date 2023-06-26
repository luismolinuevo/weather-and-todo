import React, {useState} from 'react'
import axios from "axios";
import {GrAdd} from "react-icons/gr"

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
        {/* <form action={handleCreateTodo}> */}
            <input type="text" onChange={(e) => setDescription(e.target.value)} className='text-black'/>
            <button type='submit' onClick={handleCreateTodo}><GrAdd/></button>
        {/* </form> */}
    </div>
  )
}
