const parseDate = date => {
  if (Number.isInteger(date)) return date;

  const [ min, secms ] = date.split(':');
  const [ sec, ms ] = secms.split('.');
  // Number('') returns 0 so the following is OK :
  const res = Number(min) * 60000 + Number(sec) * 1000 + Number(ms.substring(0,3));
  return res;
}

// source : documents from Huihui in /documents folder

////////////////////////////////////////////////////////////////////////////////
////////////////                    PAGE CHANGES                ////////////////
////////////////////////////////////////////////////////////////////////////////

const pageChanges = [
  ///////////////////////////////////////////////////////////////////// SURVEY 1
  {
    date: '0:3.500',
    params: {
      currentPage: 'survey',
      surveyData: 'survey1',
      hideNotificationDelay: 5000,
    },
  },
  /////////////////////////////////////////////////////////////// FLYING WORDS 1
  {
    date: '4:03.500',
    testDate: 5000,
    params: {
      currentPage: 'flyingWords',
      flyingWordsShowSliders: false,
      flyingWordsNegativeWordsPercentage: 50,
    },
  },
  ///////////////////////////////////////////////////////////////////// SURVEY 2
  {
    date: '5:10.600',
    params: {
      currentPage: 'survey',
      surveyData: 'survey2',
    },
  },
  ////////////////////////////////////////////////////// SLIDER (FLYING WORDS 2)
  {
    date: '5:59.100',
    params: {
      currentPage: 'flyingWords',
      flyingWordsShowSliders: true,
    },
  },
  ///////////////////////////////////////////////////////////////////// SURVEY 3
  {
    date: '6:45.880',
    params: {
      currentPage: 'survey',
      surveyData: 'survey3',
    },
  },
  /////////////////////////////////////////////////////////////// FLYING WORDS 3
  {
    date: '8:30.000',
    params: {
      currentPage: 'flyingWords',
      flyingWordsShowSliders: false,
    },
  },
  ////////////////////////////////////////////////////// SLIDER (FLYING WORDS 3)
  {
    date: '9:45.850',
    params: {
      currentPage: 'flyingWords',
      flyingWordsShowSliders: true,
    },
  },
  ///////////////////////////////////////////////////////////////////// SURVEY 4
  {
    date: '10:55.500',
    params: {
      currentPage: 'survey',
      surveyData: 'survey4',
    },
  },
  ////////////////////////////////////////////////////// SLIDER (FLYING WORDS 3)
  {
    date: '11:58.230',
    params: {
      currentPage: 'flyingWords',
      flyingWordsShowSliders: true,
    },
  },
  //////////////////////////////////////////////////////////// PUZZLE 1 (& ONLY)
  {
    date: '12:21.176',
    params: {
      currentPage: 'puzzle',
    },
  },
  //////////////////////////////////////////////////////////////////////// SCORE
  {
    date: '13:31.750',
    params: {
      currentPage: 'end',
    },
  },
  //////////////////////////////////////////////////////////////////// THANK YOU
  {
    date: '14:15.000',
    params: {
      currentPage: 'thankyou',
      notificationHideDelay: 10000,
    },
  },
  // special mandatory end item allowing to loop over immediately (or stop)
  {
    date: '15:44.0000', // endDate
    params: {
      currentPage: 'loader',
    },
  },
];

////////////////////////////////////////////////////////////////////////////////
////////////////                     MESSAGES                   ////////////////
////////////////////////////////////////////////////////////////////////////////

