"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { generateAIResponse } from "@/lib/openai"

// Mock AI responses based on keywords
export const mockResponses: Record<string, string> = {
  "sell": "To sell your software license, simply click the 'Sell My Licenses' button at the top of our homepage and follow the guided process. You'll need to provide details about your license, and our team will get back to you with a valuation within 24 hours.",
  "license": "We accept most major software licenses including Microsoft, Adobe, Oracle, SAP, Autodesk, and many more. If you're unsure if your license qualifies, please contact our support team.",
  "payment": "We offer multiple payment methods including direct bank transfer, PayPal, and cryptocurrency. Once you accept our offer, payment is typically processed within 3 business days.",
  "process": "Our process is simple: 1) Submit your license details, 2) Receive a valuation within 24 hours, 3) Accept our offer, 4) Complete the secure transfer, 5) Receive payment within 3 business days.",
  "secure": "Security is our top priority. We use bank-level encryption for all transactions and comply with all relevant data protection regulations. Your information is always safe with us.",
  "value": "We determine the value of your license based on current market demand, remaining subscription time, and license type. Our extensive network of buyers ensures you get the maximum value for your unused licenses.",
  "compliance": "All transactions through SoftSell are fully compliant with software licensing agreements. Our legal team ensures all transfers adhere to relevant regulations and vendor policies.",
  "time": "From submission to payment, our process typically takes less than a week, which is significantly faster than the industry average of 30+ days.",
}

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768; // Open by default on desktop (md breakpoint)
    }
    return false;
  });
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Example questions
  const exampleQuestions = [
    "How do I sell my license?",
    "What types of licenses do you accept?",
    "How long does the process take?",
    "How do you determine the value of my license?",
    "How secure is the transaction?",
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Generate a response using the OpenAI API with fallback to mock responses
  const generateResponse = async (message: string): Promise<string> => {
    try {
      return await generateAIResponse(message)
    } catch (error) {
      console.error("Error generating AI response:", error)
      // Fallback to default response
      return "Thank you for your question. Our team is here to help you sell your unused software licenses quickly and securely. Is there something specific about our process you'd like to know?"
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    // Store the current input value
    const currentInput = input

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      sender: "user",
      timestamp: new Date(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Get AI response with a slight delay to simulate thinking
      setTimeout(async () => {
        const response = await generateResponse(currentInput)
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: "ai",
          timestamp: new Date(),
        }
        
        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
    } catch (error) {
      console.error("Error in handleSend:", error)
      
      // Add fallback message if there's an error
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm having trouble connecting right now. Please try again or contact our support team for immediate assistance.",
          sender: "ai",
          timestamp: new Date(),
        }
        
        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleExampleClick = (question: string) => {
    setInput(question)
    // Focus the input after setting the example question
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mb-4"
          >
            <Card className="w-[350px] md:w-[400px] shadow-lg border-primary/10">
              <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Bot size={20} />
                  <h3 className="font-semibold">SoftSell Assistant</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X size={18} />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[350px] overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Hi there! I'm your SoftSell assistant. How can I help you today?
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">You can ask me about:</p>
                        <div className="grid gap-2">
                          {exampleQuestions.map((question) => (
                            <Button
                              key={question}
                              variant="outline"
                              size="sm"
                              className="justify-start h-auto py-2 px-3 text-sm font-normal"
                              onClick={() => handleExampleClick(question)}
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="min-h-[40px] resize-none"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="h-10 w-10 rounded-full"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg"
            >
              {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isOpen ? "Close chat" : "Open chat"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}