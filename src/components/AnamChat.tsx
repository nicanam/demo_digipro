"use client";
import { AnamClient, createClient } from "@anam-ai/js-sdk";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface AnamChatProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AnamChat: React.FC<AnamChatProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [anamClient, setAnamClient] = useState<AnamClient | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // The provided Persona ID for Mia
  const PERSONA_ID = "8d5735c3-6e92-4035-8005-04d5beb14101";

  // Handle timer interval
  useEffect(() => {
    if (isChatActive) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isChatActive]);

  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const closeChat = () => {
    if (anamClient) {
      anamClient.stopStreaming();
      setAnamClient(null);
    }
    setIsChatActive(false);
    setElapsedTime(0);
    if (onClose) onClose();
  };

  const initAnamClient = async () => {
    try {
      setIsLoadingAI(true);
      // Fetch session token from our API
      const response = await fetch(`/api/anam-auth/${PERSONA_ID}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get Anam session token");
      }

      const { sessionToken } = await response.json();

      // Create Anam client with session token
      const client = createClient(sessionToken);
      setAnamClient(client);

      return client;
    } catch (err: unknown) {
      console.error("Error initializing Anam client:", err);
      setError(
        err instanceof Error ? err.message : "Failed to initialize AI Persona"
      );
      return null;
    } finally {
      setIsLoadingAI(false);
    }
  };

  const startChat = async () => {
    try {
      setIsLoadingAI(true);
      setElapsedTime(0);

      // Initialize Anam client if not already done
      const client = await initAnamClient();

      if (!client) {
        throw new Error("Failed to initialize AI Persona");
      }

      // Use element IDs instead of direct references
      await client.streamToVideoAndAudioElements(
        "anam-video-feed",
        "anam-audio-feed"
      );

      setIsChatActive(true);
    } catch (err: unknown) {
      console.error("Error starting AI chat:", err);
      setError(
        err instanceof Error ? err.message : "Failed to start AI Persona"
      );
      setIsChatActive(false);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const stopChat = () => {
    if (anamClient) {
      anamClient.stopStreaming();
    }
    setIsChatActive(false);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (anamClient) {
        anamClient.stopStreaming();
      }
    };
  }, [anamClient]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
            <Image
              src="/mia.png"
              alt="Mia"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Chat with Mia</h3>
            <p className="text-xs text-gray-600">AI Assistant</p>
          </div>
        </div>
        
        {/* Close button */}
        <button
          onClick={closeChat}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Chat Status Bar */}
      <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full ${
              isChatActive
                ? "bg-green-500 animate-pulse"
                : "bg-gray-400"
            } mr-2`}
          ></div>
          <span className="text-xs text-gray-700 font-medium">
            {isChatActive ? "Live Chat" : "Ready"}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">{formatTime(elapsedTime)}</span>
        </div>
      </div>

      {/* Video Chat Area */}
      <div className="flex-grow bg-gray-900 relative h-[400px]">
        {(isLoadingAI || error || !isChatActive) && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/60">
            {isLoadingAI && (
              <div className="text-white text-sm flex flex-col items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-6 w-6 text-white mb-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Connecting with Mia...</span>
              </div>
            )}
            {error && (
              <div className="text-red-400 text-sm text-center p-4">
                <div className="mb-2">⚠️ Connection Error</div>
                <div className="text-xs mb-3">{error}</div>
                <button
                  onClick={() => setError(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                >
                  Try Again
                </button>
              </div>
            )}
            {!isLoadingAI && !error && !isChatActive && (
              <div className="text-white text-sm flex flex-col items-center p-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/mia.png"
                    alt="Mia - AI Assistant"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center mb-4 text-xs">
                  Hi! I'm Mia, your AI assistant for mortgage guidance.
                  Ready to help with your mortgage questions!
                </p>
                <button
                  onClick={startChat}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-medium flex items-center"
                >
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Start Chat
                </button>
              </div>
            )}
          </div>
        )}
        
        <video
          ref={videoRef}
          id="anam-video-feed"
          className="w-full h-full object-cover"
          autoPlay
          playsInline
        ></video>
        <audio ref={audioRef} id="anam-audio-feed"></audio>
      </div>

      {/* Chat Controls */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex justify-center space-x-2">
          {!isChatActive ? (
            <button
              onClick={startChat}
              disabled={isLoadingAI}
              className={`px-4 py-2 text-xs ${
                isLoadingAI
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded shadow-md transition-all flex items-center font-medium`}
            >
              {isLoadingAI ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Start Chat with Mia
                </>
              )}
            </button>
          ) : (
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </button>
              <button
                onClick={stopChat}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm5 12a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        <div className="text-center mt-2">
          <p className="text-xs text-gray-600">
            Ask Mia about mortgage rates and guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnamChat; 