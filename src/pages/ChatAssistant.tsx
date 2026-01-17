import React, { useState, useRef, useEffect } from "react";
import { IonIcon, IonSpinner } from "@ionic/react";
import {
  send,
  sparkles,
  alertCircleOutline,
  personCircleOutline,
  hardwareChipOutline,
} from "ionicons/icons";
// import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: "ai" | "user";
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "How do I communicate with someone with dementia?",
  "Managing agitation in the evening",
  "Safety tips for home care",
];

const ChatAssistant: React.FC = () => {
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     id: '1',
  //     text: "Hello! I'm your dementia care assistant. I'm here to help answer your questions about dementia care, communication strategies, and support resources. How can I help you today?",
  //     sender: 'ai',
  //     timestamp: new Date()
  //   }
  // ]);
  // const [inputText, setInputText] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const scrollRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [messages]);

  // const handleSend = async (text?: string) => {
  //   const messageToSend = text || inputText;
  //   if (!messageToSend.trim()) return;

  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     text: messageToSend,
  //     sender: 'user',
  //     timestamp: new Date()
  //   };

  //   setMessages(prev => [...prev, userMessage]);
  //   setInputText('');
  //   setIsLoading(true);

  //   try {
  //     const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  //     const response = await ai.models.generateContent({
  //       model: 'gemini-3-flash-preview',
  //       contents: messageToSend,
  //       config: {
  //         systemInstruction: "You are a professional and compassionate assistant for dementia family carers. Provide practical, empathetic, and expert advice on dementia care, communication strategies, behavioral management, and carer self-care. Always include a small disclaimer that you are an AI and they should consult professionals for medical emergencies."
  //       }
  //     });

  //     const aiMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       text: response.text || "I'm sorry, I couldn't generate a response. Please try again.",
  //       sender: 'ai',
  //       timestamp: new Date()
  //     };
  //     setMessages(prev => [...prev, aiMessage]);
  //   } catch (error) {
  //     console.error(error);
  //     const errorMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       text: "I'm having trouble connecting right now. Please check your connection and try again.",
  //       sender: 'ai',
  //       timestamp: new Date()
  //     };
  //     setMessages(prev => [...prev, errorMessage]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div></div>
    // <div className="flex flex-col h-full min-h-[70vh]">
    //   {/* Bot Header */}
    //   <div className="bg-[#00c853] p-4 text-white flex items-center shadow-md">
    //     <div className="bg-white/20 p-2 rounded-xl mr-3">
    //       <IonIcon icon={hardwareChipOutline} className="text-white text-xl" />
    //     </div>
    //     <div>
    //       <h2 className="font-bold">Care Assistant</h2>
    //       <div className="flex items-center text-[10px] opacity-80">
    //         <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
    //         Online
    //       </div>
    //     </div>
    //   </div>

    //   {/* Message List */}
    //   <div className="flex-1 p-4 space-y-4">
    //     {messages.map((msg) => (
    //       <div
    //         key={msg.id}
    //         className={`flex ${
    //           msg.sender === "user" ? "justify-end" : "justify-start"
    //         }`}
    //       >
    //         <div
    //           className={`flex max-w-[85%] ${
    //             msg.sender === "user" ? "flex-row-reverse" : "flex-row"
    //           }`}
    //         >
    //           <div
    //             className={`mt-1 flex-shrink-0 ${
    //               msg.sender === "user" ? "ml-2" : "mr-2"
    //             }`}
    //           >
    //             <IonIcon
    //               icon={
    //                 msg.sender === "user"
    //                   ? personCircleOutline
    //                   : hardwareChipOutline
    //               }
    //               className={`text-2xl ${
    //                 msg.sender === "user" ? "text-blue-500" : "text-green-500"
    //               }`}
    //             />
    //           </div>
    //           <div
    //             className={`p-4 rounded-2xl shadow-sm border text-sm leading-relaxed ${
    //               msg.sender === "user"
    //                 ? "bg-blue-600 text-white border-blue-500 rounded-tr-none"
    //                 : "bg-white text-gray-800 border-gray-100 rounded-tl-none"
    //             }`}
    //           >
    //             {msg.text}
    //             <div
    //               className={`text-[9px] mt-2 font-medium ${
    //                 msg.sender === "user"
    //                   ? "text-blue-100 text-right"
    //                   : "text-gray-400"
    //               }`}
    //             >
    //               {msg.timestamp.toLocaleTimeString([], {
    //                 hour: "2-digit",
    //                 minute: "2-digit",
    //               })}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //     {isLoading && (
    //       <div className="flex justify-start">
    //         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
    //           <IonSpinner name="dots" color="primary" />
    //         </div>
    //       </div>
    //     )}
    //     <div ref={scrollRef} />
    //   </div>

    //   {/* Suggested Questions */}
    //   <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
    //     <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">
    //       <IonIcon icon={sparkles} className="mr-1" />
    //       Suggested questions:
    //     </div>
    //     <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
    //       {SUGGESTED_QUESTIONS.map((q) => (
    //         <button
    //           key={q}
    //           onClick={() => handleSend(q)}
    //           className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 whitespace-nowrap active:bg-gray-100 transition-colors"
    //         >
    //           {q}
    //         </button>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Input Area */}
    //   <div className="p-4 bg-white border-t border-gray-100">
    //     <div className="flex items-center space-x-3">
    //       <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-1">
    //         <input
    //           type="text"
    //           placeholder="Type your question..."
    //           className="bg-transparent border-none w-full text-sm py-2 focus:outline-none text-gray-700"
    //           value={inputText}
    //           onChange={(e) => setInputText(e.target.value)}
    //           onKeyPress={(e) => e.key === "Enter" && handleSend()}
    //         />
    //       </div>
    //       <button
    //         onClick={() => handleSend()}
    //         disabled={isLoading || !inputText.trim()}
    //         className="bg-blue-600 text-white p-3 rounded-full shadow-lg shadow-blue-100 disabled:opacity-50 active:scale-90 transition-transform"
    //       >
    //         <IonIcon icon={send} className="text-xl" />
    //       </button>
    //     </div>
    //     <div className="mt-3 flex items-start text-center justify-center">
    //       <IonIcon
    //         icon={alertCircleOutline}
    //         className="text-gray-400 mr-1.5 text-xs"
    //       />
    //       <p className="text-[10px] text-gray-400 leading-tight max-w-[80%]">
    //         This is a simulated assistant. For medical emergencies, contact your
    //         healthcare provider.
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ChatAssistant;
