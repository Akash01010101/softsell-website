// OpenAI API integration for the chat widget

// This is a simple wrapper for the OpenAI API
// In a production environment, you would want to handle API keys securely
// and implement proper error handling and rate limiting

// Note: You need to add your own OpenAI API key to use this
// For demo purposes, we'll provide a fallback to mock responses if no API key is available

import { mockResponses } from "@/components/chat-widget";

// OpenAI API endpoint
const API_URL = "https://api.openai.com/v1/chat/completions";

// You would typically store this in an environment variable
// For demo purposes, you can replace this with your API key
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";

// Check if we have an API key
const hasApiKey = OPENAI_API_KEY.length > 0;

// Define the system prompt for the assistant
const SYSTEM_PROMPT = `
You are an AI assistant for SoftSell, a company that helps businesses sell their unused software licenses.
Your name is SoftSell Assistant.

About SoftSell:
- SoftSell helps businesses recover value from unused or excess software licenses
- The process: Upload license details → Get valuation within 24 hours → Accept offer → Get paid within 3 business days
- SoftSell accepts most major software licenses including Microsoft, Adobe, Oracle, SAP, Autodesk, and more
- Security is a top priority with bank-level encryption for all transactions
- All transactions are fully compliant with software licensing agreements
- Payment methods include direct bank transfer, PayPal, and cryptocurrency

Keep your responses concise, friendly, and helpful. If you don't know the answer to a specific question, suggest that the user contact the support team for more detailed information.
`;

// Interface for the chat message
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// Function to generate a response using the OpenAI API
export async function generateAIResponse(userMessage: string): Promise<string> {
  // If we don't have an API key, use mock responses
  if (!hasApiKey) {
    return generateMockResponse(userMessage);
  }

  try {
    // Prepare the messages for the API
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ];

    // Make the API request
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // You can use gpt-4 for better responses if available
        messages,
        max_tokens: 300, // Limit response length
        temperature: 0.7, // Control randomness (0-1)
      }),
    });

    // Parse the response
    const data = await response.json();

    // Check if we have a valid response
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      // Fallback to mock response if API fails
      console.error("OpenAI API error:", data);
      return generateMockResponse(userMessage);
    }
  } catch (error) {
    // Fallback to mock response if API fails
    console.error("Error calling OpenAI API:", error);
    return generateMockResponse(userMessage);
  }
}

// Function to generate a mock response based on keywords
function generateMockResponse(message: string): string {
  // Convert to lowercase for matching
  const lowerMessage = message.toLowerCase();
  
  // Check for keyword matches
  for (const [keyword, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Default response if no keywords match
  return "Thank you for your question. Our team is here to help you sell your unused software licenses quickly and securely. Is there something specific about our process you'd like to know?";
}