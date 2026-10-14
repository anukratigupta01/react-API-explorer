
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const projectName = "My First API Explorer"

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [error, setError] = useState('')

  // Fetch users from API
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          'https://dummyjson.com/users?limit=30'
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setUsers(data.users)
      } catch (error) {
        setError('Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Filter users by name or email
  const filteredUsers = users.filter((user) => {
    const fullName =
      `${user.firstName} ${user.lastName}`.toLowerCase()

    const searchText = search.toLowerCase()

    return (
      fullName.includes(searchText) ||
      user.email.toLowerCase().includes(searchText)
    )
  })

  return (
    <div className="app-container">
      <h1>{projectName}</h1>

      {/* Search bar and Clear button */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            className="clear-button"
            onClick={() => setSearch('')}
          >
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      {!loading && !error && (
        <p className="status-message">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      )}

      {/* Loading, error and users list */}
      {loading ? (
        <p className="status-message">Loading users...</p>
      ) : error ? (
        <p className="status-message">{error}</p>
      ) : filteredUsers.length === 0 ? (
        <p className="status-message">No users found</p>
      ) : (
        <div className="users-list">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="user-card"
              onClick={() => setSelectedUser(user)}
            >
              <h3>
                {user.firstName} {user.lastName}
              </h3>

              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )}

      {/* Selected user details */}
      {selectedUser && (
        <div className="user-details">
          <h2>User Details</h2>

          <button
            className="close-button"
            onClick={() => setSelectedUser(null)}
          >
            Close Details
          </button>

          <img
            className="user-avatar"
            src={selectedUser.image}
            alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
          />

          <h3>
            {selectedUser.firstName} {selectedUser.lastName}
          </h3>

          <p>Email: {selectedUser.email}</p>
          <p>Age: {selectedUser.age}</p>
          <p>Phone: {selectedUser.phone}</p>
          <p>Address: {selectedUser.address.address}</p>
          <p>City: {selectedUser.address.city}</p>
          <p>Company: {selectedUser.company.name}</p>
        </div>
      )}
    </div>
  )
}

export default App
