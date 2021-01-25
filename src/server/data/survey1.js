// {
//   question: String,
//   answers: [
//     [ answer, score ],
//     ...
//   ],
// },
// ...

const surveyData = [
  {
    question: 'Are you kind enough ?',
    answers: [
      ['Not at all', 0],
      ['Just a little', 1],
      ['Somewhat', 2],
      ['Quite a bit', 3],
      ['Very much', 3],
    ],
  },
  {
    question: 'What is the colour of the sky ?',
    answers: [
      ['Blue', 0],
      ['Red', 2],
      ['Yellow', 2],
      ['Green', 3],
    ],
  },
  {
    question: 'Are you happy ?',
    answers: [
      ['Yes', 10],
      ['No', 0],
      ['Maybe', 12],
    ],
  },
  {
    question: 'How often do you go out ?',
    answers: [
      ['Never', 0],
      ['Once a week', 1],
      ['Several times a week', 4],
      ['Everyday', 5],
    ],
  },
];

export default surveyData;