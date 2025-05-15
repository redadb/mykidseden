export interface SkillWeight {
  skill: string;
  weight: number;  // 1-5 where 5 is highest priority
}

export interface AgeGroup {
  age: string;
  title: string;
  focus: string;
  skills: SkillWeight[];
}

export const categories: AgeGroup[] = [
  {
    age: "2-3",
    title: "Early Explorers",
    focus: "Foundation through senses, emotion, movement, and imitation",
    skills: [
      { skill: "Emotional Intelligence (EQ)", weight: 5 },
      { skill: "Life Skills & Routine", weight: 4 },
      { skill: "Fine Motor & Sensory", weight: 4 },
      { skill: "Language & Communication", weight: 3 },
      { skill: "Creativity & Role Play", weight: 3 },
      { skill: "Math & Logic", weight: 2 },
      { skill: "Nature & Science", weight: 2 },
      { skill: "Geography & Culture", weight: 1 } // optional exposure
    ]
  },
  {
    age: "4-5",
    title: "Little Learners",
    focus: "Readiness for school, expressive language, symbolic thinking",
    skills: [
      { skill: "Language & Literacy", weight: 5 },
      { skill: "Life Skills & Routine", weight: 4 },
      { skill: "EQ & Social Play", weight: 4 },
      { skill: "Creativity & Role Play", weight: 3 },
      { skill: "Math & Logic", weight: 3 },
      { skill: "Fine Motor", weight: 2 },
      { skill: "Nature & Science", weight: 2 },
      { skill: "Geography & Culture", weight: 1 }
    ]
  },
  {
    age: "6-7",
    title: "School Starters",
    focus: "Real learning skills – reading, solving, organizing",
    skills: [
      { skill: "Math & Logic", weight: 5 },
      { skill: "Language & Literacy", weight: 4 },
      { skill: "Time & Responsibility", weight: 4 },
      { skill: "EQ & Regulation", weight: 3 },
      { skill: "Science & Nature", weight: 3 },
      { skill: "Creativity & Expression", weight: 2 },
      { skill: "Geography & Culture", weight: 2 },
      { skill: "Fine Motor & Sensory", weight: 1 }
    ]
  },
  {
    age: "8-9",
    title: "Independent Thinkers",
    focus: "Self-driven thinking, identity, independence",
    skills: [
      { skill: "Time & Self-Management", weight: 5 },
      { skill: "Math & Problem Solving", weight: 4 },
      { skill: "Reading & Literacy", weight: 4 },
      { skill: "EQ & Empathy", weight: 3 },
      { skill: "Creativity & Entrepreneurship", weight: 3 },
      { skill: "Geography & Culture", weight: 2 },
      { skill: "Science & Discovery", weight: 2 },
      { skill: "Fine Motor & Maker Skills", weight: 1 }
    ]
  }
];
