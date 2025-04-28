import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChoosePage() {
  const [name, setName] = useState("you");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("monu_name") || "you";
    setName(storedName);
  }, []);

  const modules = [
    {
      title: "Yearly Overview",
      description: "Set your vision for the year.",
      path: "/yearly-overview",
    },
    {
      title: "Monthly Planner",
      description: "Break down your year into focused months.",
      path: "/monthly-planner",
    },
    {
      title: "Daily Plan",
      description: "Organize your to-dos and priorities.",
      path: "/daily-plan",
    },
    {
      title: "Habit Tracker",
      description: "Build your habits with structure.",
      path: "/habit-tracker",
    },
    {
      title: "Future Vision",
      description: "Dream and map your long-term goals.",
      path: "/future-vision",
    },
    {
      title: "Bucket List",
      description: "List your big life goals & fun ideas.",
      path: "/bucket-list",
    },
    {
      title: "Pomodoro",
      description: "Work with rhythm. Breathe between tasks.",
      path: "/pomodoro",
    },
    {
      title: "User Guide",
      description: "Your guide to mindful planning with MONU.",
      path: "/user-guide",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#3A3A3A] px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-serif font-bold mb-2">MONU</h1>
      <p className="text-center italic text-[#5A5A5A] mb-12">
        Choose a section to begin with.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto w-full">
        {modules.map((mod) => (
          <div
            key={mod.title}
            onClick={() => navigate(mod.path)}
            className="bg-white rounded-3xl p-8 shadow-[0_2px_4px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-md hover:scale-[1.02] transition transform duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-center">{mod.title}</h2>
            <p className="text-sm text-gray-600 text-center">{mod.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
