export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-slate-600 to-teal-600 drop-shadow">
        Age-Based Skill Categories
      </h1>
      <p className="text-lg text-gray-700 mb-10 font-medium">
        Smart play that grows with your child — one real-life skill at a time.
      </p>

      {/* Age 2-3 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          👶 Ages 2–3 | Early Explorers
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Build trust, senses, and early communication
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">❤️</span>
            <div>
              <h3 className="font-semibold">Emotional Safety</h3>
              <p className="text-sm text-gray-600">
                Help your child name emotions and feel secure
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">👋</span>
            <div>
              <h3 className="font-semibold">Sensory Discovery</h3>
              <p className="text-sm text-gray-600">
                Explore textures, sounds, and movement
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🗣️</span>
            <div>
              <h3 className="font-semibold">First Words</h3>
              <p className="text-sm text-gray-600">
                Encourage basic words and simple phrases
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🧦</span>
            <div>
              <h3 className="font-semibold">Early Life Skills</h3>
              <p className="text-sm text-gray-600">
                Start simple habits like washing hands and tidying up
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Age 4-5 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          🧒 Ages 4–5 | Little Learners
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Grow language, imagination, and early thinking
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🔤</span>
            <div>
              <h3 className="font-semibold">Letters & Sounds</h3>
              <p className="text-sm text-gray-600">
                Learn the alphabet, start writing their name
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">👬</span>
            <div>
              <h3 className="font-semibold">Social Play</h3>
              <p className="text-sm text-gray-600">
                Share, take turns, and play kindly with others
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🎭</span>
            <div>
              <h3 className="font-semibold">Pretend & Imagine</h3>
              <p className="text-sm text-gray-600">
                Act out stories and real-life situations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🧮</span>
            <div>
              <h3 className="font-semibold">Early Math</h3>
              <p className="text-sm text-gray-600">
                Count, match, and sort with fun logic games
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Age 6-7 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          🧑 Ages 6–7 | School Starters
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Support learning, confidence, and self-control
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">📖</span>
            <div>
              <h3 className="font-semibold">Reading & Writing</h3>
              <p className="text-sm text-gray-600">
                Read simple texts and write full sentences
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">➕</span>
            <div>
              <h3 className="font-semibold">Thinking & Numbers</h3>
              <p className="text-sm text-gray-600">
                Solve problems and understand basic math
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🎒</span>
            <div>
              <h3 className="font-semibold">Responsibility</h3>
              <p className="text-sm text-gray-600">
                Follow instructions, help at home, and finish tasks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🔐</span>
            <div>
              <h3 className="font-semibold">Safe & Private</h3>
              <p className="text-sm text-gray-600">
                Learn personal boundaries and digital safety basics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Age 8-9 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          👦 Ages 8–9 | Independent Thinkers
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Build smart decision-making, leadership, and creativity
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🧠</span>
            <div>
              <h3 className="font-semibold">Critical Thinking</h3>
              <p className="text-sm text-gray-600">
                Ask questions, solve problems, and think deeply
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">📚</span>
            <div>
              <h3 className="font-semibold">Learn & Research</h3>
              <p className="text-sm text-gray-600">
                Read independently and find out how things work
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">📅</span>
            <div>
              <h3 className="font-semibold">Time Management</h3>
              <p className="text-sm text-gray-600">
                Plan simple tasks, manage routines, and meet goals
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">💬</span>
            <div>
              <h3 className="font-semibold">Speak with Confidence</h3>
              <p className="text-sm text-gray-600">
                Express opinions and stand up for themselves
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
