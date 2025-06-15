"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MessageCircle, User, Clock, CheckCircle, AlertCircle } from "lucide-react"

const mockChatLogs = [
  {
    id: "1",
    user: "John Doe",
    email: "john@example.com",
    status: "active",
    lastMessage: "I need help with my order",
    timestamp: "2024-01-15 10:30 AM",
    messages: [
      { sender: "user", message: "Hello, I need help with my order", time: "10:25 AM" },
      {
        sender: "bot",
        message: "Hi! I'd be happy to help you with your order. Can you provide your order number?",
        time: "10:25 AM",
      },
      { sender: "user", message: "My order number is ORD-001", time: "10:26 AM" },
      {
        sender: "bot",
        message: "I found your order. It's currently being processed and will ship within 2 business days.",
        time: "10:26 AM",
      },
      { sender: "user", message: "I need help with my order", time: "10:30 AM" },
    ],
  },
  {
    id: "2",
    user: "Jane Smith",
    email: "jane@example.com",
    status: "resolved",
    lastMessage: "Thank you for the help!",
    timestamp: "2024-01-15 09:15 AM",
    messages: [
      { sender: "user", message: "Do you have organic apples?", time: "09:10 AM" },
      {
        sender: "bot",
        message: "Yes! We have fresh organic apples available. Would you like me to show you our selection?",
        time: "09:10 AM",
      },
      { sender: "user", message: "Yes please", time: "09:12 AM" },
      {
        sender: "bot",
        message: "Here are our organic apple varieties: Gala, Fuji, and Granny Smith. All are certified organic.",
        time: "09:12 AM",
      },
      { sender: "user", message: "Thank you for the help!", time: "09:15 AM" },
    ],
  },
  {
    id: "3",
    user: "Bob Johnson",
    email: "bob@example.com",
    status: "pending",
    lastMessage: "Is my payment processed?",
    timestamp: "2024-01-15 08:45 AM",
    messages: [
      { sender: "user", message: "Is my payment processed?", time: "08:45 AM" },
      {
        sender: "bot",
        message: "Let me check your payment status. Can you provide your order number?",
        time: "08:45 AM",
      },
    ],
  },
]

export function ChatManagement() {
  const [selectedChat, setSelectedChat] = useState(mockChatLogs[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredChats = mockChatLogs.filter((chat) => {
    const matchesSearch =
      chat.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || chat.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <MessageCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Chat Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64"
            />
          </div>
        </div>
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="all">All Chats</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Conversations ({filteredChats.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
                        selectedChat.id === chat.id ? "bg-blue-50 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{chat.user}</h4>
                            <p className="text-xs text-gray-600">{chat.email}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(chat.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(chat.status)}
                            <span>{chat.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 truncate">{chat.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{chat.timestamp}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Messages */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedChat.user}</h3>
                      <p className="text-sm text-gray-600">{selectedChat.email}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(selectedChat.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedChat.status)}
                      <span>{selectedChat.status}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                  {selectedChat.messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedChat.status === "active" && (
                  <div className="flex space-x-2">
                    <Input placeholder="Type a response..." className="flex-1" />
                    <Button className="bg-green-600 hover:bg-green-700">Send</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
