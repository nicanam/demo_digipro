"use client";
import { AnamClient, createClient } from "@anam-ai/js-sdk";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// Import the Prospect interface from a shared location
interface Prospect {
  id: number;
  name: string;
  title: string;
  company: string;
  department: string;
  image: string;
  personaId: string;
}

interface CallPreviewProps {
  isOpen?: boolean;
  onClose?: () => void;
  prospect?: Prospect;
}

const CallPreview: React.FC<CallPreviewProps> = ({
  isOpen = false,
  onClose,
  prospect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [isChatActive, setIsChatActive] = useState(false);
  const [anamClient, setAnamClient] = useState<AnamClient | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Add timer state
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update internal state when prop changes
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  // Handle timer interval
  useEffect(() => {
    if (isChatActive) {
      // Start the timer when chat is active
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      // Clear the timer when chat is inactive
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    // Cleanup interval on unmount
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (anamClient) {
      anamClient.stopStreaming();
      setAnamClient(null);
    }
    setIsChatActive(false);
    setIsModalOpen(false);
    setElapsedTime(0); // Reset timer when closing
    if (onClose) onClose();
  };

  const initAnamClient = async () => {
    try {
      setIsLoadingAI(true);
      // Fetch session token from your API
      const response = await fetch("/api/anam-auth/" + prospect?.personaId);

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
      setElapsedTime(0); // Reset timer when starting chat

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

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col">
      {/* Header with Nooks logo */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="Nooks logo" width={120} height={40} />
          </div>
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 ml-4"
            >
              <svg
                className="w-6 h-6"
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
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center py-4 px-4">
        <div className="mb-4">
          <svg viewBox="0 0 128 128" fill="none" className="w-20 h-20">
            <g clipPath="url(#processing_complex_svg__a)">
              <path
                d="M109.864 24.937c-5.504-13.768-25.44-15.736-39.36-12A85.65 85.65 0 0 0 40.184 28.4c-10.504 8.296-18.872 20.496-23.64 34.448-2.832 8.32-4.208 18.528.24 25.6a18.216 18.216 0 0 0 8.8 6.984c10.192 4.152 21.064 3.4 31.44-.552 16.76-6.4 35.288-18.944 46.344-35.488 4.808-7.184 10.824-23.608 6.496-34.456Z"
                fill="#F5EDFF"
              ></path>
              <path
                d="M46 43.695c.272-.248.408-.864.112-1.064-3.36-2.264-3.44-7.448-2.528-10.52a18.527 18.527 0 0 0-.168-11.592c-1.336-3.544-4.432-5.832-8.288-5.424a7.672 7.672 0 0 0-6.704 6.064 8.377 8.377 0 0 0 .632 5.24c.319.672.74 1.29 1.248 1.832a6.056 6.056 0 0 0-3.392.08 6.744 6.744 0 0 0-4.512 7.144c.424 3.2 2.992 5.544 5.984 6.48 3.2.984 6.736.664 10.008.968 2.048.173 4.077.523 6.064 1.048 1.824.512 5.064 2.208 6.232 3.76.232.312.728 0 .504-.328-1.024-1.472-3.128-2.776-5.192-3.688ZM56.2 30.657c-.848-1.2-3.536-2.088-4.888.208-.888 1.504-.56 3.528.192 4.192-2.32 1.944-1.6 3.272-.608 3.928.992.656 1.44 0 1.6.512.52 1.408 1.496 1.6 1.04 1.256-1.096-.896.576-1.648-1.176-2.984 2.888.312 5.864-4.28 3.84-7.112Z"
                fill="#FF2370"
                opacity="0.8"
              ></path>
              <path
                opacity="0.21"
                d="M75.392 118.579c13.836-.404 25.024-1.715 24.989-2.93-.035-1.214-11.28-1.872-25.117-1.469-13.837.404-25.025 1.715-24.99 2.93.036 1.214 11.281 1.872 25.118 1.469Z"
                fill="#261E33"
              ></path>
              <path
                d="M91.872 45.448a15.205 15.205 0 0 0-2.952-.168l.344 12.176 7.336-9.784a7.808 7.808 0 0 0-4.728-2.224Z"
                fill="#D8D8D8"
              ></path>
              <path
                d="M98.28 44.576c-3.048-2.064-8-2.072-10.888-1.872.225.122.441.258.648.408.311.228.553.538.696.896.091.211.148.435.168.664v.608c.987-.04 1.976.017 2.952.168a7.808 7.808 0 0 1 4.728 2.224 7.607 7.607 0 0 1 1.68 2.904c.592 1.76-2.064 12.608-2.696 14.92-.632 2.312-.312 4.72 2 5.416 2.312.696 2.816-.264 3.088-1.248a141.164 141.164 0 0 0 2.048-16.8c.016-2.88.016-5.288-4.424-8.288Z"
                fill="#9069E7"
              ></path>
              <path
                d="M71.336 77.737s-4.616 3.008-5.144 4.664c-.2.632.696 21.504 2.192 22.92 1.496 1.416 10.512 1.6 18.016 0 7.504-1.6 12.92-4.984 13.048-6.456.128-1.472-6.8-21.992-7.728-22.616-1.376-.928-5.44-2.008-5.44-2.008l-14.944 3.496Z"
                fill="#D8D8D8"
              ></path>
              <path
                d="m67.752 74.208 1.296 5.848s2.088 1.544 10.904-.856c8.816-2.4 8.616-3.784 8.616-3.784l-1.088-5.264a50.969 50.969 0 0 1-9.08 3.032 39.061 39.061 0 0 1-10.648 1.024Z"
                fill="#D8D8D8"
              ></path>
              <path
                d="m87.48 70.151.704-.328a2.4 2.4 0 0 0 1.36-2.327l-.64-22.824a2.112 2.112 0 0 0-.864-1.6c-1.6-1.184-6.664-3.2-15.328-1.905-8.16 1.24-13.704 5.896-14.272 8.128-1.712.273-5.648 1.128-7.12 3.304a.6.6 0 0 0 0 .697c1.6 1.96 9.72 12.36 12.864 19.351a2.4 2.4 0 0 0 1.992 1.424c.432 0 .952.073 1.544.097a39.063 39.063 0 0 0 10.68-.985 50.977 50.977 0 0 0 9.08-3.032Z"
                fill="#D8D8D8"
              ></path>
              <path
                d="M69.736 44.105c-.888-1.04-3.592-6.344-3.608-7.568-.144-2.28 6.816-3.728 8-1.008.368.864 0 5.712-.104 7.568-.336 1.44-3.424 2.016-4.288 1.008Z"
                fill="#9069E7"
              ></path>
            </g>
            <defs>
              <clipPath id="processing_complex_svg__a">
                <path fill="#fff" d="M0 0h128v128H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>

        <h2 className="text-xl font-semibold mb-2">
          Sales call with {prospect?.name || "Customer"}
        </h2>
        <p className="text-gray-600 mb-6">
          Practice your pitch for {prospect?.company || "the company"}
        </p>

        <button
          onClick={openModal}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all duration-200 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M9 3.5L10.5 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5 2L16 3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 9L2 10.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 14.5L3.5 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 20.5L10.5 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5 22L16 20.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5 9L22 10.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 14.5L20.5 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              fill="currentColor"
            />
          </svg>
          START CALL
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
            <div className="relative w-11/12 max-w-6xl h-5/6 bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-black hover:text-gray-300 z-10"
              >
                <svg
                  className="w-8 h-8"
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

              {/* Modal content */}
              <div className="p-4 h-full overflow-y-auto">
                <div className="mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200 flex items-center justify-center">
                    {prospect?.image ? (
                      <Image
                        src={prospect.image}
                        alt={prospect.name}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <span className="text-xl text-gray-600">
                        {prospect?.name.charAt(0) || "P"}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {prospect?.name || "Customer"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {prospect?.title} at {prospect?.company}
                    </p>
                  </div>
                </div>
                <div className="w-full h-0.5 bg-gray-100 mb-4"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-100px)]">
                  {/* Video/Chat area - Takes up 2/3 of the space */}
                  <div className="md:col-span-2 bg-indigo-50 rounded-xl p-3 flex flex-col h-full">
                    {/* Call header with status */}
                    <div className="mb-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            isChatActive
                              ? "bg-green-500 animate-pulse"
                              : "bg-gray-400"
                          } mr-2`}
                        ></div>
                        <span className="text-gray-700 font-medium">
                          {isChatActive ? "Live Call" : "Call Ready"}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm">
                        <span className="font-medium">
                          {formatTime(elapsedTime)}
                        </span>{" "}
                        / 30:00
                      </div>
                    </div>

                    {/* Video element */}
                    <div className="relative bg-gray-900 rounded-lg flex-grow overflow-hidden mb-3">
                      {(isLoadingAI || error || !isChatActive) && (
                        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/60">
                          {isLoadingAI && (
                            <div className="text-white text-lg flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                              Connecting with {prospect?.name}...
                            </div>
                          )}
                          {error && (
                            <div className="text-red-400 text-lg">
                              Error: {error}
                            </div>
                          )}
                          {!isLoadingAI && !error && !isChatActive && (
                            <div className="text-white text-lg flex flex-col items-center">
                              <div className="w-16 h-16 rounded-full bg-indigo-500 mb-3 flex items-center justify-center">
                                {prospect?.image ? (
                                  <Image
                                    src={prospect.image}
                                    alt={prospect.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                  />
                                ) : (
                                  <span className="text-3xl">
                                    {prospect?.name.charAt(0) || "P"}
                                  </span>
                                )}
                              </div>
                              <p>
                                Ready to start your call with {prospect?.name}
                              </p>
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
                      <audio ref={audioRef} id="anam-audio-feed" muted></audio>
                    </div>

                    {/* Call controls */}
                    <div className="flex justify-center space-x-4 mt-2">
                      {!isChatActive ? (
                        <button
                          onClick={startChat}
                          disabled={isLoadingAI}
                          className={`px-6 py-2 ${
                            isLoadingAI
                              ? "bg-gray-400"
                              : "bg-indigo-600 hover:bg-indigo-700"
                          } text-white rounded-lg shadow-md transition-all flex items-center`}
                        >
                          {isLoadingAI ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                              </svg>
                              Start Call
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="flex space-x-3">
                          <button className="p-2 bg-gray-200 rounded-full">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                          </button>
                          <button className="p-2 bg-gray-200 rounded-full">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                            </svg>
                          </button>
                          <button
                            onClick={stopChat}
                            className="p-2 bg-red-600 text-white rounded-full"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm5 12a1 1 0 100-2 1 1 0 000 2z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info panel - Takes up 1/3 of the space */}
                  <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3 flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Call Preparation
                    </h3>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-gray-800 font-medium text-sm">
                          Prospect Profile
                        </h4>
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                          {prospect?.department}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="flex items-center mb-1">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                            {prospect?.image ? (
                              <Image
                                src={prospect.image}
                                alt={prospect.name}
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                            ) : (
                              <span className="text-indigo-600 font-medium text-xs">
                                {prospect?.name.charAt(0) || "P"}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {prospect?.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {prospect?.title}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs mb-1">
                          <span className="font-medium">Company:</span>{" "}
                          {prospect?.company}
                        </p>
                        <p className="text-gray-600 text-xs">
                          <span className="font-medium">Background:</span>{" "}
                          {prospect?.name} is the {prospect?.title} at{" "}
                          {prospect?.company} and is looking for solutions to
                          improve their sales process.
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="text-gray-800 font-medium text-sm mb-1">
                        Talking Points
                      </h4>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <ul className="text-gray-600 text-xs space-y-1">
                          <li className="flex items-start">
                            <svg
                              className="w-3 h-3 text-indigo-600 mr-1 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Demonstrate value for {prospect?.department} teams
                            specifically
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-3 h-3 text-indigo-600 mr-1 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Address common objections in the {prospect?.company}{" "}
                            industry
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-3 h-3 text-indigo-600 mr-1 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Highlight ROI metrics that matter to decision makers
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto mb-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-gray-800 font-medium text-sm">
                          AI Feedback
                        </h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          {isChatActive ? "Live" : "Ready"}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg border-l-4 border-indigo-500">
                        <p className="text-gray-600 text-xs italic">
                          {isChatActive
                            ? "AI feedback: Your pace and tone are good. Try asking more open-ended questions to engage the prospect."
                            : "Your AI coach will provide real-time feedback on your communication style, objection handling, and closing techniques during the call."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPreview;
