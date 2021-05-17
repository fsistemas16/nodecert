const stream = require('stream');

/**
 * Simple writable buffer stream
 * @docs: https://nodejs.org/api/stream.html#stream_writable_streams
 */
const  WritableBufferStream = class extends stream.Writable {

    constructor(options) {
        super(options);
        this._chunks = [];
    }

    _write (chunk, enc, callback) {
        this._chunks.push(chunk);
        return callback(null);
    }

    _destroy(err, callback) {
        this._chunks = null;
        return callback(null);
    }

    toBuffer() {
        return Buffer.concat(this._chunks);
    }
}

/*
const stream = require("./stream");
forma de usar 
const test = function (blobMerge){
    let doc = new PDFDocument();
    
  
    let writeStream = new stream.WritableBufferStream();

    // pip the document to write stream
    doc.pipe(writeStream);

    // add some content
    // doc.text('Some text!', 100, 100);
    doc.image(blobMerge, 0, 0, {
        fit: [841.89, 595.28]
    });

    // end document
    doc.end()

    // wait for the writing to finish
   return new Promise((resolve) => {

       writeStream.on('finish', () => {
           // console log pdf as bas64 string
           // console.log(writeStream.toBuffer().toString('base64'));
           return resolve(writeStream.toBuffer().toString('base64'));
        });
    })
}
*/

module.exports = { WritableBufferStream }