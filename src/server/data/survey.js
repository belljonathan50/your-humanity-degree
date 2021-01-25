const surveyData = [
  // questions from enneagram
  {
    question: 'I am easily confused',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I don\'t want to be a critic, but it is difficult to do it',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Independent, everything on you',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'When I have difficulties, I try to keep people from knowing',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Being misunderstood is a very painful thing to me',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Giving will give me greater satisfaction than receiving',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often imagine the worst results and get myself into distress',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often test or test the loyalty of friends and partners',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I look down on those who are not as strong as me, and sometimes I humiliate them in various ways',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Physical comfort is very important to me',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I can touch the sadness and misfortune in life',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Others can\'t complete their own affairs, will make me disappointed and angry',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often delay problems and do not solve them',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I like a dramatic and colorful life',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I think I am very imperfect',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I have a particularly strong need for the senses. I like food, clothing, body tactile stimulation, and indulge in pleasure',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'When others ask me some questions, I will analyze them in detail',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am used to selling myself and never feel embarrassed',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Sometimes I will indulge and do arrogant things',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Not helping others makes me feel painful',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I don\'t like people asking me broad, general questions',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I have a tendency to indulge in certain areas (such as food, drugs, etc.)',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I would rather adapt to others, including my partner, rather than resist them',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'One of my least favorite things is hypocrisy',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I can correct my mistakes, but people around me still feel pressure due to strong attachments',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often think that many things are fun and interesting, and life is really happy',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Sometimes I appreciate that I am full of authority, and sometimes I am indecisive and dependent on others',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am used to giving more than accepting',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'When faced with threats, I became anxious and confronted the oncoming danger',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I usually wait for others to approach me instead of me approaching them',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I like to be the protagonist and hope to get everyone\'s attention',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Sometimes I look forward to the guidance of others, but sometimes ignore the advice of others and go straight to what I want to do',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often forget my needs',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am a natural salesman, and it is easy for me to convince others',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I like to follow the usual practice, not much to change',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I care about my family, loyalty and tolerance at home',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am very tolerant and polite, but I don\'t interact deeply with people',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am taciturn, as if I don\'t care about others',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'When immersed in work or my area of expertise, others will feel that I am ruthless',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I don\'t like the feeling of being obligated to people',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'If I can\'t make a perfect statement, I would rather not say it',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am ambitious and like the experience of challenging and climbing to the top',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I feel abandoned many times',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'When I first meet a stranger, I will be very cold and arrogant',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'My facial expression is serious and blunt',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am often critical of myself and hope to continuously improve my shortcomings in order to become a perfect person',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I have a strong creative talent and imagination, and like to reintegrate things',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I long to have the perfect soul mate',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often boast about myself and have great confidence in my abilities',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'If the people around behave too much, I must embarrass him',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am outgoing, energetic, and like to constantly pursue achievements, which makes me feel very good about myself',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am a loyal friend and partner',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I know how to make others like me',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am jealous and like to compare with others',
    answers: [
      ['Yes', 0],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Sometimes I will irritate each other and cause inexplicable quarrels. In fact, I want to test whether the other party loves me or not',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I will try my best to protect the one I love',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often deliberately keep excited',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I only like to be friends with interesting people. I am too lazy to associate with some stuffy people, even if they seem to be deep',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often go out to help others',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I don\'t seem to know much about humor and I have no flexibility',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I treat people warmly and patiently',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often feel shy and upset in the crowd',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Helping others to achieve happiness and success is an important achievement for me',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'When giving, I will feel frustrated if others are not willing to accept it',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'My body is rigid and I am not used to the enthusiasm of others',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am not very interested in most social gatherings, unless it is someone I know and love',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Many times I have a strong sense of loneliness',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'People are happy to confess their problems to me',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Not only do I do not speak sweet words, but others will find me nagging',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I often worry about being deprived of freedom, so I don\'t like to make promises',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I want to be fair and honest, so I don\'t hesitate to conflict with others',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I have a sense of justice and sometimes support the unfavorable side',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I feel frustrated and numb more easily than anger',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am very emotional, the mood of the day is changeable',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I don\'t want others to know my feelings and thoughts unless I tell them',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I seldom listen to other people\'s moods attentively, I only like to say witty words and jokes',
    answers: [
      ['Yes', 0],
      ['No', 2],
      ['Maybe', 1],
    ],
  },
  {
    question: 'I am a person who follows the rules, and order is very meaningful to me',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'It is difficult for me to find a relationship in which I truly feel loved',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'If I want to end a relationship, I either directly tell the other person or irritate him to let him leave me',
    answers: [
      ['Yes', 1],
      ['No', 1],
      ['Maybe', 1],
    ],
  },
  {
    question: 'Sometimes I am kind and cute, and sometimes rude and irritable, and elusive',
    answers: [
      ['Yes', 2],
      ['No', 0],
      ['Maybe', 1],
    ],
  },
];

export default surveyData;