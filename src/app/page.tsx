"use client";
import AnamChat from "@/components/AnamChat";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isAnamChatOpen, setIsAnamChatOpen] = useState(false);

  const openAnamChat = () => {
    console.log("Opening Anam chat...");
    setIsAnamChatOpen(true);
  };
  
  const closeAnamChat = () => {
    console.log("Closing Anam chat...");
    setIsAnamChatOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/image.png" 
          alt="Mortgage Example Background" 
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Chat with Mia Button - Bottom Right - Circular Avatar */}
      <div className="fixed bottom-6 right-6 z-40" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 40 }}>
        <div className="flex flex-col items-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Pulsating text */}
          <div className="mb-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pulsating" 
               style={{ marginBottom: '16px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            Chat with Mia
          </div>
          
          {/* Pulsating Mia avatar - 300px */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Mia avatar clicked");
              openAnamChat();
            }}
            className="relative w-[300px] h-[300px] rounded-full border-8 border-white shadow-2xl pulsating hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden bg-white"
            style={{ 
              position: 'relative',
              width: '300px', 
              height: '300px', 
              borderRadius: '50%', 
              border: '8px solid white', 
              cursor: 'pointer', 
              overflow: 'hidden', 
              backgroundColor: 'white',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            type="button"
          >
            <img 
              src="/mia.png" 
              alt="Chat with Mia - AI Assistant" 
              className="w-full h-full object-cover rounded-full"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '50%',
                display: 'block' 
              }}
            />
          </button>
        </div>
      </div>

      {/* Anam Chat Widget - Bottom Right Corner */}
      {isAnamChatOpen && (
        <AnamChat
          isOpen={isAnamChatOpen}
          onClose={closeAnamChat}
        />
      )}
    </div>
  );
} 