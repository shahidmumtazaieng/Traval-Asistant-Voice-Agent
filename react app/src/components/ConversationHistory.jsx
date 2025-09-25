import { useState } from 'react'

const ConversationHistory = ({ conversations, onConversationSelect, onDeleteConversation }) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conv => 
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  }

  // Get conversation preview text
  const getPreviewText = (messages) => {
    if (messages.length === 0) return 'Empty conversation'
    const lastMessage = messages[messages.length - 1]
    return lastMessage.content.length > 30 
      ? lastMessage.content.substring(0, 30) + '...' 
      : lastMessage.content
  }

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-8 text-sm border border-gray-300 rounded-lg"
        />
        <div className="absolute left-2 top-2.5 text-gray-400 text-sm">
          🔍
        </div>
      </div>

      {/* Conversation List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            {searchTerm ? 'No matching conversations found' : 'No conversation history yet'}
          </div>
        ) : (
          filteredConversations.map(conv => (
            <div 
              key={conv.id}
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer text-sm"
              onClick={() => onConversationSelect(conv)}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800 truncate text-sm">{conv.title}</h4>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteConversation(conv.id)
                  }}
                  className="text-gray-400 hover:text-red-500 text-xs"
                >
                  🗑️
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1 truncate">
                {getPreviewText(conv.messages)}
              </p>
              <div className="text-xs text-gray-400 mt-2">
                {formatDate(conv.timestamp)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Clear All Button */}
      {conversations.length > 0 && (
        <div className="pt-3 border-t border-gray-200">
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all conversations?')) {
                // In a real app, this would call a function to clear all conversations
                console.log('Clear all conversations requested')
              }
            }}
            className="w-full py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 text-sm"
          >
            Clear All Conversations
          </button>
        </div>
      )}
    </div>
  )
}

export default ConversationHistory