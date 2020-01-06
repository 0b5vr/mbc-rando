const path = require( 'path' );
const { NlpManager } = require( 'node-nlp' );
const { documents } = require( './documents' );
const { Intent } = require( './Intent' );
const { pick } = require( '../pick' );
const entities = require( '../../entities.json' );

const regexTierRange = /tier\s*(\d+(.\d+)?)\s*(-|~|to)\s*(tier\s*)?(\d+(.\d+)?)/;

module.exports.MBCRando = class {
  constructor() {
    this.__nlp = new NlpManager( { languages: [ 'en' ], nlu: { log: false } } );

    this.__lastRes = {};
  }

  async init() {
    // -- documents --------------------------------------------------------------------------------
    documents.forEach( ( { utter, intent } ) => {
      this.__nlp.addDocument( 'en', utter, intent );
    } );

    // -- entities ---------------------------------------------------------------------------------
    entities.serieses.forEach( ( series ) => {
      this.__nlp.addNamedEntityText( 'series', series.name, [ 'en' ], [ series.name, ...( series.aliases || [] ) ] );
    } );

    entities.packs.forEach( ( pack ) => {
      this.__nlp.addNamedEntityText( 'pack', pack.name, [ 'en' ], [ pack.name, ...( pack.aliases || [] ) ] );
    } );

    entities.songs.forEach( ( song ) => {
      this.__nlp.addNamedEntityText( 'song', song.name, [ 'en' ], [ song.name, ...( song.aliases || [] ) ] );
    } );

    entities.authors.forEach( ( author ) => {
      this.__nlp.addNamedEntityText( 'author', author.name, [ 'en' ], [ author.name, ...( author.aliases || [] ) ] );
    } );

    this.__nlp.addRegexEntity( 'tierRange', 'en', regexTierRange );

    // -- train ------------------------------------------------------------------------------------
    await this.__nlp.train();
  }

  async interpret( message, id ) {
    const res = await this.__nlp.process( 'en', message );
    return this.__processResult( res, id );
  }

  __pickASongFromList( list ) {
    const song = pick( list );
    return song
      ? `**${song.name}** - ${song.pack}`
      : 'Sorry, I could not find such a song.';
  }

  __processResult( res, id ) {
    if (
      id != null &&
      res.intent !== Intent.Reroll &&
      res.intent !== Intent.ShowLastIntent
    ) {
      this.__lastRes[ id ] = res;
    }

    if ( res.intent === Intent.Greetings ) {
      return 'Hi';
    } else if ( res.intent === Intent.Help ) {
      return `I can pick a song from MBC series for you!
try:
\`\`\`
@MBCRando Pick a song
@MBCRando Pick from tier 2
@MBCRando Pick from MBC3
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
      const seriesName = res.entities.find( ( ent ) => ent.entity === 'series' ).option;
      const series = entities.serieses.find( ( series ) => series.name === seriesName );
      const songs = entities.songs.filter( ( song ) => series.packs.includes( song.pack ) );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromPack ) {
      const pack = res.entities.find( ( ent ) => ent.entity === 'pack' ).option;
      const songs = entities.songs.filter( ( song ) => song.pack === pack );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromAuthor ) {
      const author = res.entities.find( ( ent ) => ent.entity === 'author' ).option;
      const songs = entities.songs.filter( ( song ) => (
        song.authors ? song.authors.includes( author ) : ( song.author === author )
      ) );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromTier ) {
      const tier = res.entities.find( ( ent ) => ent.entity === 'number' ).resolution.value;
      const songs = entities.songs.filter( ( song ) => song.tier === tier );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromPackTier ) {
      const pack = res.entities.find( ( ent ) => ent.entity === 'pack' ).option;
      const tier = parseFloat( res.entities.find( ( ent ) => ent.entity === 'number' ).utteranceText );
      const songs = entities.songs.filter( ( song ) => song.pack === pack && song.tier === tier );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromTierRange ) {
      const tierRange = res.entities.find( ( ent ) => ent.entity === 'tierRange' ).utteranceText;
      const match = tierRange.match( regexTierRange );
      const tierFrom = parseFloat( match[ 1 ] );
      const tierTo = parseFloat( match[ 5 ] );
      const songs = entities.songs.filter( ( song ) => (
        ( tierFrom <= song.tier ) && ( song.tier <= tierTo )
      ) );
      console.log( res.entities );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromTierAbove ) {
      const tier = res.entities.find( ( ent ) => ent.entity === 'number' ).resolution.value;
      const songs = entities.songs.filter( ( song ) => song.tier >= tier );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.PickASongFromTierBelow ) {
      const tier = res.entities.find( ( ent ) => ent.entity === 'number' ).resolution.value;
      const songs = entities.songs.filter( ( song ) => song.tier <= tier );
      return this.__pickASongFromList( songs );

    } else if ( res.intent === Intent.H ) {
      return {
        file: {
          attachment: path.resolve( __dirname, '../../assets/h.mp4' ),
          name: 'h.mp4'
        }
      };

    } else if ( res.intent === Intent.Jazz ) {
      return {
        file: {
          attachment: path.resolve( __dirname, '../../assets/jazz.jpg' ),
          name: 'jazz.jpg'
        }
      };

    } else {
      return 'what';

    }
  }
};
