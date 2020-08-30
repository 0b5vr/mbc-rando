const path = require( 'path' );
const { containerBootstrap } = require( '@nlpjs/core' );
const { Nlp } = require( '@nlpjs/nlp' );
const { documents } = require( './documents' );
const { Intent } = require( './Intent' );
const { pick } = require( '../pick' );
const entities = require( '../../entities.json' );

const regexTier = /tier\s*(\d+(.\d+)?)/i;
const regexTierRange = /tier\s*(\d+(.\d+)?)\s*(-|~|to)\s*(tier\s*)?(\d+(.\d+)?)/i;

function extractTierFromRegexTier( text ) {
  const match = text.match( regexTier );
  return parseFloat( match[ 1 ] );
}

function extractTiersFromRegexTierRange( text ) {
  const match = text.match( regexTierRange );
  const tierFrom = parseFloat( match[ 1 ] );
  const tierTo = parseFloat( match[ 5 ] );
  return [ tierFrom, tierTo ];
}

module.exports.MBCRando = class {
  constructor() {
    this.__lastRes = {};
  }

  async init() {
    const container = containerBootstrap();
    container.use( Nlp );

    this.__nlp = container.get( 'nlp' );
    this.__nlp.settings.calculateSentiment = false;
    this.__nlp.settings.autoSave = false;
    this.__nlp.addLanguage( 'en' );

    // -- entities ---------------------------------------------------------------------------------
    entities.serieses.forEach( ( series ) => {
      this.__nlp.addNerRuleOptionTexts(
        'en',
        'series',
        series.name,
        [ series.name, ...( series.aliases || [] ) ]
      );
    } );

    entities.packs.forEach( ( pack ) => {
      this.__nlp.addNerRuleOptionTexts(
        'en',
        'pack',
        pack.name,
        [ pack.name, ...( pack.aliases || [] ) ]
      );
    } );

    entities.songs.forEach( ( song ) => {
      this.__nlp.addNerRuleOptionTexts(
        'en',
        'song',
        song.name,
        [ song.name, ...( song.aliases || [] ) ]
      );
    } );

    entities.authors.forEach( ( author ) => {
      this.__nlp.addNerRuleOptionTexts(
        'en',
        'author',
        author.name,
        [ author.name, ...( author.aliases || [] ) ]
      );
    } );

    this.__nlp.addNerRegexRule( 'en', 'tier', regexTier );
    this.__nlp.addNerRegexRule( 'en', 'tierRange', regexTierRange );

    // -- documents --------------------------------------------------------------------------------
    documents.forEach( ( { utter, intent } ) => {
      this.__nlp.addDocument( 'en', utter, intent );
    } );

    // -- train ------------------------------------------------------------------------------------
    await this.__nlp.train();
  }

  async interpret( message, id ) {
    const res = await this.__nlp.process( 'en', message );
    return await this.__processResult( res, id );
  }

  __pickASongFromList( list ) {
    const song = pick( list );
    return song
      ? `**${song.name}** - ${song.pack}`
      : 'Sorry, I could not find such a song.';
  }

  async __processResult( res, id ) {
    if (
      id != null &&
      res.intent !== Intent.Reroll &&
      res.intent !== Intent.ShowLastIntent
    ) {
      this.__lastRes[ id ] = res;
    }

    const extracted = ( await this.__nlp.extractEntities( 'en', res.utterance ) ).entities;

    if ( res.intent === Intent.Greetings ) {
      return 'Hi';

    } else if ( res.intent === Intent.Help ) {
      return `I can pick a song from MBC series for you!
try:
\`\`\`
@mbc-rando Pick a song
@mbc-rando Pick from tier 2
@mbc-rando Pick from MBC3
\`\`\``;

    } else if ( res.intent === Intent.ShowLastIntent ) {
      if ( this.__lastRes[ id ] ) {
        return `I interpreted the last message was intended to be \`${ this.__lastRes[ id ].intent }\`.`;
      } else {
        return 'I\'m sorry but I don\'t remember what you\'ve said earlier...';
      }

    } else if ( res.intent === Intent.DumpIntents ) {
      return 'Intents: `' + Object.values( Intent ).join( '`, `' ) + '`';

    } else if ( res.intent === Intent.Reroll ) {
      if ( this.__lastRes[ id ] ) {
        return this.__processResult( this.__lastRes[ id ] );
      } else {
        return 'I\'m sorry but I don\'t remember what you\'ve said earlier...';
      }

    } else if ( res.intent === Intent.PickASong ) {
      return this.__pickASongFromList( entities.songs );

    } else if ( res.intent === Intent.PickASongFromSeries ) {
      const seriesName = extracted.find( ( ent ) => ent.entity === 'series' ).option;
      const series = entities.serieses.find( ( series ) => series.name === seriesName );
      const songs = entities.songs.filter( ( song ) => series.packs.includes( song.pack ) );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromPack ) {
      const pack = extracted.find( ( ent ) => ent.entity === 'pack' ).option;
      const songs = entities.songs.filter( ( song ) => song.pack === pack );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromAuthor ) {
      const author = extracted.find( ( ent ) => ent.entity === 'author' ).option;
      const songs = entities.songs.filter( ( song ) => (
        song.authors ? song.authors.includes( author ) : ( song.author === author )
      ) );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromTier ) {
      const tier = extractTierFromRegexTier(
        extracted.find( ( ent ) => ent.entity === 'tier' ).utteranceText
      );
      const songs = entities.songs.filter( ( song ) => song.tier === tier );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromPackTier ) {
      const pack = extracted.find( ( ent ) => ent.entity === 'pack' ).option;
      const tier = parseFloat( extracted.find( ( ent ) => ent.entity === 'tier' ).utteranceText );
      const songs = entities.songs.filter( ( song ) => song.pack === pack && song.tier === tier );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromTierRange ) {
      const [ tierFrom, tierTo ] = extractTiersFromRegexTierRange(
        extracted.find( ( ent ) => ent.entity === 'tierRange' ).utteranceText
      );
      const songs = entities.songs.filter( ( song ) => (
        ( tierFrom <= song.tier ) && ( song.tier <= tierTo )
      ) );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromTierAbove ) {
      const tier = extractTierFromRegexTier(
        extracted.find( ( ent ) => ent.entity === 'tier' ).utteranceText
      );
      const songs = entities.songs.filter( ( song ) => song.tier >= tier );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromTierBelow ) {
      const tier = extractTierFromRegexTier(
        extracted.find( ( ent ) => ent.entity === 'tier' ).utteranceText
      );
      const songs = entities.songs.filter( ( song ) => song.tier <= tier );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.ShowSource ) {
      return `Here is my source code:
https://github.com/FMS-Cat/mbc-rando`;

    } else if ( res.intent === Intent.H ) {
      return {
        files: [ {
          attachment: (
            Math.random() < 0.00048828125
              ? path.resolve( __dirname, '../../assets/k.mp4' )
              : path.resolve( __dirname, '../../assets/h.mp4' )
          ),
          name: 'h.mp4'
        } ]
      };

    } else if ( res.intent === Intent.Jazz ) {
      return {
        files: [ {
          attachment: path.resolve( __dirname, '../../assets/jazz.jpg' ),
          name: 'jazz.jpg'
        } ]
      };

    } else {
      return 'what';

    }
  }
};
