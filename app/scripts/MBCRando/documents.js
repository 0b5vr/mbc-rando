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

  { utter: 'Pick a song from entire MBC series', intent: Intent.PickASongFromSeries },
  { utter: 'Pick a song from MBC series', intent: Intent.PickASongFromSeries },

  { utter: 'Tier 1', intent: Intent.PickASongFromTier },
  { utter: 'tier 2', intent: Intent.PickASongFromTier },
  { utter: 'tier4', intent: Intent.PickASongFromTier },
  { utter: 'Pick a song from tier3', intent: Intent.PickASongFromTier },
  { utter: 'Pick a tier 1.5 song', intent: Intent.PickASongFromTier },

  { utter: 'tier 2 or above', intent: Intent.PickASongFromTierAbove },
  { utter: 'Pick a song from tier3 or above', intent: Intent.PickASongFromTierAbove },
  { utter: 'Pick a song from tier 1 or higher', intent: Intent.PickASongFromTierAbove },
  { utter: 'Pick a song from tier 1.5 or larger', intent: Intent.PickASongFromTierAbove },

  { utter: 'tier 2 or below', intent: Intent.PickASongFromTierBelow },
  { utter: 'Pick a song from tier 3 or below', intent: Intent.PickASongFromTierBelow },
  { utter: 'Pick a song from tier1.5 or lower', intent: Intent.PickASongFromTierBelow },
  { utter: 'Pick a song from tier4 or smaller', intent: Intent.PickASongFromTierBelow },

  { utter: 'tier2-4', intent: Intent.PickASongFromTierRange },
  { utter: 'Pick a song from tier1-tier3', intent: Intent.PickASongFromTierRange },
  { utter: 'Pick a song in the range of tier1-2', intent: Intent.PickASongFromTierRange },
  { utter: 'Pick a tier 3-tier 4 song', intent: Intent.PickASongFromTierRange },

  { utter: 'MBC', intent: Intent.PickASongFromPack },
  { utter: 'MBC2', intent: Intent.PickASongFromPack },
  { utter: 'MBC3', intent: Intent.PickASongFromPack },
  { utter: 'Pick a song from MBC', intent: Intent.PickASongFromPack }, // uhhhhhh
  { utter: 'Pick a song from Mods Boot Camp 3', intent: Intent.PickASongFromPack },
  { utter: 'Pick a song by MBC2', intent: Intent.PickASongFromPack },
  { utter: 'Pick a song of MBC1', intent: Intent.PickASongFromPack },

  { utter: 'MBC2 Tier 4', intent: Intent.PickASongFromPackTier },
  { utter: 'Pick a song from MBC3 Tier 1.5', intent: Intent.PickASongFromPackTier },
  { utter: 'Pick a song of MBC1 Tier 1', intent: Intent.PickASongFromPackTier },
  { utter: 'Pick a song that is Tier 2 of MBC3', intent: Intent.PickASongFromPackTier },
  { utter: 'Pick a tier3 song of MBC1', intent: Intent.PickASongFromPackTier },
  { utter: 'Pick a MBC3 Tier4', intent: Intent.PickASongFromPackTier },

  { utter: 'TaroNuke', intent: Intent.PickASongFromAuthor },
  { utter: 'Condor', intent: Intent.PickASongFromAuthor },
  { utter: 'Pick a song from WinDEU', intent: Intent.PickASongFromAuthor },
  { utter: 'Pick a song by Hal', intent: Intent.PickASongFromAuthor },
  { utter: 'Pick a song by Taro', intent: Intent.PickASongFromAuthor },
  { utter: 'Pick a song of Condor', intent: Intent.PickASongFromAuthor },

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
