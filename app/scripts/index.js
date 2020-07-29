const { MBCRando } = require( './MBCRando/MBCRando' );
const { Bot } = require( './Bot' );

( async () => {
  const mbcRando = new MBCRando();
  await mbcRando.init();

  const bot = new Bot(  'NjYzNjM5Mzk2MzgxMDk3OTg2.XhLcgw.1CR2Y56Wzuz0RdYS3CuqJwLRaBI', mbcRando );

  process.on( 'SIGINT', () => {
    console.info( 'Exiting...' );
    bot.destroy();
    process.exit();
  } );

  process.on( 'SIGTERM', () => {
    console.info( 'Exiting...' );
    bot.destroy();
    process.exit();
  } );
} )();
