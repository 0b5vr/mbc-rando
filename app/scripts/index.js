const { MBCRando } = require( './MBCRando/MBCRando' );
const { Bot } = require( './Bot' );

( async () => {
  const mbcRando = new MBCRando();
  await mbcRando.init();

  const bot = new Bot( process.env.MBCRANDO_DISCORD_TOKEN, mbcRando );

  process.on( 'SIGINT', () => {
    bot.destroy().then( () => {
      process.exit();
    } );
  } );
} )();
