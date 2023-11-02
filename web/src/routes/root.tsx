import React from 'react'

export const Root = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Navbar */}
      <nav className="bg-primary p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My App</h1>
          <div>
            <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">Button 1</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Button 2</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Your main content goes here */}
        <p>This is your main content area.</p>
      </div>
    </div>
  )
}
