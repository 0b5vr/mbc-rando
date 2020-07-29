const Discord = require( 'discord.js' );
const { pick } = require( './pick' );
const entities = require( '../entities.json' );

module.exports.Bot = class {
  constructor( token, mbcRando ) {
    this.__mbcRando = mbcRando;

    this.__client = new Discord.Client();

    this.__client.on( 'ready', () => {
      console.log( '✔ Discord bot' );

      this.__setPresence();
      this.__intervalID = setInterval(
        () => { this.__setPresence(); },
        1000 * 60 * 5
      );
    } );

    this.__client.on( 'message', ( message ) => {
      this.__handleMessage( message );
    } );

    this.__client.login( token );
  }

  destroy() {
    if ( this.__intervalID != null ) {
      clearInterval( this.__intervalID );
    }

    this.__client.destroy();
  }

  __setPresence() {
    const song = pick( entities.songs );

    this.__client.user.setPresence( {
      game: { name: `${ song.name } - ${ song.pack }` },
      status: 'online'
    } );
  }

  async __handleMessage( message ) {
    const mentioned = message.mentions.users.some( ( u ) => u.id === this.__client.user.id );
    if ( !mentioned ) { return; }

    const str = message.content.replace( /\s*<@\d+?>\s*/m, '' );
    console.log( `<- ${ message.author.tag }: ${ str }` );

    let res;
    try {
      res = await this.__mbcRando.interpret( str, message.channel.toString() );
    } catch ( e ) {
      console.error( e );
      res = 'Something went wrong!';
    }

    message.channel.send( res );
    console.log( `-> ${ res }` );
  }
};