const messages = [
  ////////// MESSAGE 1
  {
    date: '0:26.1648',
    params: {
      notificationMessage: 'Quotation: The first chord of symphony Nr.3, but in E major, semitone higher than the original',
    },
  },  
  {
    date: '0:45.1011',
    params: {
      notificationMessage: 'I tried to find an association between Beethoven and my piece',
    },
  },
  {
    date: '1:17.4741',
    params: {
      notificationMessage: 'Another quotation, the timpani seems to be the vor beat of Beethoven\'s chord, which is the beginning of symphony Nr.1, dominica -> tonica, but here we hear only the dominica',
    },
  },
  {
    date: '1:32.6599',
    params: {
      notificationMessage: 'Here I merge Beethoven and my chords, they merge quite well',
    },
  },
  {
    date: '1:59.0233',
    params: {
      notificationMessage: 'Again symphony Nr.1',
    },
  },
  {
    date: '2:17.4945',
    params: {
      notificationMessage: 'resonance -> fragments',
    },
  },
  // {
  //   date: '2:56.3477',
  //   params: {
  //     notificationMessage: 'Quotation of symphony Nr.3 plus a bit jazzy',
  //   },
  // },
  {
    date: '3:40.2644',
    params: {
      notificationMessage: 'A good tonica',
    },
  },
  {
    date: '3:56.0296',
    params: {
      notificationMessage: 'Tuning ?',
    },
  },
  {
    date: '4:07.8705',
    params: {
      notificationMessage: 'Which symphony was it? If you can\'t remember, then you will see the answer later, something Wagner talked about.',
    },
  },
  ////////// MESSAGE 11
  {
    date: '4:14.5193',
    params: {
      notificationMessage: 'E-Guitar is a great instrument, Beethoven might like it.',
    },
  },
  {
    date: '4:28.2381',
    params: {
      notificationMessage: 'I think you must know this famous Motiv from Beethoven\'s symphony Nr.9',
    },
  },
  {
    date: '4:39.2452',
    params: {
      notificationMessage: 'So now my piece is also in D major.',
    },
  },
  {
    date: '5:02.4012',
    params: {
      notificationMessage: 'A virtuose timpany passage, I think Beethoven may like it.',
    },
  },
  {
    date: '5:25.1312',
    params: {
      notificationMessage: 'We also have drum set, that Beethoven didn\'t know.',
    },
  },
  {
    date: '5:52.9028',
    params: {
      notificationMessage: 'Here I have tried to write a descending motive.',
    },
  },
  {
    date: '6:09.3158',
    params: {
      notificationMessage: 'I repeat it and louder, with some bouncing delay.',
    },
  },
  {
    date: '6:29.6334',
    params: {
      notificationMessage: 'Again but it becomes a complex polyphony.',
    },
  },
  {
    date: '6:46.8602',
    params: {
      notificationMessage: 'This is the development passage.',
    },
  },
  {
    date: '6:59.2861',
    params: {
      notificationMessage: 'An explosion of all the instruments\' sounds.',
    },
  },
  ////////// MESSAGE 21
  {
    date: '7:15.6344',
    params: {
      notificationMessage: 'C major?',
    },
  },
  {
    date: '7:30.9524',
    params: {
      notificationMessage: 'Dominica?',
    },
  },
  {
    date: '7:46.1039',
    params: {
      notificationMessage: 'That\'s the response.',
    },
  },
  {
    date: '7:51.8265',
    params: {
      notificationMessage: 'My arpeggios.',
    },
  },
  {
    date: '8:00.2382',
    params: {
      notificationMessage: 'The famous C major chords of Sonata Nr.21, with which Mauricio Kagel has made a funny movie ("dans la tête de Ludwig van" in 1970), to celebrate Beethoven\'s 200th anniversary. Quotated quotation, complex.',
    },
  },
  // {
  //   date: '8:30.7876',
  //   params: {
  //     notificationMessage: 'Here are some of my arpeggios mixing with Beethoven chords. Up and down, up and down.',
  //   },
  // },
  {
    date: '9:03.8461',
    params: {
      notificationMessage: 'Victory and heroic chords, symbolic of Beethoven\'s symphonies.',
    },
  },
  {
    date: '9:31.6373',
    params: {
      notificationMessage: 'Here is my response, accelerated chords.',
    },
  },
  {
    date: '9:51.4216',
    params: {
      notificationMessage: 'Dramatic intermezzo, seems something is going to happen.',
    },
  },
  {
    date: '10:31.7384',
    params: {
      notificationMessage: `
        Wagner called Beethoven's Seventh Symphony "the apotheosis of dance",
        I do agree, rhythm is also very important for me.
      `,
    },
  },
  ////////// MESSAGE 31
  {
    date: '10:56.2400',
    params: {
      notificationMessage: 'But also melody and timber.',
    },
  },
  {
    date: '11:25.5338',
    params: {
      notificationMessage: `
        And some loops, the most popular contemporary composition technique.
      `,
    },
  },
  {
    date: '11:55.8411',
    params: {
      notificationMessage: 'Unison, sounds like I agree.',
    },
  },
  {
    date: '12:22.0356',
    params: {
      notificationMessage: 'Mysterious sound?',
    },
  },
  {
    date: '12:41.1104',
    params: {
      notificationMessage: `
        The music is still continuing and growing,
        like the pianist's hair in Kagel's movie.
      `,
    },
  },
  {
    date: '13:26.1949',
    params: {
      notificationMessage: 'What is the next?',
    },
  },
  {
    date: '13:42.3595',
    params: {
      notificationMessage: 'A jazzy passage.',
    },
  },
  {
    date: '14:08.8523',
    params: {
      notificationMessage: 'I hope Beethoven will like it, hmmm, not sure...',
    },
  },
  {
    date: '14:18.1209',
    params: {
      notificationMessage: 'All fine? Hope you haven\'t been overcharged',
    },
  },
  {
    date: '14:47.8637',
    params: {
      notificationMessage: `
        <div class="not-a-subtitle">
          Thanks for your participation and congratulations to
          the musicians, they played so wounderfully !
          Don't hesitate to listen to the piece again, there are many different
          ways to access, or... even only listen to the music.
        </div>
      `,
    },
  },
  {
    date: '15:14.1541',
    params: {
      notificationMessage: `
        <div class="not-a-subtitle">
          Why I do this? because music can also be for fun :)
          Fun but fun and serious!
        </div>
      `,
    },
  },
  {
    date: '15:24.1541',
    params: {
      notificationMessage: `
        <div class="not-a-subtitle">
          Thanks to Jan Termath, Consord ensemble and Klangzeit Festival for the
          commission with supports of BTHVN2020 and Simens Foundation.
        </div>
      `,
    },
  },
  {
    date: '15:34.1541',
    // date: '0:03.500',
    params: {
      notificationMessage: `
        <div class="not-a-subtitle">
          web app development <br>
          <a href="https://josephlarralde.fr"> Joseph Larralde </a> <br>
          &nbsp; <br>
          composition & conception <br>
          <a href="https://huihuicheng.com/"> Huihui Cheng </a> <br>
          &nbsp; <br>
          studio recording version <br>
          Concord ensemble <br>
          2020
        </div>
      `,
    },
  },
];

