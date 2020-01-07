const { Intent } = require( './Intent' );

module.exports.documents = [
  { utter: 'hello', intent: Intent.Greetings },
  { utter: 'hi', intent: Intent.Greetings },

  { utter: 'help', intent: Intent.Help },
  { utter: 'How do I use', intent: Intent.Help },
  { utter: 'What could you do', intent: Intent.Help },
  { utter: 'How could you help me', intent: Intent.Help },
  { utter: 'What are you', intent: Intent.Help },

  { utter: 'Reroll', intent: Intent.Reroll },
  { utter: 'Do this again', intent: Intent.Reroll },
  { utter: 'Pick again', intent: Intent.Reroll },

  { utter: 'Wait what', intent: Intent.ShowLastIntent },
  { utter: 'What was your intention', intent: Intent.ShowLastIntent },
  { utter: 'How do you interpret the last message', intent: Intent.ShowLastIntent },

  { utter: 'dumpIntents', intent: Intent.DumpIntents },
  { utter: 'Show me what you can do for now', intent: Intent.DumpIntents },
  { utter: 'What is your feature', intent: Intent.DumpIntents },

  { utter: 'Pick', intent: Intent.PickASong },
  { utter: 'Pick a song', intent: Intent.PickASong },
  { utter: 'Pick a song randomly', intent: Intent.PickASong },
  { utter: 'Choose a song', intent: Intent.PickASong },
  { utter: 'Select a song randomly', intent: Intent.PickASong },

  { utter: 'Pick a song from entire %series%', intent: Intent.PickASongFromSeries },
  { utter: 'Pick a song from %series% series', intent: Intent.PickASongFromSeries },
  { utter: 'Pick a song from %series% franchise', intent: Intent.PickASongFromSeries },

  { utter: 'Pick a song from tier %number%', intent: Intent.PickASongFromTier },
  { utter: 'Pick a tier %number% song', intent: Intent.PickASongFromTier },

  { utter: 'Pick a song from tier %number% or above', intent: Intent.PickASongFromTierAbove },
  { utter: 'Pick a song from tier %number% or higher', intent: Intent.PickASongFromTierAbove },
  { utter: 'Pick a song from tier %number% or larger', intent: Intent.PickASongFromTierAbove },

  { utter: 'Pick a song from tier %number% or below', intent: Intent.PickASongFromTierBelow },
  { utter: 'Pick a song from tier %number% or lower', intent: Intent.PickASongFromTierBelow },
  { utter: 'Pick a song from tier %number% or smaller', intent: Intent.PickASongFromTierBelow },

  { utter: 'Pick a song from %tierRange%', intent: Intent.PickASongFromTierRange },
  { utter: 'Pick a song in the range of %tierRange%', intent: Intent.PickASongFromTierRange },
  { utter: 'Pick a %tierRange% song', intent: Intent.PickASongFromTierRange },

  { utter: 'Pick a song from MBC', intent: Intent.PickASongFromPack }, // uhhhhhh
  { utter: 'Pick a song from %pack%', intent: Intent.PickASongFromPack },
  { utter: 'Pick a song by %pack%', intent: Intent.PickASongFromPack },
  { utter: 'Pick a song of %pack%', intent: Intent.PickASongFromPack },

  { utter: 'Pick a song from %pack% tier %number%', intent: Intent.PickASongFromPackTier },
  { utter: 'Pick a song of %pack% tier %number%', intent: Intent.PickASongFromPackTier },
  { utter: 'Pick a song that is %pack% tier %number%', intent: Intent.PickASongFromPackTier },
  { utter: 'Pick a tier %number% song from %pack%', intent: Intent.PickASongFromPackTier },
  { utter: 'Pick a %pack% tier %number%', intent: Intent.PickASongFromPackTier },

  { utter: 'Pick a song from %author%', intent: Intent.PickASongFromAuthor },
  { utter: 'Pick a song by %author%', intent: Intent.PickASongFromAuthor },
  { utter: 'Pick a song of %author%', intent: Intent.PickASongFromAuthor },

  { utter: 'Source', intent: Intent.ShowSource },
  { utter: 'Is your source code available somewhere?', intent: Intent.ShowSource },
  { utter: 'Show me your source code', intent: Intent.ShowSource },
  { utter: 'May I see your source code', intent: Intent.ShowSource },
  { utter: 'Show me your implementation', intent: Intent.ShowSource },
  { utter: 'May I see your implementation', intent: Intent.ShowSource },

  { utter: 'h', intent: Intent.H },

  { utter: 'jazz', intent: Intent.Jazz },
  { utter: 'Jazz for your Soul', intent: Intent.Jazz },
  { utter: 'jfys', intent: Intent.Jazz },
];
