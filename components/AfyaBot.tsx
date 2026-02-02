
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const AfyaBot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Bonjour ! Je suis AfyaBot, votre assistant de santé maternelle. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `Tu es AfyaBot, un assistant virtuel spécialisé en santé maternelle pour le projet MaternalCare+ en RDC (Nord-Kivu). 
          Tes réponses doivent être :
          1. Empathiques et rassurantes.
          2. Précises médicalement mais simples à comprendre.
          3. Adaptées au contexte local (RDC).
          4. Toujours recommander une consultation au Centre de Santé en cas de signe de danger (saignements, forte fièvre, maux de tête violents, absence de mouvement foetal).
          5. Utilise le vouvoiement.`,
        }
      });

      const botText = response.text || "Désolé, je rencontre une difficulté technique. Veuillez réessayer.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "Erreur de connexion avec l'IA. Assurez-vous d'avoir une connexion internet." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-[#2d6a4f] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold">AfyaBot AI</h3>
            <p className="text-[10px] text-teal-100 uppercase tracking-wider">Santé Maternelle Intelligente</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs bg-black/20 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          En ligne
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user' ? 'bg-[#2d6a4f] text-white' : 'bg-white text-teal-600 border'}`}>
                {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#2d6a4f] text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'}`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center text-teal-600 shadow-sm">
                <Bot size={20} />
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-[#2d6a4f]" />
                <span className="text-xs text-gray-500 font-medium italic">AfyaBot réfléchit...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-4 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent transition-all"
            placeholder="Posez votre question sur la grossesse ou le nouveau-né..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1b4332] transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          AfyaBot est un assistant IA. Consultez toujours un professionnel de santé pour les diagnostics médicaux.
        </p>
      </div>
    </div>
  );
};

export default AfyaBot;
