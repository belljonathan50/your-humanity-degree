const samples = {
  surveys: {
    good: [
      'quick/quick26',
      'others/new scene2',
      'others/new scene5',
    ],
    neutral: [
      'others/trumpet',
      'others/trumpet2',
      'others/trumpet3',
    ],
    bad: [
      'words/words2',
      'words/words3',
      'words/words22',
      'words/words23',
    ],
  },
  game1: {
    background: [
      [
        'typing/typ3',
      ],
    ],
    triggers: [
      [
        'quick/quick1',
        'quick/quick2',
        'quick/quick3',
        'quick/quick4',
        'quick/quick5',
        'quick/quick6',
      ],
      [
        'quick/quick7',
        'quick/quick8',
        'quick/quick9',
        'quick/quick10',
        'quick/quick11',
        'quick/quick12',
      ],
    ],
    answers: [{
      // answers sample set 1
      good: [
        'quick/quick26',
        'others/new scene2',
        'others/new scene5',
      ],
      neutral: [
        'others/trumpet',
        'others/trumpet2',
        'others/trumpet3',
      ],
      bad: [
        'words/words2',
        'words/words3',
        'words/words22',
        'words/words23',
      ],
    }, {
      // answers sample set 2
      good: [
        'quick/quick26',
        'others/new scene2',
        'others/new scene5',
      ],
      neutral: [
        'others/trumpet',
        'others/trumpet2',
        'others/trumpet3',
      ],
      bad: [
        'words/words2',
        'words/words3',
        'words/words22',
        'words/words23',
      ],
    }],
  },
  // pads without background image and with flying words
  game2: {
    pads: [
      [
        'quick/quick13', 'quick/quick14', 'quick/quick15', 'quick/quick16', 'quick/quick17',
        'quick/quick13', 'quick/quick14', 'quick/quick15', 'quick/quick16', 'quick/quick17',
        'quick/quick13', 'quick/quick14', 'quick/quick15', 'quick/quick16', 'quick/quick17',
        'quick/quick13', 'quick/quick14', 'quick/quick15', 'quick/quick16', 'quick/quick17',
        'quick/quick13', 'quick/quick14', 'quick/quick15', 'quick/quick16', 'quick/quick17',
      ],
      [
        'quick/quick18', 'quick/quick19', 'quick/quick20', 'quick/quick21', 'quick/quick22',
        'quick/quick18', 'quick/quick19', 'quick/quick20', 'quick/quick21', 'quick/quick22',
        'quick/quick18', 'quick/quick19', 'quick/quick20', 'quick/quick21', 'quick/quick22',
        'quick/quick18', 'quick/quick19', 'quick/quick20', 'quick/quick21', 'quick/quick22',
        'quick/quick18', 'quick/quick19', 'quick/quick20', 'quick/quick21', 'quick/quick22',
      ],
    ],
    words: [
      [
        'words/words1',
        'words/words2',
        'words/words3',
        'words/words4',
        'words/words5',
        'words/words6',
      ],
      [
        'words/words7',
        'words/words8',
        'words/words9',
        'words/words10',
        'words/words12',
        'words/words13',
      ],
    ],
  },
  // same as game2 with sliders overlay
  game3: {
    pads: [

    ],
    words: [

    ],
    sliders: [
      [
        'slider/down1',
        'slider/down2',
        'slider/down5',
        'slider/down6',
        'slider/down7',
        'slider/down8',
        'slider/down9',
        'slider/down10',
        'slider/down11',
        'slider/down20',
        'slider/down21',
      ],
    ],
  },
  // second survey :
  // same as first survey
  game4: {
    background: [

    ],
    triggers: [

    ],
  },
  // pads with beethoven background image and one fix word per pad
  game5: {
    pads: [
      // todo
    ],
  },
};

const files = {};

(function browseObject(obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      obj.forEach(item => {
        browseObject(item);
      });
    } else if (obj !== null) {
      Object.keys(obj).forEach(key => {
        browseObject(obj[key]);
      });
    }
  } else if (typeof obj === 'string') {
    files[obj] = `sounds/${obj}.mp3`;
  }
})(samples);

// Object.keys(samples).forEach(game => {
//   const gameSamples = samples[game];
//   Object.keys(gameSamples).forEach(category => {
//     gameSamples[category].forEach(sampleSet => {
//       sampleSet.forEach(sample => {
//         files[sample] = `sounds/${sample}.mp3`;
//       });
//     });
//   });
// });

export {
  samples,
  files,
};