export const timelineEntries = [
    {
        "year":  2019,
        "description":  "Was the year I got out of college and with the free time I had, I started learning WordPress, Elementor, Photoshop, Illustrator, and JavaScript. And I also watched Anime, and started learning Japanese. "
    },
    {
        "year":  2020,
        "description":  "Was the year i got into a University, but then the pandemic moved classes online so most of my time was spent working on my Programming Fundamentals and Logic Building, and watching Anime. Built a MyAnimeList-inspired CRUD site with HTML, CSS, PHP, and MySQL. And yeah, I kinda had to drop Japanese after learning the basic reading and writing system cuz it was kinda hard with university."
    },
    {
        "year":  2021,
        "description":  "Was the year my focus moved from my studies to some other important things. Like Anime, and watching Anime and... Oh yeah, I also entered a writing Contest that was held by MyAnimeList x Honeyfeed. Wrote a short novel called Skipped a Beat, around 65,000 words. I probably tried to restart learning Japanese again but failed."
    },
    {
        "year":  2022,
        "description":  "Was the year... what was I doing other than watching Anime? Oh yeah... I'm still in University, this year they moved classes back to in-person so... Studying Yayy!!. Did Mobile Development in React Native and Web Development in React and blah blah etc etc. Actually, this year I found out about FullStackOpen so, kinda got the basics down of a MERN Stack. Oh and Game Development too, Used Unity to make some basic Coin Collector and stuff. I wasn't serious about Game Development at this point."
    },
    {
        "year":  2023,
        "description":  "... STILL IN UNI... selected some AI related Electives like Machine learning and Computer Vision. Wasn't exactly my cup of tea but still interesting. Also the year I got started with my FYP (Final Year Project, not For you Page). Selected Game Development cuz it was graded Easily. Worked on a Narrative Adventure called 'Skipped a Beat'."
    },
    {
        "year":  2024,
        "description":  "Was the year I got out of University. Spent the next 6 months preparing for interviews and applying for jobs. Starting Working as a Frontend Developer with Next.js. Later on was Promoted to a Fullstack Developer using PERN Stack."
    },
    {
        "year":  2025,
        "description":  "... Still Jobbing Hard! Maybe I played some games and like, watched anime? Actually I didn't, kinda stopped watching anime last year, around the time I ended Uni. Probably tried to start learning Japanese again? Don't remember much about this year."
    },
    {
        "year":  2026,
        "description":  "Same ol Same ol... I kinda Passed JLPT N4 without preparing much for it. Also got Back into Game Development a bit but haven't really done anything to show for it. Have been Vibe Coding Some Apps for my own use."
    }
];

export function getTimelineEntries(currentYear = new Date().getFullYear()) {
  const entriesByYear = new Map(timelineEntries.map((entry) => [entry.year, entry]));
  return Array.from({ length: Math.max(2022, currentYear) - 2019 + 1 }, (_, index) => {
    const year = 2019 + index;
    return entriesByYear.get(year) ?? { year, description: "" };
  });
}

// Shared terms also receive emphasis when repeated in another year.
export const timelineHighlights = [
  "WordPress", "Elementor", "Photoshop", "Illustrator", "JavaScript", "Japanese",
  "HTML", "CSS", "PHP", "MySQL", "Skipped a Beat", "Skipped Beat",
  "React Native", "React", "FullStackOpen", "MERN Stack", "Unity",
  "FYP", "Game Development", "Narrative Adventure", "Next.js", "PERN Stack", "JLPT N4",
];

const sharedLinks = {
  fullstackopen: "https://fullstackopen.com/en/",
};

const yearLinks = {
  2021: {
    "skipped a beat": "https://www.honeyfeed.fm/novels/4773",
    "skipped beat": "https://www.honeyfeed.fm/novels/4773",
  },
  2023: {
    "skipped a beat": "https://github.com/Z7X4Y2HQ/Skipped_a_Beat",
    "skipped beat": "https://github.com/Z7X4Y2HQ/Skipped_a_Beat",
  },
};

// Match longer phrases first, and treat punctuation such as the dot in Next.js literally.
const highlightedTerms = [...timelineHighlights]
  .sort((a, b) => b.length - a.length)
  .map((term) => term.replace(/[.*+?^\x24{}()|[\]\\]/g, "\\$&"));
const highlightPattern = new RegExp("\\b(" + highlightedTerms.join("|") + ")\\b", "gi");

export function getTimelineSegments(description, year) {
  return description.split(highlightPattern).map((text, index) => ({
    text,
    highlighted: index % 2 === 1,
    href: index % 2 === 1
      ? yearLinks[year]?.[text.toLowerCase()] ?? sharedLinks[text.toLowerCase()]
      : undefined,
  })).filter(({ text }) => text.length > 0);
}
