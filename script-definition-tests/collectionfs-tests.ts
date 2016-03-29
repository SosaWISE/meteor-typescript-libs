/// <reference path='../definitions/collectionfs.d.ts'/>
/// <reference path='../definitions/meteor.d.ts'/>

// Almost all of the code samples were taken from https://github.com/CollectionFS/Meteor-CollectionFS/wiki/Getting-Started, the cfs:<storetype> docs,
// and https://medium.com/@victorleungtw/how-to-upload-files-with-meteor-js-7b8e811510fa#.7gboyt259


// Below this from https://github.com/CollectionFS/Meteor-CollectionFS/wiki/Getting-Started

declare var Images;
Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})],
});

Template['myForm'].events({
    'change .myFileInput': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
            Images.insert(files[i], function (err, fileObj) {
                //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            });
        }
    }
});

Template['myForm'].events({
    'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function (err, fileObj) {
                //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            });
        });
    }
});

Template['myForm'].events({
    'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            var newFile = new FS.File(file);
            newFile.metadata = {foo: "bar"};
            Images.insert(newFile, function (err, fileObj) {
                //If !err, we have inserted new doc with ID fileObj._id, and
                //kicked off the data upload using HTTP
            });
        });
    }
});

Template['imageView'].helpers({
    images: function () {
        return Images.find(); // Where Images is an FS.Collection instance
    }
});

Images = new FS.Collection("images", {
    filter: {
        maxSize: 1048576, //in bytes
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png']
        },
        deny: {
            contentTypes: ['image/*'],
            extensions: ['png']
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }
    }
});

Images.filters({
    maxSize: 1048576, //in bytes
    allow: {
        contentTypes: ['image/*'],
        extensions: ['png']
    },
    deny: {
        contentTypes: ['image/*'],
        extensions: ['png']
    },
    onInvalid: function (message) {
        if (Meteor.isClient) {
            alert(message);
        } else {
            console.log(message);
        }
    }
});

declare var date1: Date;
declare var fileObj2: FS.FileInstance;
fileObj2 = {
    _id: '',
    collectionName: '', // this property not stored in DB
    collection: Images, // this property not stored in DB
    createdByTransform: true, // this property not stored in DB
    // data: data, // this property not stored in DB
    original: {
        name: '',
        size: 0,
        type: '',
        updatedAt: date1
    },
    copies: {
        storeName: {
            key: '',
            name: '',
            size: 0,
            type: '',
            createdAt: date1,
            updatedAt: date1
        }
    },
    uploadedAt: date1,
    anyUserDefinedProp: 'anything'
};

declare var file1: File;
var fileObj = new FS.File(file1);
fileObj.name();
fileObj.extension();
fileObj.size();
fileObj.formattedSize(); // must add the "numeral" package to your project to use this method
fileObj.type();
fileObj.updatedAt();

// get for the version in a store
fileObj.name({store: 'thumbs'});
fileObj.extension({store: 'thumbs'});
fileObj.size({store: 'thumbs'});
fileObj.formattedSize({store: 'thumbs'}); // must add the "numeral" package to your project to use this method
fileObj.type({store: 'thumbs'});
fileObj.updatedAt({store: 'thumbs'});

// set original
fileObj.name('pic.png');
fileObj.extension('png');
fileObj.size(100);
fileObj.type('image/png');
fileObj.updatedAt(new Date);

// set for the version in a store
fileObj.name('pic.png', {store: 'thumbs'});
fileObj.extension('png', {store: 'thumbs'});
fileObj.size(100, {store: 'thumbs'});
fileObj.type('image/png', {store: 'thumbs'});
fileObj.updatedAt(new Date, {store: 'thumbs'});

Images.find().forEach(function (fileObj) {
    var readStream = fileObj.createReadStream('images');
    var writeStream = fileObj.createWriteStream('images');
});

