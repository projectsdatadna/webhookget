const crypto = require( 'crypto' );

const express = require( 'express' );
const app = express();

const API_SECRET = 'secret';

app.use( express.json( { verify: ( req, res, buffer ) => { req.rawBody = buffer; } } ) );

app.post( '/', ( req, res ) => {
    const signature = _generateSignature( req.method, req.url, req.headers[ 'x-cs-timestamp' ], req.rawBody );

    if ( signature !== req.headers[ 'x-cs-signature' ] ) {
        return res.sendStatus( 401 );
    }

    console.log( 'received webhook', req.body );
    res.sendStatus( 200 );
} );

app.listen( 7000, () => console.log( 'Node.js server started on port 7000.' ) );

function _generateSignature( method, url, timestamp, body ) {
    const hmac = crypto.createHmac( 'SHA256', API_SECRET );

    hmac.update( `${ method.toUpperCase() }${ url }${ timestamp }` );

    if ( body ) {
        hmac.update( body );
    }

    return hmac.digest( 'hex' );
}
