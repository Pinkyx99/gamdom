import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

interface ChatRailProps {
  session: Session | null;
  onClose?: () => void;
  onUserClick: (user: { id: string; username: string }) => void;
}

export const ChatRail: React.FC<ChatRailProps> = ({ session, onClose, onUserClick }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('chat_messages_with_profiles')
            .select('*')
            .order('created_at', { ascending: true })
            .limit(50);
        
        if (error) {
            console.error('Error fetching chat messages:', error);
        } else {
            const formattedMessages = data.map(msg => ({
                id: msg.id,
                user_id: msg.user_id,
                message: msg.message,
                created_at: msg.created_at,
                profiles: {
                    username: msg.username,
                    avatar_url: msg.avatar_url,
                }
            }));
            setMessages(formattedMessages);
        }
    };
    fetchMessages();

    const channel = supabase
        .channel('chat-room-v2')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages_with_profiles' }, 
        (payload) => {
             const newMessage = payload.new;
             const formattedMessage: ChatMessage = {
                id: newMessage.id,
                user_id: newMessage.user_id,
                message: newMessage.message,
                created_at: newMessage.created_at,
                profiles: {
                    username: newMessage.username,
                    avatar_url: newMessage.avatar_url,
                }
             };
             setMessages(prev => [...prev, formattedMessage]);
        })
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && session?.user) {
        const messageToSend = input.trim();
        setInput('');

        const { error } = await supabase
            .from('chat_messages')
            .insert({ message: messageToSend, user_id: session.user.id });

        if (error) {
            console.error('Error sending message:', error);
            setInput(messageToSend);
        }
    }
  };

  const getUserColor = (username: string) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = ['text-blue-400', 'text-green-400', 'text-yellow-400', 'text-red-400', 'text-purple-400', 'text-pink-400'];
    return colors[Math.abs(hash % colors.length)];
  };

  return (
    <div className="h-full bg-card-bg/95 backdrop-blur-xl flex flex-col border-l border-outline">
        <div className="flex items-center justify-between p-4 border-b border-outline flex-shrink-0 h-16 mt-8">
            <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-green"></span>
                </span>
                <span className="font-semibold">Live Chat</span>
            </div>
             {onClose && (
                <button onClick={onClose} className="p-2 text-text-muted hover:text-white" aria-label="Close chat">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            )}
        </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-3 animate-fade-in-up">
            <button
              onClick={() => onUserClick({ id: msg.user_id, username: msg.profiles.username })}
              aria-label={`Tip user ${msg.profiles.username}`}
            >
              <img src={msg.profiles.avatar_url} alt={`${msg.profiles.username}'s avatar`} className="w-8 h-8 rounded-full flex-shrink-0" />
            </button>
            <div className="flex-1">
              <button 
                onClick={() => onUserClick({ id: msg.user_id, username: msg.profiles.username })}
                aria-label={`Tip user ${msg.profiles.username}`}
                className={`font-semibold text-sm text-left ${getUserColor(msg.profiles.username)} hover:underline`}
              >
                {msg.profiles.username}
              </button>
              <p className="text-sm text-text-muted break-words">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-outline flex-shrink-0">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={session ? "Start typing..." : "Sign in to chat"}
            disabled={!session}
            className="w-full bg-background border border-outline rounded-lg py-2 pl-4 pr-20 text-sm focus:ring-1 focus:ring-accent-green focus:outline-none disabled:cursor-not-allowed"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button type="button" className="p-2 text-text-muted hover:text-white" aria-label="Add emoji" disabled={!session}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <button type="submit" className="p-2 text-text-muted hover:text-accent-green" aria-label="Send message" disabled={!session}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </form>
      </div>
       <style>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.2s ease-out;
          }
        `}</style>
    </div>
  );
};