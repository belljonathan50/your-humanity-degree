// WHAT ABOUT YOU COMPARE TO BEETHOVEN ?

const title = `What about <br> you compare <br> to Beethoven?`;

const items = [
  {
    question: 'Being misunderstood is a very painful thing for me',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I look down on people who are not as strong as me and sometimes I humiliate them in various ways',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Physical comfort is very important to me',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I can touch the sadness and misfortune in my life',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'The inability of others to accomplish their own things can make me disappointed and angry',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I like a dramatic and colorful life',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I feel imperfect',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I am used to selling myself and never feel embarrassed',
    answers: [
      ['Yes', 0],
      ['No', 1],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'Sometimes I indulge myself and do arrogant things',
    answers: [
      ['Yes', 1],
      ['No', 0],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'Not helping others makes me feel miserable',
    answers: [
      ['Yes', 2],
      ['No', 1],
      ['I don\'t know', 0],
    ],
  },
  {
    question: 'I am reluctant to adapt to others and often resist',
    answers: [
      ['Yes', 1],
      ['No', 2],
      ['I don\'t know', 0],
    ],
  },
  {
    question: 'One of the things I dislike most is hypocrisy',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I usually wait for people to approach me rather than me approaching them',
    answers: [
      ['Yes', 1],
      ['No', 2],
      ['I don\'t know', 0],
    ],
  },
  {
    question: 'I like to be the protagonist, hoping to get attention',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I\'m a natural salesman and can easily convince people',
    answers: [
      ['Yes', 1],
      ['No', 2],
      ['I don\'t know', 0],
    ],
  },
  {
    question: 'I like to stay on track and have nothing to change',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I care about my family, loyalty and tolerance at home',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I\'m tolerant and polite, but I don\'t interact deeply with people',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I am quiet and don\'t seem to care about others',
    answers: [
      ['Yes', 1],
      ['No', 0],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'When I am immersed in my work or professional field, others think I am heartless',
    answers: [
      ['Yes', 1],
      ['No', 2],
      ['I don\'t know', 0],
    ],
  },
  {
    question: 'If I can\'t make a perfect statement, I\'d rather not say anything',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I am ambitious and enjoy the challenge and the experience of climbing to the top',
    answers: [
      ['Yes', 2],
      ['No', 1],
      ['I don\'t know', 0],
    ],
  },
  {
    question: 'I have felt abandoned many times',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'When I first meet a stranger, I can be cold and arrogant',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I have a serious and straightforward facial expression',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I often criticize myself and want to constantly improve my shortcomings to make myself a perfect person',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I have a strong creative talent and imagination and like to re-integrate things',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I aspire to have the perfect soul mate',
    answers: [
      ['Yes', 1],
      ['No', 0],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'I am very confident in my own abilities',
    answers: [
      ['Yes', 1],
      ['No', 0],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'If someone around me acts too much, I will definitely embarrass him',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I am outgoing, energetic, and like to constantly strive for achievement, which makes me feel very good about myself',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I know how to make people like me',
    answers: [
      ['Yes', 1],
      ['No', 0],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'I am easily jealous and like to compare myself to others',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Sometimes I irritate the other person and cause inexplicable arguments. In fact, I want to test the other person to see if they love me.',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I often deliberately stay excited',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I don\'t seem to know how to be humorous or adaptable',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I treat people with warmth and patience',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I often feel shy and uncomfortable in crowds',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Helping others to be happy and successful is an important accomplishment for me',
    answers: [
      ['Yes', 1],
      ['No', 0],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'When giving, I get frustrated if others are not willing to accept',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I am stiff and not used to the enthusiasm of others',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I am not very interested in most social gatherings, unless it is someone I know and love',
    answers: [
      ['Yes', 0],
      ['No', 1],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'Not only do I not say sweet things, but others may find me nagging',
    answers: [
      ['Yes', 0],
      ['No', 1],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'I am more likely to feel frustrated and numb than angry',
    answers: [
      ['Yes', 1],
      ['No', 0],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'I am very emotional and my mood changes throughout the day',
    answers: [
      ['Yes', 1],
      ['No', 0],
      ['I don\'t know', 2],
    ],
  },
  {
    question: 'Do you consider Beethoven radical ?',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I am a rule-follower and order makes sense to me',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'I have a hard time finding a relationship where I can truly feel loved',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Sometimes I\'m kind and sweet, and sometimes I\'m rude, irritable and unpredictable',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['I don\'t know', 1],
    ],
  },
  {
    question: 'Many times I have strong feelings of loneliness',
    answers: [
      ['Yes', 0],
      ['No', 1],
      ['I don\'t know', 2],
    ],
  },
];

export default {
  title,
  items,
};
