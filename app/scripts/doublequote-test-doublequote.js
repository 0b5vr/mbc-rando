const { MBCRando } = require( './MBCRando/MBCRando' );

( async () => {
  const mbcRando = new MBCRando();
  await mbcRando.init();

  console.log( await mbcRando.interpret( 'pick a song from tier 2 - 4' ) );
} )();
