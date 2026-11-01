"use client"

export function Skills() {
  const frontendSkills = [
    { name: "React", level: 95, color: "#61DAFB" },
    { name: "Next.js", level: 92, color: "#FFFFFF" },
    { name: "TypeScript", level: 90, color: "#3178C6" },
    { name: "JavaScript (ESNext)", level: 95, color: "#F7DF1E" },
    { name: "Tailwind CSS", level: 95, color: "#06B6D4" },
    { name: "Material UI (MUI)", level: 88, color: "#007FFF" },
    { name: "HTML5 / CSS3", level: 95, color: "#E34F26" },
  ]

  const backendSkills = [
    { name: "Python / FastAPI", level: 88, color: "#3776AB" },
    { name: "Node.js / Express", level: 85, color: "#339933" },
    { name: "PHP / Laravel", level: 84, color: "#FF2D20" },
    { name: "PostgreSQL", level: 90, color: "#336791" },
    { name: "MySQL", level: 90, color: "#4479A1" },
    { name: "MongoDB", level: 82, color: "#47A248" },
    { name: "Supabase & Firebase", level: 90, color: "#3ECF8E" },
    { name: "Redis", level: 80, color: "#DC382D" },
  ]

  const systemsAndCloud = [
    { name: "Git & GitHub", level: 92, color: "#F05032" },
    { name: "Docker", level: 82, color: "#2496ED" },
    { name: "Vercel & Netlify", level: 92, color: "#000000" },
    { name: "Google Cloud Platform", level: 78, color: "#4285F4" },
    { name: "AWS Cloud", level: 75, color: "#FF9900" },
    { name: "C & C++", level: 80, color: "#00599C" },
    { name: "Rust", level: 68, color: "#DEA584" },
  ]

  const otherSkills = [
    { name: "UI/UX & Figma", level: 88, color: "#F24E1E" },
    { name: "E-Commerce Systems", level: 92, color: "#F59E0B" },
    { name: "Payment Gateways (Paystack/Stripe)", level: 94, color: "#10B981" },
    { name: "REST APIs & Webhooks", level: 95, color: "#FF6C37" },
    { name: "Embedded Systems & Logic", level: 80, color: "#8B5CF6" },
    { name: "Solid Modeling & CAD", level: 75, color: "#06B6D4" },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-mono">
      <div>
        <div className="text-amber-500 text-xs uppercase tracking-wider mb-1">// Technical Inventory</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Skills & Technologies</h1>
        <p className="text-sm text-gray-400 mt-1">Comprehensive breakdown of languages, frameworks, cloud platforms, and tooling.</p>
      </div>

      <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-4 sm:p-5 shadow-xl text-xs sm:text-sm">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#232B33] text-gray-400 text-xs">
          <span className="text-amber-500">▶</span>
          <span>stack-declaration.ts</span>
        </div>

        <pre className="text-gray-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          <code>
            <span className="text-[#3B82F6]">export const</span> <span className="text-[#8B5CF6]">technikraftStack</span> = {"{\n"}
            {"  "}<span className="text-[#F59E0B]">languages</span>: [<span className="text-[#10B981]">"TypeScript"</span>, <span className="text-[#10B981]">"JavaScript"</span>, <span className="text-[#10B981]">"Python"</span>, <span className="text-[#10B981]">"PHP"</span>, <span className="text-[#10B981]">"SQL"</span>, <span className="text-[#10B981]">"C++"</span>, <span className="text-[#10B981]">"C"</span>, <span className="text-[#10B981]">"Rust"</span>],{"\n"}
            {"  "}<span className="text-[#F59E0B]">frontend</span>: [<span className="text-[#10B981]">"React"</span>, <span className="text-[#10B981]">"Next.js"</span>, <span className="text-[#10B981]">"Tailwind CSS"</span>, <span className="text-[#10B981]">"Material UI"</span>],{"\n"}
            {"  "}<span className="text-[#F59E0B]">backend</span>: [<span className="text-[#10B981]">"FastAPI"</span>, <span className="text-[#10B981]">"Node.js"</span>, <span className="text-[#10B981]">"Laravel"</span>, <span className="text-[#10B981]">"Express.js"</span>],{"\n"}
            {"  "}<span className="text-[#F59E0B]">data</span>: [<span className="text-[#10B981]">"PostgreSQL"</span>, <span className="text-[#10B981]">"MySQL"</span>, <span className="text-[#10B981]">"MongoDB"</span>, <span className="text-[#10B981]">"Supabase"</span>, <span className="text-[#10B981]">"Firebase"</span>, <span className="text-[#10B981]">"Redis"</span>],{"\n"}
            {"  "}<span className="text-[#F59E0B]">cloudAndDevOps</span>: [<span className="text-[#10B981]">"Docker"</span>, <span className="text-[#10B981]">"Vercel"</span>, <span className="text-[#10B981]">"Netlify"</span>, <span className="text-[#10B981]">"GCP"</span>, <span className="text-[#10B981]">"AWS"</span>, <span className="text-[#10B981]">"Git"</span>]{"\n"}
            {"}"};
          </code>
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frontend Section */}
        <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-5 shadow-md">
          <div className="text-amber-400 text-xs font-bold uppercase mb-4 tracking-wider">// Frontend & UI Architecture</div>
          <div className="space-y-3.5">
            {frontendSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>{skill.name}</span>
                  <span className="text-amber-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-[#0F1215] rounded-full h-2 overflow-hidden border border-[#232B33]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%`, backgroundColor: "#F59E0B" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Section */}
        <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-5 shadow-md">
          <div className="text-emerald-400 text-xs font-bold uppercase mb-4 tracking-wider">// Backend, APIs & Databases</div>
          <div className="space-y-3.5">
            {backendSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>{skill.name}</span>
                  <span className="text-emerald-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-[#0F1215] rounded-full h-2 overflow-hidden border border-[#232B33]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%`, backgroundColor: "#10B981" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Systems & Cloud */}
        <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-5 shadow-md">
          <div className="text-blue-400 text-xs font-bold uppercase mb-4 tracking-wider">// Systems, Cloud & Low-Level</div>
          <div className="space-y-3.5">
            {systemsAndCloud.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>{skill.name}</span>
                  <span className="text-blue-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-[#0F1215] rounded-full h-2 overflow-hidden border border-[#232B33]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%`, backgroundColor: "#3B82F6" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applied Engineering */}
        <div className="bg-[#15191E] border border-[#232B33] rounded-xl p-5 shadow-md">
          <div className="text-purple-400 text-xs font-bold uppercase mb-4 tracking-wider">// Applied Disciplines & Tools</div>
          <div className="space-y-3.5">
            {otherSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>{skill.name}</span>
                  <span className="text-purple-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-[#0F1215] rounded-full h-2 overflow-hidden border border-[#232B33]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%`, backgroundColor: "#8B5CF6" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