Images = new FS.Collection("images", {
    stores: [
        new FS.Store.FileSystem("images"),
        new FS.Store.FileSystem("thumbs", {
            beforeWrite: function(fileObj) {
                // We return an object, which will change the
                // filename extension and type for this store only.
                return {
                    extension: 'png',
                    type: 'image/png'
                };
            },
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 10x10px PNG thumbnail
                // gm(readStream).resize(60).stream('PNG').pipe(writeStream);
                // The new file size will be automatically detected and set for this store
            }
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

var createSquareThumb = function(fileObj, readStream, writeStream) {
    var size = '96';
    // gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
};
var thumbStore = new FS.Store.FileSystem("thumbs", { transformWrite: createSquareThumb });
Images = new FS.Collection("images", { stores: [thumbStore] });

var imageStore = new FS.Store.S3("images", {
    // next 3 added by DA
    accessKeyId: "account or IAM key", //required if environment variables are not set
    secretAccessKey: "account or IAM secret", //required if environment variables are not set
    bucket: "mybucket", //required
    fileKeyMaker: function (fileObj) {
        // Lookup the copy
        var store = fileObj && fileObj._getInfo(name);
        // If the store and key is found return the key
        if (store && store.key) return store.key;

        // TO CUSTOMIZE, REPLACE CODE AFTER THIS POINT

        var filename = fileObj.name();
        var filenameInStore = fileObj.name({store: name});

        // If no store key found we resolve / generate a key
        return fileObj.collectionName + '/' + fileObj._id + '-' + (filenameInStore || filename);
    }
});

var imageStore = new FS.Store.FileSystem("images", {
    fileKeyMaker: function (fileObj) {
        // Lookup the copy
        var store = fileObj && fileObj._getInfo(name);
        // If the store and key is found return the key
        if (store && store.key) return store.key;

        // TO CUSTOMIZE, REPLACE CODE AFTER THIS POINT

        var filename = fileObj.name();
        var filenameInStore = fileObj.name({store: name});

        // If no store key found we resolve / generate a key
        return fileObj.collectionName + '-' + fileObj._id + '-' + (filenameInStore || filename);
    }
});

FS.HTTP.setBaseUrl('/files');
FS.HTTP.setHeadersForGet([
    ['Cache-Control', 'public, max-age=31536000']
]);

interface myFSCollectionDAO {}
declare var myFSCollection: FS.CollectionInstance<myFSCollectionDAO>;
var fileId = 'asdfsafasdf';
myFSCollection.update({_id: fileId}, {$set: {'metadata.foo': 'bar'}});

declare var myFsFile: FS.FileInstance;
myFsFile.update({$set: {'metadata.foo': 'bar'}});


// You must have a ReadStream with some data; it can be any stream.
// We're using the standard output from a command as an example.
// var readStream = spawn('ls', []).stdout;
declare var readStream;

// Create the FS.File instance
var newFile = new FS.File();

// Attach the ReadStream data to it. You must tell it what the content type is.
newFile.attachData(readStream, {type: 'text/plain'});

// Optionally provide a file name
newFile.name('ls_result.txt');

// Insert the file, which will save the metadata and
// store the stream data into all defined stores.
// `Files` is an `FS.Collection` instance defined elsewhere.
interface FilesDAO {}
declare var Files: FS.CollectionInstance<FilesDAO>;
Files.insert(newFile);

var url = 'someurl';
var newFileObj: FS.FileInstance = Images.insert(url);

var newFile = new FS.File();
newFile.attachData(url, function (error) {
    if (error) throw error;
    newFile.name("newImage.png");
    Images.insert(newFile, function (error, fileObj) {
        //If !error, we have inserted new doc with ID fileObj._id, and
        //remote URL data will be downloaded and stored on the server. The
        //URL must support a HEAD request since we do one to get the
        //content type, size, etc. for filtering inserts.
    });
});

Template['hello'].events({
    // Catch the dropped event
    'dropped #dropzone': function(event, temp) {
        console.log('files dropped');
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function (err, fileObj) {
                //If !err, we have inserted new doc with ID fileObj._id, and
                //kicked off the data upload using HTTP
            });
        });
    }
});

Template['myForm'].events({
    'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function (err, fileObj) {
                //If !err, we have inserted new doc with ID fileObj._id, and
                //kicked off the data upload using HTTP
            });
        });
    }
});

// From https://medium.com/@victorleungtw/how-to-upload-files-with-meteor-js-7b8e811510fa#.7gboyt259

var imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images', {
    stores: [imageStore]
});

Images.deny({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    },
    download: function(){
        return false;
    }
});

Images.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(){
        return true;
    }
});

Template['Profile'].events({
    "change .myFileInput": function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    // handle error
                } else {
                    // handle success depending what you need to do
                    var userId = Meteor.userId();
                    var imagesURL = {
                        "profile.image": "/cfs/files/images /" +fileObj._id
                    };
                    Meteor.users.update(userId, {$set: imagesURL});
                }
            });
        });
    }
});

// From https://atmospherejs.com/cfs/dropbox

var dropboxStore = new FS.Store.Dropbox("files", {
    key: "dropboxAppKey",
    secret: "dropboxAppSecret",
    token: "dropboxAccessToken", // Don’t share your access token with anyone.
    folder: "folder", //optional, which folder (key prefix) to use
    // The rest are generic store options supported by all storage adapters
    transformWrite: function() {}, //optional
    transformRead: function() {}, //optional
    maxTries: 1 //optional, default 5
});