////////////////////////////////////////////////////////////////////////////////
////////////////                     SAMPLES                    ////////////////
////////////////////////////////////////////////////////////////////////////////

const sampleSetChanges = [
  {
    date: '0:0.000',
    params: { surveySampleSet: '1' }
  },
  {
    date: '0:22.900',
    params: { surveySampleSet: '2' },
  },
  {
    date: '0:33.500',
    params: { surveySampleSet: '3' },
  },
  {
    date: '0:45.1011',
    params: { surveySampleSet: '4' },
  },
  {
    date: '0:50.1011',
    params: { surveySampleSet: '5' },
  },
  {
    date: '0:55.150',
    params: { surveySampleSet: '4' },
  },
  {
    date: '1:00.880',
    params: { surveySampleSet: '6' },
  },
  {
    date: '1:03.970',
    params: { surveySampleSet: '7' },
  },
  {
    date: '1:06.617',
    params: { surveySampleSet: '6' },
  },
  {
    date: '1:13.676',
    params: { surveySampleSet: '7' },
  },
  {
    date: '1:22.941',
    params: { surveySampleSet: '8' },
  },
  {
    date: '1:29.029',
    params: { surveySampleSet: '9' },
  },
  {
    date: '1:36.180',
    params: { surveySampleSet: '12' },
  },
  {
    date: '1:56.470',
    params: { surveySampleSet: '13' },
  },
  {
    date: '2:00.000',
    params: { surveySampleSet: '15' },
  },
  {
    date: '2:15.000',
    params: { surveySampleSet: '14' },
  },
  {
    date: '2:17.640',
    params: { surveySampleSet: '15' },
  },
  {
    date: '2:30.880',
    params: { surveySampleSet: '17' },
  },
  {
    date: '2:35.294',
    params: { surveySampleSet: '18' },
  },
  {
    date: '2:45.880',
    params: { surveySampleSet: '20' },
  },
  {
    date: '2:51.175',
    params: { surveySampleSet: '21' },
  },
  {
    date: '3:01.3477',
    params: { surveySampleSet: '20' },
  },
  {
    date: '3:27.350',
    params: { surveySampleSet: '21' },
  },
  {
    date: '3:31.320',
    params: { surveySampleSet: '24' },
  },
  {
    date: '3:32.647',
    params: { surveySampleSet: '22' },
  },
  {
    date: '3:45.2644',
    params: { surveySampleSet: '24' },
  },
  {
    date: '3:49.900',
    params: { surveySampleSet: '23' },
  },
  {
    date: '3:55.588',
    params: { surveySampleSet: '22' },
  },
  {
    date: '4:05.8705',
    params: { surveySampleSet: '25' },
  },
  {
    date: '4:18.5193',
    params: { surveySampleSet: '26' },
  },
  {
    date: '4:33.2381',
    params: { surveySampleSet: '27' },
  },
  {
    date: '4:44.2452',
    params: { surveySampleSet: '25' },
  },
  {
    date: '4:57.4012',
    params: { surveySampleSet: '28' },
  },
  {
    date: '5:10.590',
    params: { surveySampleSet: '30' },
  },
  {
    date: '5:21.200',
    params: { surveySampleSet: '29' },
  },
  {
    date: '5:44.118',
    params: { surveySampleSet: '31' },
  },
  {
    date: '6:00.000',
    params: { surveySampleSet: '32' },
  },
  {
    date: '6:08.820',
    params: { surveySampleSet: '37' },
  },
  {
    date: '6:45.880',
    params: { surveySampleSet: '35' },
  },
  {
    date: '7:56.8265',
    params: { surveySampleSet: '33' },
  },
  {
    date: '8:09.150',
    params: { surveySampleSet: '2' },
  },
  {
    date: '8:12.350',
    params: { surveySampleSet: '33' },
  },
  {
    date: '8:15.000',
    params: { surveySampleSet: '32' },
  },
  {
    date: '8:30.7876',
    params: { surveySampleSet: '34' },
  },
  {
    date: '9:45.850',
    params: { surveySampleSet: '36' },
  },
  {
    date: '11:03.520',
    params: { surveySampleSet: '37' },
  },
  {
    date: '11:31.762',
    params: { surveySampleSet: '38' },
  },
  {
    date: '11:58.234',
    params: { surveySampleSet: '39' },
  },
  {
    date: '12:12.352',
    params: { surveySampleSet: '40' },
  },
  {
    date: '12:49.410',
    params: { surveySampleSet: '41' },
  },
];

// export all event arrays merged and sorted by date

const timeline = pageChanges.concat(messages).concat(sampleSetChanges);

timeline.forEach(e => {
  e.date = parseDate(e.date);
});

export default timeline.sort((a, b) => {
  return a.date < b.date ? -1 : 1;
});
