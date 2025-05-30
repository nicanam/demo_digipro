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
    <div className="min-h-screen bg-gray-200 relative">
      {/* Header with top_bar.png image */}
      <header className="w-full">
        <Image 
          src="/top_bar.png" 
          alt="National Auto Loan Network Header" 
          width={1920} 
          height={200}
          className="w-full h-auto"
          priority
        />
      </header>

      {/* Personal ID Section */}
      <div className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Already have a personal ID?</h2>
          <div className="flex justify-center items-center space-x-4">
            <input 
              type="text" 
              placeholder="Enter your personal ID" 
              className="px-4 py-2 rounded text-gray-800 bg-white w-80 border-2 border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium">
              GET STARTED
            </button>
          </div>
          <p className="text-sm text-gray-300 mt-4">
            By clicking 'Get Started' you expressly request and agree that we may contact you by phone or text message
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-8">
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Over $2 Billion in auto loans refinanced for over 100,000 
            satisfied customers since 2010
          </h2>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Recent Refinances */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Refinances with NALN</h3>
              <div className="relative">
                <Image 
                  src="/left_image.png" 
                  alt="Map showing recent refinances across the United States" 
                  width={600} 
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Right Panel - How NALN Process Works */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">How the NALN Process Works</h3>
              <div className="relative">
                <Image 
                  src="/right_image.png" 
                  alt="Illustration showing the NALN refinancing process" 
                  width={600} 
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Start Simulation Button */}
        <div className="container mx-auto px-4 mt-8 text-center">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Start Simulation clicked");
              openAnamChat();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg transition-all duration-200"
          >
            START SIMULATION
          </button>
        </div>
      </div>

      {/* Chat with Mia Button - Bottom Right - Now 300px with always visible pulsing text */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col items-center">
          {/* Always visible pulsating text */}
          <div className="mb-4 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pulsating">
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
            className="w-[300px] h-[300px] rounded-full overflow-hidden border-8 border-white shadow-2xl pulsating hover:scale-105 transition-transform duration-200 cursor-pointer"
            type="button"
          >
            <Image 
              src="/mia.png" 
              alt="Chat with Mia - AI Assistant" 
              width={300} 
              height={300}
              className="w-full h-full object-cover pointer-events-none"
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