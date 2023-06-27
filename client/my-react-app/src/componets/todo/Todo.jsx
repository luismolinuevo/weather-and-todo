import React from 'react'
import TodoInput from './TodoInput'
import TodoFilter from './TodoFilter'

//Contains all todo components
export default function Todo() {
  return (
    <div>
        <TodoInput/>
        <TodoFilter/>
    </div>
  )
}
