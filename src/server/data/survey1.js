// HOW MUCH DO YOU KNOW ABOUT BEETHOVEN ?

const title = `How much <br> do you know <br> about Beethoven?`;

const items = [
  {
    question: 'Beethoven was born in 1770',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven was a musical prodigy',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven\'s playing impressed Mozart, who said, "Pay attention to this young man, he will become famous later"',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven studied composition with Haydn for only one year in Vienna. He and Haydn disagreed on the question of whether to cater to the popular aesthetic, and Beethoven was reluctant to cater to the aesthetic of the upper classes, while trying to break this aristocratic privilege.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven was unwilling to play the piano for the aristocracy. Once a noble lady, on her knees, implored Beethoven to play the piano, but Beethoven still coldly refused. This shows his independent spirit of not being bound by power, which is very different from Haydn.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'The Pathétique Sonata, Spring Sonata and Symphony No. 1 are classical music style works',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'The Third Symphony was completed in 1804, when Beethoven composed from his own heart, aspirations, passions and world view, dedicated to "the eternal world" and "mankind".',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven was the first composer to use the human voice in his symphonies',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven\'s fate was tragic, and most of his trials and tribulations came from himself and his family. His misfortune can be heard in his music, but at the same time he was full of longing for the good.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven was very affectionate, and this can also be heard in his music',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'The works after Beethoven\'s Second Symphony no longer belong to the typical classical style',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'The Turkish March is a section of the overture OP.113 "The Ruins of Athens"',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Even in the face of the gathering strength of Romantic ideas and the imminent disintegration of the classical ideal, Beethoven always held fast to the rigor of classicism, striving to convey his inner "classical spirit", and finally "in his finest works, brought mankind closer to perfection than it has ever been since the birth of the world',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven Op. 1 is the first symphony',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven has 32 piano sonatas',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven composed 1 opera, 2 masses, 1 oratorio with 3 cantatas, 10 violin sonatas, 16 string quartets',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'The ideas of the Enlightenment and the French Revolution are reflected in Fidelio, which has the plot of emancipation of political prisoners',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven\'s addition of titles to symphonies (and indeed movements), though not the first in the history of music, is certainly one of the most famous examples. Inspired by later composers.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Wagner called Beethoven\'s Seventh Symphony "the apotheosis of dance," referring to the intense rhythmic dynamics that characterize each movement of the Seventh',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven, who had been single, had moved 63 times in Vienna',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven\'s War Symphony is somewhat similar to the 1812 Overture and is often performed with the sound of gunfire',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Because of his deafness, Beethoven needed a "Konversationshefte" from 1818 onwards to be able to "talk" to people, and it was in this way that many of his words were preserved and became an important source for future generations. It is in this way that many of Beethoven\'s words have been preserved and have become important sources for the study of his person.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven said, "I would rather write 10,000 notes than one word. But he still left us many letters',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'He was very regular in his chores, waking up early, grinding coffee to the exact number of beans, and then working at his desk until two or three o\'clock before eating',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven succeeded in having a number of his works published at the same time by two or more companies in different countries',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven\'s ear disease led to suicidal thoughts, and only his music, and a vague sense of mission, kept him from going off the rails',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'In his later years, Beethoven became insane, lost his sense of hearing, and wrote such incredible works as the OP.133 String Quartet',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Compared to his contemporaries, Beethoven was very much ahead of his time, he was a sound artist, a thinker, a reformer. He made many efforts to expand the symphony, to use new instruments and to improve it.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'The unique style of Beethoven\'s last three piano sonatas has many dissonant harmonies. Do you think this is due to his deafness?',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven mentioned many times in his conversations and letters that the Solemn Mass is his greatest work',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'UNESCO has designated the original score of Beethoven\'s Ninth Symphony as a cultural heritage of humanity',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven once said, "I only wish I could give the world some beautiful music, and then just end up like an old codger in front of all you decent gentlemen on earth."',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven\'s oeuvre includes 32 piano sonatas, nine symphonies, five piano concertos, violin concertos, trio concertos and string quartets. There are 138 works with Op numbers. But he is the author of about 750 compositions. They are listed in the catalogue raisonné as works and work groups with opus number (op.), works without opus number (WoO) and unfinished works (Unv).',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven once said: "He is not a brook (Bach in German), but an ocean!',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'During this period of Beethoven\'s life, the nobility gradually stopped keeping composers and a large number of musicians and started to focus on individual musicians and commissioning music, which gave the composer more freedom. Beethoven\'s patrons were many.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven\'s patrons were many, then later, copyright became a source of income for Beethoven',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven once attempted suicide: I almost ended my life, and it was she, art, who stopped me',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven\'s music was not performed much in France, and he once stated: The French consider my music unplayable',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Beethoven had a lover, a woman he loved passionately and was loved by her. And who this woman was is still a mystery.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'In Beethoven\'s most difficult moment, Countess Browning appeared to change Beethoven\'s poor living condition, and with the Countess\'s help, the music Beethoven composed quickly gained popularity from all walks of life',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Schubert\'s friend Huttenbrunner described a dramatic scene when Beethoven left, when thunder and lightning were in the air: Beethoven suddenly opened his eyes, stretched his right fist into the air and did so for a few seconds, looking serious and angry. Then his body fell back, his eyes were half closed, no more words came out of his mouth and his heart stopped beating.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'The funeral of the great composer Beethoven took place on March 29, 1827, with as many as 10,000 Viennese citizens reportedly in attendance, and the authorities sent military police to maintain order',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'It is no secret that Ludwig van Beethoven revolutionized almost every aspect of the musical life of his time. Whether it was setting standards for symphonies and other types of music, defining the role of the artist, reassessing the relationship between old and new music, or establishing the concert format itself, every aspect of musical life was inseparable from the legendary composer\'s involvement. And his radical approach was not always praised by his contemporaries.',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
];

export default {
  title,
  items,
};
