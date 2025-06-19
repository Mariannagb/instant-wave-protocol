
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Como está funcionando o sistema?',
      sender: 'contact',
      timestamp: new Date(Date.now() - 300000),
      status: 'read'
    },
    {
      id: '2',
      text: 'O sistema está operando perfeitamente! Latência < 50ms',
      sender: 'user',
      timestamp: new Date(Date.now() - 240000),
      status: 'delivered'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent'
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simular resposta automática
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const responses = [
            'Mensagem recebida com sucesso!',
            'Sistema funcionando perfeitamente',
            'Infraestrutura escalando automaticamente',
            'Todos os serviços operacionais'
          ];
          
          const autoReply: Message = {
            id: (Date.now() + 1).toString(),
            text: responses[Math.floor(Math.random() * responses.length)],
            sender: 'contact',
            timestamp: new Date(),
            status: 'read'
          };
          
          setMessages(prev => [...prev, autoReply]);
          setIsTyping(false);
        }, 2000);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col">
        {/* Header do Chat */}
        <CardHeader className="bg-green-600 text-white p-4 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-green-500">SY</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Sistema de Mensagens</h3>
              <p className="text-sm text-green-100">
                Online • Latência: 45ms
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        {/* Área de Mensagens */}
        <CardContent className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {message.sender === 'user' && (
                      <div className="flex">
                        <div className={`w-2 h-2 ${
                          message.status === 'sent' ? 'text-gray-300' :
                          message.status === 'delivered' ? 'text-gray-400' : 'text-blue-400'
                        }`}>✓</div>
                        {message.status !== 'sent' && (
                          <div className={`w-2 h-2 ${
                            message.status === 'read' ? 'text-blue-400' : 'text-gray-400'
                          }`}>✓</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {/* Input de Mensagem */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-5 w-5 text-gray-500" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite uma mensagem..."
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Smile className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
