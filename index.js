const express = require( 'express' );
const app = express();
app.use( express.json() );

app.post( '/', ( req, res ) => {
    console.log( 'received webhook', req.body );
    res.sendStatus( 200 );
} );

app.listen( 7000, () => console.log( 'Node.js server started on port 7000.' ) );