Files = new FS.Collection("files", {
    stores: [dropboxStore]
});

var avatarStoreLarge = new FS.Store.Dropbox("avatarsLarge");
var avatarStoreSmall = new FS.Store.Dropbox("avatarsSmall");

interface AvatarDAO {}
declare var Avatars: FS.CollectionInstance<AvatarDAO>;
Avatars = new FS.Collection("avatars", {
    stores: [avatarStoreSmall, avatarStoreLarge],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

var avatarStoreLarge = new FS.Store.Dropbox("avatarsLarge", {
    key: "KEY-HERE",
    secret: "SECRET-KEY-HERE",
    token: "TOKEN-HERE",
    transformWrite: function(fileObj, readStream, writeStream) {
        // gm(readStream, fileObj.name()).resize('250', '250').stream().pipe(writeStream)
    }
});

var avatarStoreSmall = new FS.Store.Dropbox("avatarsSmall", {
    key: "KEY-HERE",
    secret: "SECRET-KEY-HERE",
    token: "TOKEN-HERE",
    beforeWrite: function(fileObj) {
        fileObj.size(20, {store: "avatarStoreSmall", save: false});
    },
    transformWrite: function(fileObj, readStream, writeStream) {
        // gm(readStream, fileObj.name()).resize('20', '20').stream().pipe(writeStream)
    }
});


Avatars = new FS.Collection("avatars", {
    stores: [avatarStoreSmall, avatarStoreLarge],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

// From https://atmospherejs.com/cfs/gridfs

var imageStore = new FS.Store.GridFS("images", {
    mongoUrl: 'mongodb://127.0.0.1:27017/test/', // optional, defaults to Meteor's local MongoDB
    mongoOptions: {},  // optional, see note below
    transformWrite: function() {}, //optional
    transformRead: function() {}, //optional
    maxTries: 1, // optional, default 5
    chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                          // Default: 2MB. Reasonable range: 512KB - 4MB
});

Images = new FS.Collection("images", {
    stores: [imageStore]
});

// From https://atmospherejs.com/cfs/s3

var imageStore = new FS.Store.S3("images", {
    region: "my-s3-region", //optional in most cases
    accessKeyId: "account or IAM key", //required if environment variables are not set
    secretAccessKey: "account or IAM secret", //required if environment variables are not set
    bucket: "mybucket", //required
    ACL: "myValue", //optional, default is 'private', but you can allow public or secure access routed through your app URL
    folder: "folder/in/bucket", //optional, which folder (key prefix) in the bucket to use
    // The rest are generic store options supported by all storage adapters
    transformWrite: function() {}, //optional
    transformRead: function() {}, //optional
    maxTries: 1 //optional, default 5
});

Images = new FS.Collection("images", {
    stores: [imageStore]
});

var avatarStoreLarge = new FS.Store.S3("avatarsLarge");
var avatarStoreSmall = new FS.Store.S3("avatarsSmall");

Avatars = new FS.Collection("avatars", {
    stores: [avatarStoreSmall, avatarStoreLarge],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

var avatarStoreLarge = new FS.Store.S3("avatarsLarge", {
    accessKeyId: "ID-HERE",
    secretAccessKey: "ACCESS-KEY-HERE",
    bucket: "avatars.large",
    transformWrite: function(fileObj, readStream, writeStream) {
        // gm(readStream, fileObj.name()).resize('250', '250').stream().pipe(writeStream)
    }
});

var avatarStoreSmall = new FS.Store.S3("avatarsSmall", {
    accessKeyId: "ID-HERE",
    secretAccessKey: "ACCESS-KEY-HERE",
    bucket: "avatars.small",
    beforeWrite: function(fileObj) {
        fileObj.size(20, {store: "avatarStoreSmall", save: false});
    },
    transformWrite: function(fileObj, readStream, writeStream) {
        // gm(readStream, fileObj.name()).resize('20', '20').stream().pipe(writeStream)
    }
});


Avatars = new FS.Collection("avatars", {
    stores: [avatarStoreSmall, avatarStoreLarge],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

// From https://atmospherejs.com/cfs/filesystem

var imageStore = new FS.Store.FileSystem("images", {
    path: "~/app-files/images", //optional, default is "/cfs/files" path within app container
    transformWrite: function() {}, //optional
    transformRead: function() {}, //optional
    maxTries: 1 //optional, default 5
});

Images = new FS.Collection("images", {
    stores: [imageStore]
});

