const samples = {
  survey1: {
    answers: [{
      // answers sample set 1
      good: [
        'quick/quick26',
      ],
      neutral: [
        'quick/quick7',
        // 'others/new scene2',
        // 'others/new scene5',
        // 'others/trumpet',
        // 'others/trumpet2',
        // 'others/trumpet3',
      ],
      bad: [
        // 'words/words2',
        'words/words3',
      ],
    },
    {
      // answers sample set 2
      good: [
        'words/words23',
      ],
      neutral: [
        'words/words22',
        // 'quick/quick7',
        // 'others/trumpet',
        // 'others/trumpet2',
        // 'others/trumpet3',
      ],
      bad: [
        'words/words2',
        // 'words/words3',
        // 'words/words22',
      ],
    }],
  },
  // pads without background image and with flying words
  flyingWords1: {
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
    granular: [
      [
        // 'slider/down1',
        // 'slider/down2',
        // 'slider/down5',
        // 'slider/down6',
        // 'slider/down7',
        // 'slider/down8',
        // 'slider/down9',
        // 'slider/down10',
        // 'slider/down11',
        // 'slider/down20',
        // 'slider/down21',      
      ],
    ],
  },
  // same as flyingWords1 with sliders overlay
  flyingWords2: {
    pads: [
      [],
    ],
    granular: [
      [
        'slider/granular-fw-2-01',
        'slider/granular-fw-2-02',
      ],
    ],
  },
  survey2: {
    answers: [{
      good: [
        'quick/quick26',
      ],
      neutral: [
        'quick/quick7',
      ],
      bad: [
        'words/words3',
      ],
    },
    {
      good: [
        'words/words23',
      ],
      neutral: [
        'words/words22',
      ],
      bad: [
        'words/words2',
      ],
    }],
  },
  // pads with beethoven background image and one fix word per pad
  puzzle1: {
    pads: [
      [],
    ],
  },
  flyingWords3: {
    pads: [
      [],
    ],
    granular: [
      [
        'slider/granular-fw-3-01',
        'slider/granular-fw-3-02',
      ],
    ],    
  },
  survey3: {
    answers: [{
      good: [
        'quick/quick26',
      ],
      neutral: [
        'quick/quick7',
      ],
      bad: [
        'words/words3',
      ],
    },
    {
      good: [
        'words/words23',
      ],
      neutral: [
        'words/words22',
      ],
      bad: [
        'words/words2',
      ],
    }],
  },
  end: {

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

export {
  samples,
  files,
};