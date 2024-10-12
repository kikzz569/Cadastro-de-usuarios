import { useEffect, useState, useRef } from 'react'
import './styles.css'
import Trash from '../../assets/16qg.svg'
import api from '../../Services/api'

function App() {

  const [users, setUsers] = useState([])

  const inputName= useRef()
  const inputAge= useRef()
  const inputEmail= useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
  }
  useEffect(() => {
  getUsers()
  }, [])

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)

    getUsers()
  }

  return (
      <div className='container'>
        <form>
          <h1>Cadastro de Usuário</h1>
          <input placeholder='Nome' name='Nome' type='text' ref={inputName}/>
          <input placeholder='Idade' name='Idade' type='number' ref={inputAge}/>
          <input placeholder='Email' name='Email' type='email' ref={inputEmail}/>
          <button type="button" onClick={createUsers}>Cadastrar</button>
        </form>

      {users.map(user => (
        <div key={user.id} className='card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>Email: <span>{user.email}</span></p>
        </div>
        <button className='btn' onClick={() => deleteUsers(user.id)}>
          <img src={Trash}/>
        </button>
      </div>
      ))}
    </div>

  )
}

export default App
