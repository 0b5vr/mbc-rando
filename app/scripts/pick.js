module.exports.pick = ( array ) => {
  const index = Math.floor( Math.random() * array.length );
  return array[ index ];
};

module.exports.pickMultiple = ( array, count ) => {
  const arrayt = array.concat();
  const ret = [];

  for ( let i = 0; i < count; i ++ ) {
    if ( arrayt.length === 0 ) { break; }
    const index = Math.floor( Math.random() * arrayt.length );
    ret.push( arrayt.splice( index, 1 ) );
  }

  return ret;
};
