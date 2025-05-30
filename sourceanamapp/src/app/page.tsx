"use client";
import CallPreview from "@/components/CallPreview";
import Image from "next/image";
import { useState } from "react";

// Prospect data
interface Prospect {
  id: number;
  name: string;
  title: string;
  company: string;
  department: string;
  image: string;
  personaId: string;
  summary: string;
}

const prospects: Prospect[] = [
  {
    id: 1,
    name: "Jim Hardass",
    title: "VP of Sales",
    company: "Cigna Health",
    department: "Sales",
    image: "/pp/jim.png",
    personaId: "88ef4346-71f7-4567-8492-5d8d3a89a5ae",
    summary:
      "Trust me, I've tried EVERYTHING with Jim. I sent him a gift basket with protein bars and a \"Sales Champions\" mug. I even offered him ringside seats to the UFC fight night (I heard he's into competitive bloodsports... or maybe that's just his sales approach). The man acts like his calendar is protected by the Secret Service. He once replied to my meeting request with \"Unless your product can add 7 figures to my Q4 numbers by next Thursday, I'm busy until 2027.\" Three of our SDRs have quit after cold-calling him. But you're different. You've got that special something. Your mission, should you choose to accept it: book a meeting with Jim for your sales automation tool. Just remember to wear emotional body armor and prepare for him to interrupt you approximately every 12 seconds.",
  },
  {
    id: 2,
    name: "Nancy Nightmare",
    title: "Head of Customer Success",
    company: "Intrepid",
    department: "Customer Success",
    image: "/pp/clara.png",
    personaId: "17b4ac05-b89a-4800-955d-c256b71bc28e",
    summary:
      "Oh boy, Nancy 'The Perfectionist' Nightmare. I once scheduled a demo with her that went 47 minutes over because she wanted to role-play EVERY possible customer complaint scenario. The last rep who pitched her had to submit a 22-page document answering her 'preliminary questions' before she'd even consider a meeting. Legend has it she once rejected a vendor because their follow-up email had a missing Oxford comma. I sent her a beautiful customer journey map printed on premium cardstock, and she mailed it back with red pen corrections and a note saying 'This would cause 16 support tickets per hour.' But I believe in you! Your mission: book a meeting with Nancy for your customer feedback platform. Pro tip: Don't use the word 'intuitive' unless you can provide empirical usability studies to back it up. And for the love of god, proofread everything TWICE.",
  },
  {
    id: 3,
    name: "Jeremy Baskin",
    title: "VP of Marketing",
    company: "Crunchbase",
    department: "Marketing",
    image: "/pp/jeremy.png",
    personaId: "11adb24f-b011-4c4d-8273-ffb6802a8aea",
    summary:
      'Jeremy "Data-or-Die" Baskin. This guy once told me my cold email "lacked sufficient differentiation in the value proposition to warrant calendar allocation." Who talks like that?! I tried sending him an infographic about our solution, and he responded with a 7-paragraph critique of our color scheme and font choices. I even created a custom ROI calculator for him, and he replied asking for the confidence intervals and statistical methodology behind my projections. I\'m pretty sure he runs A/B tests on his breakfast cereal. The one time I got close to booking him, he asked for "case studies from companies with similar TAM and brand equity coefficients" and then ghosted me when I sent them. But you\'ve got this! Your mission: book a meeting with Jeremy for your marketing analytics platform. Just make sure every claim you make is backed by at least three data points and a peer-reviewed study.',
  },
  {
    id: 4,
    name: "Scott Michaelson",
    title: "Regional Manager",
    company: "Dunder Paper",
    department: "Management",
    image: "/pp/scott.png",
    personaId: "626fbd18-1103-4a77-a58c-cbdcc0ef0a9d",
    summary:
      'Oh, Scott "The World\'s Okayest Manager" Michaelson. I\'ve been trying to book this guy for 8 months. He responded to my first email saying he was "very interested and would circle back," which I later learned is Scott-speak for "I will completely forget about this in 7 minutes." I once got him on the phone, but he spent 20 minutes telling me about his fantasy football league and his "revolutionary" idea for a paper company app that\'s basically just Amazon but "with more personality." I sent him a case study, and he said he\'d "run it up the flagpole," which apparently means "lose it in my email inbox forever." Last week, I offered him tickets to a golf event, and he asked if I could get him "something more VIP" because he\'s "kind of a big deal in the paper world." But I see potential in you! Your mission: book a meeting with Scott for your business efficiency software. Just be prepared to laugh at his jokes, pretend you\'re impressed by his management philosophies, and explain everything as if you\'re teaching a golden retriever to use Microsoft Excel.',
  },
  {
    id: 5,
    name: "Kevin Orca",
    title: "CEO",
    company: "Seaworld Inc",
    department: "Executive",
    image: "/pp/kevin.png",
    personaId: "5258c156-bfd5-4b45-8445-298bf1c53b8b",
    summary:
      'Kevin "Walking-PR-Statement" Orca. This guy is harder to pin down than his company\'s marine attractions. I attempted to book him through proper channels, and his executive assistant sent me a 5-page NDA just to consider a preliminary conversation. I crafted the perfect pitch about how our solution could help with their "transformation journey" (buzzwords I pulled from their annual report), and his team responded asking for "alignment with conservation initiatives and stakeholder perception enhancement." I even got creative and sent him a donation to a marine conservation charity in his name, and all I got was a form letter thanking me for "supporting the mission." His LinkedIn profile says he\'s active on the platform, but I\'m convinced it\'s run by a team of PR specialists and possibly an AI trained to use the word "sustainability" in every sentence. But you seem brave! Your mission: book a meeting with Kevin for your stakeholder management platform. Word of advice: don\'t mention orcas, blackfish, or anything remotely controversial. And prepare to have your meeting rescheduled at least 4 times because of "urgent board matters."',
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect>(
    prospects[0]
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // If modal is open, render only the CallPreview component
  if (isModalOpen) {
    return (
      <CallPreview
        isOpen={isModalOpen}
        onClose={closeModal}
        prospect={selectedProspect}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Nooks logo */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.svg" alt={"Nooks logo"} width={120} height={40} />
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Products
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Resources
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Pricing
              </a>
            </nav>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Try for free
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel - Prospects List */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Prospects</h2>
              <button className="text-blue-500 hover:text-blue-700 font-medium">
                + CREATE NEW
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Pick a prospect and start selling
            </p>

            <div className="space-y-4">
              {prospects.map((prospect) => (
                <div
                  key={prospect.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedProspect.id === prospect.id
                      ? "bg-orange-50 border border-orange-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedProspect(prospect)}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-gray-200">
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        {/* Placeholder for avatar image */}
                        <Image
                          src={prospect.image}
                          alt={prospect.name}
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">
                        {prospect.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {prospect.title} at {prospect.company}
                      </p>
                      <p className="text-indigo-500 text-sm font-medium mt-1">
                        {prospect.department}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Prospect Detail */}
          <div className="w-full md:w-2/3 bg-indigo-50 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full font-medium">
                PROSPECT
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full font-medium">
                  SALES
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M8 13V9m4 4V9m4 4V9M8 17h8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 9a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 7V4a1 1 0 011-1h8a1 1 0 011 1v3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-semibold">6</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-28 h-28 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  {/* Placeholder for avatar image */}
                  <Image
                    src={selectedProspect.image}
                    alt={selectedProspect.name}
                    width={112}
                    height={112}
                  />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedProspect.name}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {selectedProspect.title} at {selectedProspect.company}
              </p>

              <div className="max-w-3xl text-center mb-8">
                <p className="text-gray-700 mb-6">{selectedProspect.summary}</p>
              </div>

              <button
                onClick={openModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium flex items-center transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M15.6 11.6L22 7v10l-6.4-4.5v-0.9zM4 5h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
                START CALL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
