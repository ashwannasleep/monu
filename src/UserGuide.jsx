import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const guideContent = {
  en: {
    title: 'User Guide',
    intro: 'Welcome to MONU — your mindful planner. Here’s how to use each feature:',
    sections: {
      calendar: '📅 Calendar: Plan monthly, weekly, or daily with your synced Google Calendar.',
      habits: '✅ Habit Tracker: Create habits, set days, and track your progress with visual circles.',
      pomodoro: '🍅 Pomodoro Timer: Stay focused with timed sessions and built-in breaks.',
      futurevision: '🗾 Future Vision: Envision your future self in 3-5 years to bring your goals into focus.',
    },
  },
  es: {
    title: 'Guía de uso',
    intro: 'Bienvenido a MONU — tu espacio para organizar tu día a tu ritmo. Así es como funciona:',
    sections: {
      calendar: '📅 Calendario: Sincronízalo con Google Calendar y organiza tu mes, semana o día fácilmente.',
      habits: '✅ Hábitos: Crea hábitos, elige días y sigue tu progreso con círculos visuales.',
      pomodoro: '🍅 Temporizador Pomodoro: Mejora tu productividad con sesiones enfocadas y pausas integradas.',
      futurevision: '🗺️ Visión futura: Imagina tu yo de aquí a 3-5 años y empieza a planear con propósito.',
    },
  },  
  fzh: {
    title: '使用手冊',
    intro: '歡迎來到 MONU — 專屬於你的生活節奏規劃工具。以下是各樣功能的簡介：',
    sections: {
      calendar: '📅 行事曆：透過 Google Calendar 同步，輕鬆規劃每月、每週或每日的計畫',
      habits: '✅ 習慣追蹤：建立習慣，設定週期，用圈圈看到代表化追蹤進度，慢慢累積成長',
      pomodoro: '🍅 番茄鐘：使用專注計時器，擁有休息節奏提高效率，休息也別忘了喔～',
      futurevision: '🗾 未來藍圖：描繪三到五年後的自己，規劃長遠未來計畫，讓目標能夠更清晰明瞭',
    },
  },
    jzh: {
        title: '使用指南',
        intro: '欢迎来到 MONU - 专属于你的日常节奏规划工具。以下是各项功能的简介：',
        sections: {
          calendar: '📅 行事历：透过 Google Calendar 同步，轻松规划每月、每周或每日的计划',
          habits: '✅ 习惯追踪：建立习惯，设定周期，用圈圈看到代表化追踪进度，慢慢累积成长',
          futurevision: '🗾 未来蓝图：描绘三到五年的自己，规划长远未来计划，让目标能够更清晰明瞭',
          pomodoro: '🍅 番茄钟：使用专注计时器，搭配休息节奏提高效率，不忘休息也很重要喔～',
        },
    },
  }


export default function UserGuide() {
  const [lang, setLang] = useState('en');
  const content = guideContent[lang];

  return (
    <><div className="min-h-screen px-6 py-12 flex flex-col items-center font-serif">
      <Link
        to="/choose"
        title="Back to menu"
        className="no-underline text-inherit hover:opacity-80 transition cursor-pointer"
      >
        <h1 className="text-4xl font-serif font-bold mb-2">
          MONU
        </h1>
      </Link>
      <p className="mt-4 italic text-gray-600 text-center">How to make the most of your moment ✨</p>


      <select
        className="mb-6 border border-[#ccc] rounded-md p-2 text-base"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <option value="en">🇺🇸 English</option>
        <option value="es">🇪🇸 Español</option>
        <option value="fzh">🇹🇼 繁體中文</option>
        <option value="jzh">🇨🇳 简体中文</option>
      </select>

      <p className="text-lg text-center max-w-xl mb-6 italic">{content.intro}</p>

      <div className="text-left max-w-xl space-y-4 text-lg leading-relaxed">
        <p>{content.sections.calendar}</p>
        <p>{content.sections.habits}</p>
        <p>{content.sections.pomodoro}</p>
        <p>{content.sections.futurevision}</p>
      </div>
    </div><>
        <style>
          {`
       .policy-link {
         color: #666;
         text-decoration: underline;
         text-decoration-color: #666;
       }
 
       .policy-link:visited {
         color: #666;
       }
     `}
        </style>

        <p style={{ fontSize: "0.875rem", textAlign: "center", marginTop: "3rem" }}>
          <a
            href="https://yourusername.github.io/monu-privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="policy-link"
          >
            Privacy Policy & Terms of Service
          </a>
        </p>
      </></>
  );
  

}
