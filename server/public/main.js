/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/@socket.io/component-emitter/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@socket.io/component-emitter/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


/**
 * Expose `Emitter`.
 */

exports.Emitter = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var htmx_org__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! htmx.org */ "./node_modules/htmx.org/dist/htmx.min.js");
/* harmony import */ var htmx_org__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(htmx_org__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hyperscript_org__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hyperscript.org */ "./node_modules/hyperscript.org/dist/_hyperscript_web.modern.js");
/* harmony import */ var _screenshot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screenshot */ "./js/screenshot.js");
/**
 * htmx
 *
 */

window.htmx = (htmx_org__WEBPACK_IMPORTED_MODULE_0___default());
/**
 * _hyperscript
 *
 */


/**
 * Screenshots
 *
 */


window.screenshot = {
  takeScreenshot: _screenshot__WEBPACK_IMPORTED_MODULE_2__.takeScreenshot,
  populateFileInput: _screenshot__WEBPACK_IMPORTED_MODULE_2__.populateFileInput
};
/**
 * Socket IO
 *
 */

var _require = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/cjs/index.js"),
    io = _require.io;

var socket = io(); // _hyperscript will trigger `app:join_project` on the project view page.
// Use this event to instruct the server to put this socket client in the project 'room'

htmx_org__WEBPACK_IMPORTED_MODULE_0___default().on(htmx_org__WEBPACK_IMPORTED_MODULE_0___default().find('body'), 'app:join_project', function (evt) {
  var projectHash = evt.detail.project_hash;
  console.log("Joining room for ".concat(projectHash));
  socket.emit('join_project', projectHash);
}); // Listen for 'activity' events on the socket and send event to <body> for _hyperscript listeners

socket.on('activity', function (params) {
  htmx_org__WEBPACK_IMPORTED_MODULE_0___default().trigger(htmx_org__WEBPACK_IMPORTED_MODULE_0___default().find('body'), "new_activity", params);
}); // Listen for 'comments' events on the socket and send event to <body> for _hyperscript listeners

socket.on('comments', function (params) {
  htmx_org__WEBPACK_IMPORTED_MODULE_0___default().trigger(htmx_org__WEBPACK_IMPORTED_MODULE_0___default().find('body'), "new_comments", params);
}); // Get auth token form security from metadata

function getAuthToken() {
  return document.querySelector('meta[name="crumb"]').getAttribute('content');
} // Configure htmx requests with form security.


document.body.addEventListener('htmx:configRequest', function (evt) {
  if (evt.detail.verb.toLowerCase() == 'get') return;
  evt.detail.parameters['crumb'] = getAuthToken();
});

/***/ }),

/***/ "./js/screenshot.js":
/*!**************************!*\
  !*** ./js/screenshot.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "takeScreenshot": () => (/* binding */ takeScreenshot),
/* harmony export */   "populateFileInput": () => (/* binding */ populateFileInput)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
// see: https://www.webrtc-experiment.com/Pluginfree-Screen-Sharing/#20893521368186473
// see: https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Pluginfree-Screen-Sharing/conference.js
function getDisplayMedia(options) {
  if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
    return navigator.mediaDevices.getDisplayMedia(options);
  }

  if (navigator.getDisplayMedia) {
    return navigator.getDisplayMedia(options);
  }

  if (navigator.webkitGetDisplayMedia) {
    return navigator.webkitGetDisplayMedia(options);
  }

  if (navigator.mozGetDisplayMedia) {
    return navigator.mozGetDisplayMedia(options);
  }

  throw new Error('getDisplayMedia is not defined');
}

function getUserMedia(options) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(options);
  }

  if (navigator.getUserMedia) {
    return navigator.getUserMedia(options);
  }

  if (navigator.webkitGetUserMedia) {
    return navigator.webkitGetUserMedia(options);
  }

  if (navigator.mozGetUserMedia) {
    return navigator.mozGetUserMedia(options);
  }

  throw new Error('getUserMedia is not defined');
}

function takeScreenshotStream() {
  return _takeScreenshotStream.apply(this, arguments);
}

function _takeScreenshotStream() {
  _takeScreenshotStream = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
    var width, height, errors, stream, _console;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/screen
            width = screen.width * (window.devicePixelRatio || 1);
            height = screen.height * (window.devicePixelRatio || 1);
            errors = [];
            _context3.prev = 3;
            _context3.next = 6;
            return getDisplayMedia({
              audio: false,
              // see: https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints/video
              video: {
                width: width,
                height: height,
                frameRate: 1
              }
            });

          case 6:
            stream = _context3.sent;
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](3);
            errors.push(_context3.t0);

          case 12:
            if (!(navigator.userAgent.indexOf('Electron') >= 0)) {
              _context3.next = 22;
              break;
            }

            _context3.prev = 13;
            _context3.next = 16;
            return getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  // chromeMediaSourceId: source.id,
                  minWidth: width,
                  maxWidth: width,
                  minHeight: height,
                  maxHeight: height
                }
              }
            });

          case 16:
            stream = _context3.sent;
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t1 = _context3["catch"](13);
            errors.push(_context3.t1);

          case 22:
            if (!errors.length) {
              _context3.next = 26;
              break;
            }

            (_console = console).debug.apply(_console, errors);

            if (stream) {
              _context3.next = 26;
              break;
            }

            throw errors[errors.length - 1];

          case 26:
            return _context3.abrupt("return", stream);

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 9], [13, 19]]);
  }));
  return _takeScreenshotStream.apply(this, arguments);
}

function takeScreenshotCanvas() {
  return _takeScreenshotCanvas.apply(this, arguments);
} // from: https://stackoverflow.com/a/46182044/5221762


function _takeScreenshotCanvas() {
  _takeScreenshotCanvas = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
    var stream, video, result;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return takeScreenshotStream();

          case 2:
            stream = _context4.sent;
            // from: https://stackoverflow.com/a/57665309/5221762
            video = document.createElement('video');
            _context4.next = 6;
            return new Promise(function (resolve, reject) {
              video.onloadedmetadata = function () {
                video.play();
                video.pause(); // from: https://github.com/kasprownik/electron-screencapture/blob/master/index.js

                // from: https://github.com/kasprownik/electron-screencapture/blob/master/index.js
                var canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                var context = canvas.getContext('2d'); // see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement

                // see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                resolve(canvas);
              };

              video.srcObject = stream;
            });

          case 6:
            result = _context4.sent;
            stream.getTracks().forEach(function (track) {
              track.stop();
            });

            if (!(result == null)) {
              _context4.next = 10;
              break;
            }

            throw new Error('Cannot take canvas screenshot');

          case 10:
            return _context4.abrupt("return", result);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _takeScreenshotCanvas.apply(this, arguments);
}

function getJpegBlob(canvas) {
  return new Promise(function (resolve, reject) {
    // docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
    canvas.toBlob(function (blob) {
      return resolve(blob);
    }, 'image/jpeg', 0.95);
  });
}

function getJpegBytes(_x) {
  return _getJpegBytes.apply(this, arguments);
}

function _getJpegBytes() {
  _getJpegBytes = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5(canvas) {
    var blob;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getJpegBlob(canvas);

          case 2:
            blob = _context5.sent;
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              var fileReader = new FileReader();
              fileReader.addEventListener('loadend', function () {
                if (this.error) {
                  reject(this.error);
                  return;
                }

                resolve(this.result);
              });
              fileReader.readAsArrayBuffer(blob);
            }));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getJpegBytes.apply(this, arguments);
}

function takeScreenshotJpegBlob() {
  return _takeScreenshotJpegBlob.apply(this, arguments);
}

function _takeScreenshotJpegBlob() {
  _takeScreenshotJpegBlob = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
    var canvas;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return takeScreenshotCanvas();

          case 2:
            canvas = _context6.sent;
            return _context6.abrupt("return", getJpegBlob(canvas));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _takeScreenshotJpegBlob.apply(this, arguments);
}

function takeScreenshotJpegBytes() {
  return _takeScreenshotJpegBytes.apply(this, arguments);
}

function _takeScreenshotJpegBytes() {
  _takeScreenshotJpegBytes = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
    var canvas;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return takeScreenshotCanvas();

          case 2:
            canvas = _context7.sent;
            return _context7.abrupt("return", getJpegBytes(canvas));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _takeScreenshotJpegBytes.apply(this, arguments);
}

function blobToCanvas(_x2, _x3, _x4) {
  return _blobToCanvas.apply(this, arguments);
}

function _blobToCanvas() {
  _blobToCanvas = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee8(blob, maxWidth, maxHeight) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", new Promise(function (resolve, reject) {
              var img = new Image();

              img.onload = function () {
                var canvas = document.createElement('canvas');
                var scale = Math.min(1, maxWidth ? maxWidth / img.width : 1, maxHeight ? maxHeight / img.height : 1);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                resolve(canvas);
              };

              img.onerror = function () {
                reject(new Error('Error load blob to Image'));
              };

              img.src = URL.createObjectURL(blob);
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _blobToCanvas.apply(this, arguments);
}

function blobToBase64(_x5) {
  return _blobToBase.apply(this, arguments);
} // export const takeScreenshot =
// module.exports.takeScreenshot = takeScreenshot;


function _blobToBase() {
  _blobToBase = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee9(blob) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", new Promise(function (resolve, reject) {
              var reader = new FileReader();
              reader.readAsDataURL(blob);

              reader.onloadend = function () {
                resolve(reader.result);
              };

              reader.onerror = function () {
                reject(new Error('Error converting to base64'));
              };
            }));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _blobToBase.apply(this, arguments);
}

var takeScreenshot = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
    var screenshotJpegBlob, base64data, previewCanvas;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return takeScreenshotJpegBlob();

          case 2:
            screenshotJpegBlob = _context.sent;
            _context.next = 5;
            return blobToBase64(screenshotJpegBlob);

          case 5:
            base64data = _context.sent;
            _context.next = 8;
            return blobToCanvas(screenshotJpegBlob, 400, 400);

          case 8:
            previewCanvas = _context.sent;
            return _context.abrupt("return", {
              previewCanvas: previewCanvas,
              blob: screenshotJpegBlob,
              encodedData: base64data
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function takeScreenshot() {
    return _ref.apply(this, arguments);
  };
}();
var populateFileInput = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(blob, id) {
    var file, container, fileInputElement;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            file = new File([blob], "screenshot.jpg", {
              type: "image/jpeg",
              lastModified: new Date().getTime()
            });
            container = new DataTransfer();
            container.items.add(file);
            fileInputElement = document.getElementById(id);
            fileInputElement.files = container.files;

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function populateFileInput(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./node_modules/backo2/index.js":
/*!**************************************!*\
  !*** ./node_modules/backo2/index.js ***!
  \**************************************/
/***/ ((module) => {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),

/***/ "./node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js":
/*!************************************************************************!*\
  !*** ./node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
/*
 * base64-arraybuffer 1.0.1 <https://github.com/niklasvh/base64-arraybuffer>
 * Copyright (c) 2021 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
var encode = function (arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
var decode = function (base64) {
    var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};


//# sourceMappingURL=base64-arraybuffer.es5.js.map


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = __webpack_require__.g.TYPED_ARRAY_SUPPORT !== undefined
  ? __webpack_require__.g.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/has-cors/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-cors/index.js ***!
  \****************************************/
/***/ ((module) => {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),

/***/ "./node_modules/htmx.org/dist/htmx.min.js":
/*!************************************************!*\
  !*** ./node_modules/htmx.org/dist/htmx.min.js ***!
  \************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(e,t){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}else{}})(typeof self!=="undefined"?self:this,function(){return function(){"use strict";var D={onLoad:t,process:rt,on:N,off:I,trigger:lt,ajax:$t,find:w,findAll:S,closest:O,values:function(e,t){var r=Ot(e,t||"post");return r.values},remove:E,addClass:C,removeClass:R,toggleClass:q,takeClass:L,defineExtension:Qt,removeExtension:er,logAll:b,logger:null,config:{historyEnabled:true,historyCacheSize:10,refreshOnHistoryMiss:false,defaultSwapStyle:"innerHTML",defaultSwapDelay:0,defaultSettleDelay:20,includeIndicatorStyles:true,indicatorClass:"htmx-indicator",requestClass:"htmx-request",addedClass:"htmx-added",settlingClass:"htmx-settling",swappingClass:"htmx-swapping",allowEval:true,attributesToSettle:["class","style","width","height"],withCredentials:false,timeout:0,wsReconnectDelay:"full-jitter",disableSelector:"[hx-disable], [data-hx-disable]",useTemplateFragments:false,scrollBehavior:"smooth"},parseInterval:h,_:e,createEventSource:function(e){return new EventSource(e,{withCredentials:true})},createWebSocket:function(e){return new WebSocket(e,[])},version:"1.6.1"};var r=["get","post","put","delete","patch"];var n=r.map(function(e){return"[hx-"+e+"], [data-hx-"+e+"]"}).join(", ");function h(e){if(e==undefined){return undefined}if(e.slice(-2)=="ms"){return parseFloat(e.slice(0,-2))||undefined}if(e.slice(-1)=="s"){return parseFloat(e.slice(0,-1))*1e3||undefined}return parseFloat(e)||undefined}function c(e,t){return e.getAttribute&&e.getAttribute(t)}function s(e,t){return e.hasAttribute&&(e.hasAttribute(t)||e.hasAttribute("data-"+t))}function F(e,t){return c(e,t)||c(e,"data-"+t)}function l(e){return e.parentElement}function P(){return document}function d(e,t){if(t(e)){return e}else if(l(e)){return d(l(e),t)}else{return null}}function X(e,t){var r=null;d(e,function(e){return r=F(e,t)});if(r!=="unset"){return r}}function v(e,t){var r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector;return r&&r.call(e,t)}function i(e){var t=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i;var r=t.exec(e);if(r){return r[1].toLowerCase()}else{return""}}function o(e,t){var r=new DOMParser;var n=r.parseFromString(e,"text/html");var i=n.body;while(t>0){t--;i=i.firstChild}if(i==null){i=P().createDocumentFragment()}return i}function u(e){if(D.config.useTemplateFragments){var t=o("<body><template>"+e+"</template></body>",0);return t.querySelector("template").content}else{var r=i(e);switch(r){case"thead":case"tbody":case"tfoot":case"colgroup":case"caption":return o("<table>"+e+"</table>",1);case"col":return o("<table><colgroup>"+e+"</colgroup></table>",2);case"tr":return o("<table><tbody>"+e+"</tbody></table>",2);case"td":case"th":return o("<table><tbody><tr>"+e+"</tr></tbody></table>",3);case"script":return o("<div>"+e+"</div>",1);default:return o(e,0)}}}function U(e){if(e){e()}}function a(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"}function f(e){return a(e,"Function")}function g(e){return a(e,"Object")}function j(e){var t="htmx-internal-data";var r=e[t];if(!r){r=e[t]={}}return r}function p(e){var t=[];if(e){for(var r=0;r<e.length;r++){t.push(e[r])}}return t}function B(e,t){if(e){for(var r=0;r<e.length;r++){t(e[r])}}}function m(e){var t=e.getBoundingClientRect();var r=t.top;var n=t.bottom;return r<window.innerHeight&&n>=0}function z(e){return P().body.contains(e)}function y(e){return e.trim().split(/\s+/)}function V(e,t){for(var r in t){if(t.hasOwnProperty(r)){e[r]=t[r]}}return e}function x(e){try{return JSON.parse(e)}catch(e){ut(e);return null}}function e(e){return Ut(P().body,function(){return eval(e)})}function t(t){var e=D.on("htmx:load",function(e){t(e.detail.elt)});return e}function b(){D.logger=function(e,t,r){if(console){console.log(t,e,r)}}}function w(e,t){if(t){return e.querySelector(t)}else{return w(P(),e)}}function S(e,t){if(t){return e.querySelectorAll(t)}else{return S(P(),e)}}function E(e,t){e=H(e);if(t){setTimeout(function(){E(e)},t)}else{e.parentElement.removeChild(e)}}function C(e,t,r){e=H(e);if(r){setTimeout(function(){C(e,t)},r)}else{e.classList&&e.classList.add(t)}}function R(e,t,r){e=H(e);if(r){setTimeout(function(){R(e,t)},r)}else{if(e.classList){e.classList.remove(t);if(e.classList.length===0){e.removeAttribute("class")}}}}function q(e,t){e=H(e);e.classList.toggle(t)}function L(e,t){e=H(e);B(e.parentElement.children,function(e){R(e,t)});C(e,t)}function O(e,t){e=H(e);if(e.closest){return e.closest(t)}else{do{if(e==null||v(e,t)){return e}}while(e=e&&l(e))}}function T(e,t){if(t.indexOf("closest ")===0){return[O(e,t.substr(8))]}else if(t.indexOf("find ")===0){return[w(e,t.substr(5))]}else if(t==="document"){return[document]}else if(t==="window"){return[window]}else{return P().querySelectorAll(t)}}function A(e,t){if(t){return T(e,t)[0]}else{return T(P().body,e)[0]}}function H(e){if(a(e,"String")){return w(e)}else{return e}}function k(e,t,r){if(f(t)){return{target:P().body,event:e,listener:t}}else{return{target:H(e),event:t,listener:r}}}function N(t,r,n){rr(function(){var e=k(t,r,n);e.target.addEventListener(e.event,e.listener)});var e=f(r);return e?r:n}function I(t,r,n){rr(function(){var e=k(t,r,n);e.target.removeEventListener(e.event,e.listener)});return f(r)?r:n}function _(e){var t=d(e,function(e){return F(e,"hx-target")!==null});if(t){var r=F(t,"hx-target");if(r==="this"){return t}else{return A(e,r)}}else{var n=j(e);if(n.boosted){return P().body}else{return e}}}function M(e){var t=D.config.attributesToSettle;for(var r=0;r<t.length;r++){if(e===t[r]){return true}}return false}function W(t,r){B(t.attributes,function(e){if(!r.hasAttribute(e.name)&&M(e.name)){t.removeAttribute(e.name)}});B(r.attributes,function(e){if(M(e.name)){t.setAttribute(e.name,e.value)}})}function $(e,t){var r=tr(t);for(var n=0;n<r.length;n++){var i=r[n];try{if(i.isInlineSwap(e)){return true}}catch(e){ut(e)}}return e==="outerHTML"}function J(e,t,r){var n="#"+t.id;var i="outerHTML";if(e==="true"){}else if(e.indexOf(":")>0){i=e.substr(0,e.indexOf(":"));n=e.substr(e.indexOf(":")+1,e.length)}else{i=e}var o=P().querySelector(n);if(o){var a;a=P().createDocumentFragment();a.appendChild(t);if(!$(i,o)){a=t}le(i,o,o,a,r)}else{t.parentNode.removeChild(t);ot(P().body,"htmx:oobErrorNoTarget",{content:t})}return e}function Z(e,r){B(S(e,"[hx-swap-oob], [data-hx-swap-oob]"),function(e){var t=F(e,"hx-swap-oob");if(t!=null){J(t,e,r)}})}function G(e){B(S(e,"[hx-preserve], [data-hx-preserve]"),function(e){var t=F(e,"id");var r=P().getElementById(t);if(r!=null){e.parentNode.replaceChild(r,e)}})}function K(n,e,i){B(e.querySelectorAll("[id]"),function(e){if(e.id&&e.id.length>0){var t=n.querySelector(e.tagName+"[id='"+e.id+"']");if(t&&t!==n){var r=e.cloneNode();W(e,t);i.tasks.push(function(){W(e,r)})}}})}function Y(e){return function(){R(e,D.config.addedClass);rt(e);Ke(e);Q(e);lt(e,"htmx:load")}}function Q(e){var t="[autofocus]";var r=v(e,t)?e:e.querySelector(t);if(r!=null){r.focus()}}function ee(e,t,r,n){K(e,r,n);while(r.childNodes.length>0){var i=r.firstChild;C(i,D.config.addedClass);e.insertBefore(i,t);if(i.nodeType!==Node.TEXT_NODE&&i.nodeType!==Node.COMMENT_NODE){n.tasks.push(Y(i))}}}function te(t){var e=j(t);if(e.webSocket){e.webSocket.close()}if(e.sseEventSource){e.sseEventSource.close()}if(e.listenerInfos){B(e.listenerInfos,function(e){if(t!==e.on){e.on.removeEventListener(e.trigger,e.listener)}})}if(t.children){B(t.children,function(e){te(e)})}}function re(e,t,r){if(e.tagName==="BODY"){return se(e,t,r)}else{var n=e.previousSibling;ee(l(e),e,t,r);if(n==null){var i=l(e).firstChild}else{var i=n.nextSibling}j(e).replacedWith=i;r.elts=[];while(i&&i!==e){if(i.nodeType===Node.ELEMENT_NODE){r.elts.push(i)}i=i.nextElementSibling}te(e);l(e).removeChild(e)}}function ne(e,t,r){return ee(e,e.firstChild,t,r)}function ie(e,t,r){return ee(l(e),e,t,r)}function oe(e,t,r){return ee(e,null,t,r)}function ae(e,t,r){return ee(l(e),e.nextSibling,t,r)}function se(e,t,r){var n=e.firstChild;ee(e,n,t,r);if(n){while(n.nextSibling){te(n.nextSibling);e.removeChild(n.nextSibling)}te(n);e.removeChild(n)}}function ue(e,t){var r=X(e,"hx-select");if(r){var n=P().createDocumentFragment();B(t.querySelectorAll(r),function(e){n.appendChild(e)});t=n}return t}function le(e,t,r,n,i){switch(e){case"none":return;case"outerHTML":re(r,n,i);return;case"afterbegin":ne(r,n,i);return;case"beforebegin":ie(r,n,i);return;case"beforeend":oe(r,n,i);return;case"afterend":ae(r,n,i);return;default:var o=tr(t);for(var a=0;a<o.length;a++){var s=o[a];try{var u=s.handleSwap(e,r,n,i);if(u){if(typeof u.length!=="undefined"){for(var l=0;l<u.length;l++){var f=u[l];if(f.nodeType!==Node.TEXT_NODE&&f.nodeType!==Node.COMMENT_NODE){i.tasks.push(Y(f))}}}return}}catch(e){ut(e)}}se(r,n,i)}}function fe(e){if(e.indexOf("<title")>-1){var t=e.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");var r=t.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);if(r){return r[2]}}}function ce(e,t,r,n,i){var o=fe(n);if(o){var a=w("title");if(a){a.innerHTML=o}else{window.document.title=o}}var s=u(n);if(s){Z(s,i);s=ue(r,s);G(s);return le(e,r,t,s,i)}}function he(e,t,r){var n=e.getResponseHeader(t);if(n.indexOf("{")===0){var i=x(n);for(var o in i){if(i.hasOwnProperty(o)){var a=i[o];if(!g(a)){a={value:a}}lt(r,o,a)}}}else{lt(r,n,[])}}var de=/\s/;var ve=/[\s,]/;var ge=/[_$a-zA-Z]/;var pe=/[_$a-zA-Z0-9]/;var me=['"',"'","/"];var ye=/[^\s]/;function xe(e){var t=[];var r=0;while(r<e.length){if(ge.exec(e.charAt(r))){var n=r;while(pe.exec(e.charAt(r+1))){r++}t.push(e.substr(n,r-n+1))}else if(me.indexOf(e.charAt(r))!==-1){var i=e.charAt(r);var n=r;r++;while(r<e.length&&e.charAt(r)!==i){if(e.charAt(r)==="\\"){r++}r++}t.push(e.substr(n,r-n+1))}else{var o=e.charAt(r);t.push(o)}r++}return t}function be(e,t,r){return ge.exec(e.charAt(0))&&e!=="true"&&e!=="false"&&e!=="this"&&e!==r&&t!=="."}function we(e,t,r){if(t[0]==="["){t.shift();var n=1;var i=" return (function("+r+"){ return (";var o=null;while(t.length>0){var a=t[0];if(a==="]"){n--;if(n===0){if(o===null){i=i+"true"}t.shift();i+=")})";try{var s=Ut(e,function(){return Function(i)()},function(){return true});s.source=i;return s}catch(e){ot(P().body,"htmx:syntax:error",{error:e,source:i});return null}}}else if(a==="["){n++}if(be(a,o,r)){i+="(("+r+"."+a+") ? ("+r+"."+a+") : (window."+a+"))"}else{i=i+a}o=t.shift()}}}function Se(e,t){var r="";while(e.length>0&&!e[0].match(t)){r+=e.shift()}return r}var Ee="input, textarea, select";function Ce(e){var t=F(e,"hx-trigger");var r=[];if(t){var n=xe(t);do{Se(n,ye);var i=n.length;var o=Se(n,/[,\[\s]/);if(o!==""){if(o==="every"){var a={trigger:"every"};Se(n,ye);a.pollInterval=h(Se(n,/[,\[\s]/));Se(n,ye);var s=we(e,n,"event");if(s){a.eventFilter=s}r.push(a)}else if(o.indexOf("sse:")===0){r.push({trigger:"sse",sseEvent:o.substr(4)})}else{var u={trigger:o};var s=we(e,n,"event");if(s){u.eventFilter=s}while(n.length>0&&n[0]!==","){Se(n,ye);var l=n.shift();if(l==="changed"){u.changed=true}else if(l==="once"){u.once=true}else if(l==="consume"){u.consume=true}else if(l==="delay"&&n[0]===":"){n.shift();u.delay=h(Se(n,ve))}else if(l==="from"&&n[0]===":"){n.shift();let e=Se(n,ve);if(e==="closest"||e==="find"){n.shift();e+=" "+Se(n,ve)}u.from=e}else if(l==="target"&&n[0]===":"){n.shift();u.target=Se(n,ve)}else if(l==="throttle"&&n[0]===":"){n.shift();u.throttle=h(Se(n,ve))}else if(l==="queue"&&n[0]===":"){n.shift();u.queue=Se(n,ve)}else if((l==="root"||l==="threshold")&&n[0]===":"){n.shift();u[l]=Se(n,ve)}else{ot(e,"htmx:syntax:error",{token:n.shift()})}}r.push(u)}}if(n.length===i){ot(e,"htmx:syntax:error",{token:n.shift()})}Se(n,ye)}while(n[0]===","&&n.shift())}if(r.length>0){return r}else if(v(e,"form")){return[{trigger:"submit"}]}else if(v(e,Ee)){return[{trigger:"change"}]}else{return[{trigger:"click"}]}}function Re(e){j(e).cancelled=true}function qe(e,t,r,n){var i=j(e);i.timeout=setTimeout(function(){if(z(e)&&i.cancelled!==true){if(!He(n,it("hx:poll:trigger",{triggerSpec:n}))){Zt(t,r,e)}qe(e,t,F(e,"hx-"+t),n)}},n.pollInterval)}function Le(e){return location.hostname===e.hostname&&c(e,"href")&&c(e,"href").indexOf("#")!==0}function Oe(t,r,e){if(t.tagName==="A"&&Le(t)&&t.target===""||t.tagName==="FORM"){r.boosted=true;var n,i;if(t.tagName==="A"){n="get";i=c(t,"href");r.pushURL=true}else{var o=c(t,"method");n=o?o.toLowerCase():"get";if(n==="get"){r.pushURL=true}i=c(t,"action")}e.forEach(function(e){ke(t,n,i,r,e,true)})}}function Te(e,t){if(e.type==="submit"||e.type==="click"){if(t.tagName==="FORM"){return true}if(v(t,'input[type="submit"], button')&&O(t,"form")!==null){return true}if(t.tagName==="A"&&t.href&&(t.getAttribute("href")==="#"||t.getAttribute("href").indexOf("#")!==0)){return true}}return false}function Ae(e,t){return j(e).boosted&&e.tagName==="A"&&t.type==="click"&&(t.ctrlKey||t.metaKey)}function He(e,t){var r=e.eventFilter;if(r){try{return r(t)!==true}catch(e){ot(P().body,"htmx:eventFilter:error",{error:e,source:r.source});return true}}return false}function ke(o,a,s,e,u,l){var t;if(u.from){t=T(o,u.from)}else{t=[o]}B(t,function(n){var i=function(e){if(!z(o)){n.removeEventListener(u.trigger,i);return}if(Ae(o,e)){return}if(l||Te(e,o)){e.preventDefault()}if(He(u,e)){return}var t=j(e);t.triggerSpec=u;if(t.handledFor==null){t.handledFor=[]}var r=j(o);if(t.handledFor.indexOf(o)<0){t.handledFor.push(o);if(u.consume){e.stopPropagation()}if(u.target&&e.target){if(!v(e.target,u.target)){return}}if(u.once){if(r.triggeredOnce){return}else{r.triggeredOnce=true}}if(u.changed){if(r.lastValue===o.value){return}else{r.lastValue=o.value}}if(r.delayed){clearTimeout(r.delayed)}if(r.throttle){return}if(u.throttle){if(!r.throttle){Zt(a,s,o,e);r.throttle=setTimeout(function(){r.throttle=null},u.throttle)}}else if(u.delay){r.delayed=setTimeout(function(){Zt(a,s,o,e)},u.delay)}else{Zt(a,s,o,e)}}};if(e.listenerInfos==null){e.listenerInfos=[]}e.listenerInfos.push({trigger:u.trigger,listener:i,on:n});n.addEventListener(u.trigger,i)})}var Ne=false;var Ie=null;function Me(){if(!Ie){Ie=function(){Ne=true};window.addEventListener("scroll",Ie);setInterval(function(){if(Ne){Ne=false;B(P().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"),function(e){De(e)})}},200)}}function De(e){if(!s(e,"data-hx-revealed")&&m(e)){e.setAttribute("data-hx-revealed","true");var t=j(e);if(t.initialized){Zt(t.verb,t.path,e)}else{e.addEventListener("htmx:afterProcessNode",function(){Zt(t.verb,t.path,e)},{once:true})}}}function Fe(e,t,r){var n=y(r);for(var i=0;i<n.length;i++){var o=n[i].split(/:(.+)/);if(o[0]==="connect"){Pe(e,o[1],0)}if(o[0]==="send"){Ue(e)}}}function Pe(s,r,n){if(!z(s)){return}if(r.indexOf("/")==0){var e=location.hostname+(location.port?":"+location.port:"");if(location.protocol=="https:"){r="wss://"+e+r}else if(location.protocol=="http:"){r="ws://"+e+r}}var t=D.createWebSocket(r);t.onerror=function(e){ot(s,"htmx:wsError",{error:e,socket:t});Xe(s)};t.onclose=function(e){if([1006,1012,1013].indexOf(e.code)>=0){var t=je(n);setTimeout(function(){Pe(s,r,n+1)},t)}};t.onopen=function(e){n=0};j(s).webSocket=t;t.addEventListener("message",function(e){if(Xe(s)){return}var t=e.data;st(s,function(e){t=e.transformResponse(t,null,s)});var r=Ft(s);var n=u(t);var i=p(n.children);for(var o=0;o<i.length;o++){var a=i[o];J(F(a,"hx-swap-oob")||"true",a,r)}mt(r.tasks)})}function Xe(e){if(!z(e)){j(e).webSocket.close();return true}}function Ue(l){var f=d(l,function(e){return j(e).webSocket!=null});if(f){l.addEventListener(Ce(l)[0].trigger,function(e){var t=j(f).webSocket;var r=kt(l,f);var n=Ot(l,"post");var i=n.errors;var o=n.values;var a=zt(l);var s=V(o,a);var u=Nt(s,l);u["HEADERS"]=r;if(i&&i.length>0){lt(l,"htmx:validation:halted",i);return}t.send(JSON.stringify(u));if(Te(e,l)){e.preventDefault()}})}else{ot(l,"htmx:noWebSocketSourceError")}}function je(e){var t=D.config.wsReconnectDelay;if(typeof t==="function"){return t(e)}if(t==="full-jitter"){var r=Math.min(e,6);var n=1e3*Math.pow(2,r);return n*Math.random()}ut('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"')}function Be(e,t,r){var n=y(r);for(var i=0;i<n.length;i++){var o=n[i].split(/:(.+)/);if(o[0]==="connect"){ze(e,o[1])}if(o[0]==="swap"){Ve(e,o[1])}}}function ze(t,e){var r=D.createEventSource(e);r.onerror=function(e){ot(t,"htmx:sseError",{error:e,source:r});We(t)};j(t).sseEventSource=r}function Ve(o,a){var s=d(o,$e);if(s){var u=j(s).sseEventSource;var l=function(e){if(We(s)){u.removeEventListener(a,l);return}var t=e.data;st(o,function(e){t=e.transformResponse(t,null,o)});var r=Mt(o);var n=_(o);var i=Ft(o);ce(r.swapStyle,o,n,t,i);mt(i.tasks);lt(o,"htmx:sseMessage",e)};j(o).sseListener=l;u.addEventListener(a,l)}else{ot(o,"htmx:noSSESourceError")}}function _e(e,t,r,n){var i=d(e,$e);if(i){var o=j(i).sseEventSource;var a=function(){if(!We(i)){if(z(e)){Zt(t,r,e)}else{o.removeEventListener(n,a)}}};j(e).sseListener=a;o.addEventListener(n,a)}else{ot(e,"htmx:noSSESourceError")}}function We(e){if(!z(e)){j(e).sseEventSource.close();return true}}function $e(e){return j(e).sseEventSource!=null}function Je(e,t,r,n,i){var o=function(){if(!n.loaded){n.loaded=true;Zt(t,r,e)}};if(i){setTimeout(o,i)}else{o()}}function Ze(o,a,e){var t=false;B(r,function(n){if(s(o,"hx-"+n)){var i=F(o,"hx-"+n);t=true;a.path=i;a.verb=n;e.forEach(function(e){if(e.sseEvent){_e(o,n,i,e.sseEvent)}else if(e.trigger==="revealed"){Me();De(o)}else if(e.trigger==="intersect"){var t={};if(e.root){t.root=A(o,e.root)}if(e.threshold){t.threshold=parseFloat(e.threshold)}var r=new IntersectionObserver(function(e){for(var t=0;t<e.length;t++){var r=e[t];if(r.isIntersecting){lt(o,"intersect");break}}},t);r.observe(o);ke(o,n,i,a,e)}else if(e.trigger==="load"){Je(o,n,i,a,e.delay)}else if(e.pollInterval){a.polling=true;qe(o,n,i,e)}else{ke(o,n,i,a,e)}})}});return t}function Ge(e){if(e.type==="text/javascript"||e.type===""){var t=P().createElement("script");B(e.attributes,function(e){t.setAttribute(e.name,e.value)});t.textContent=e.textContent;t.async=false;var r=e.parentElement;try{r.insertBefore(t,e)}catch(e){ut(e)}finally{r.removeChild(e)}}}function Ke(e){if(v(e,"script")){Ge(e)}B(S(e,"script"),function(e){Ge(e)})}function Ye(){return document.querySelector("[hx-boost], [data-hx-boost]")}function Qe(e){if(e.querySelectorAll){var t=Ye()?", a, form":"";var r=e.querySelectorAll(n+t+", [hx-sse], [data-hx-sse], [hx-ws],"+" [data-hx-ws], [hx-ext], [hx-data-ext]");return r}else{return[]}}function et(r){var e=function(e){if(v(e.target,"button, input[type='submit']")){var t=j(r);t.lastButtonClicked=e.target}};r.addEventListener("click",e);r.addEventListener("focusin",e);r.addEventListener("focusout",function(e){var t=j(r);t.lastButtonClicked=null})}function tt(e){if(e.closest&&e.closest(D.config.disableSelector)){return}var t=j(e);if(!t.initialized){t.initialized=true;lt(e,"htmx:beforeProcessNode");if(e.value){t.lastValue=e.value}var r=Ce(e);var n=Ze(e,t,r);if(!n&&X(e,"hx-boost")==="true"){Oe(e,t,r)}if(e.tagName==="FORM"){et(e)}var i=F(e,"hx-sse");if(i){Be(e,t,i)}var o=F(e,"hx-ws");if(o){Fe(e,t,o)}lt(e,"htmx:afterProcessNode")}}function rt(e){e=H(e);tt(e);B(Qe(e),function(e){tt(e)})}function nt(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function it(e,t){var r;if(window.CustomEvent&&typeof window.CustomEvent==="function"){r=new CustomEvent(e,{bubbles:true,cancelable:true,detail:t})}else{r=P().createEvent("CustomEvent");r.initCustomEvent(e,true,true,t)}return r}function ot(e,t,r){lt(e,t,V({error:t},r))}function at(e){return e==="htmx:afterProcessNode"}function st(e,t){B(tr(e),function(e){try{t(e)}catch(e){ut(e)}})}function ut(e){if(console.error){console.error(e)}else if(console.log){console.log("ERROR: ",e)}}function lt(e,t,r){e=H(e);if(r==null){r={}}r["elt"]=e;var n=it(t,r);if(D.logger&&!at(t)){D.logger(e,t,r)}if(r.error){ut(r.error);lt(e,"htmx:error",{errorInfo:r})}var i=e.dispatchEvent(n);var o=nt(t);if(i&&o!==t){var a=it(o,n.detail);i=i&&e.dispatchEvent(a)}st(e,function(e){i=i&&e.onEvent(t,n)!==false});return i}var ft=location.pathname+location.search;function ct(){var e=P().querySelector("[hx-history-elt],[data-hx-history-elt]");return e||P().body}function ht(e,t,r,n){var i=x(localStorage.getItem("htmx-history-cache"))||[];for(var o=0;o<i.length;o++){if(i[o].url===e){i.splice(o,1);break}}i.push({url:e,content:t,title:r,scroll:n});while(i.length>D.config.historyCacheSize){i.shift()}while(i.length>0){try{localStorage.setItem("htmx-history-cache",JSON.stringify(i));break}catch(e){ot(P().body,"htmx:historyCacheError",{cause:e,cache:i});i.shift()}}}function dt(e){var t=x(localStorage.getItem("htmx-history-cache"))||[];for(var r=0;r<t.length;r++){if(t[r].url===e){return t[r]}}return null}function vt(e){var t=D.config.requestClass;var r=e.cloneNode(true);B(S(r,"."+t),function(e){R(e,t)});return r.innerHTML}function gt(){var e=ct();var t=ft||location.pathname+location.search;lt(P().body,"htmx:beforeHistorySave",{path:t,historyElt:e});if(D.config.historyEnabled)history.replaceState({htmx:true},P().title,window.location.href);ht(t,vt(e),P().title,window.scrollY)}function pt(e){if(D.config.historyEnabled)history.pushState({htmx:true},"",e);ft=e}function mt(e){B(e,function(e){e.call()})}function yt(n){var e=new XMLHttpRequest;var i={path:n,xhr:e};lt(P().body,"htmx:historyCacheMiss",i);e.open("GET",n,true);e.setRequestHeader("HX-History-Restore-Request","true");e.onload=function(){if(this.status>=200&&this.status<400){lt(P().body,"htmx:historyCacheMissLoad",i);var e=u(this.response);e=e.querySelector("[hx-history-elt],[data-hx-history-elt]")||e;var t=ct();var r=Ft(t);se(t,e,r);mt(r.tasks);ft=n;lt(P().body,"htmx:historyRestore",{path:n})}else{ot(P().body,"htmx:historyCacheMissLoadError",i)}};e.send()}function xt(e){gt();e=e||location.pathname+location.search;var t=dt(e);if(t){var r=u(t.content);var n=ct();var i=Ft(n);se(n,r,i);mt(i.tasks);document.title=t.title;window.scrollTo(0,t.scroll);ft=e;lt(P().body,"htmx:historyRestore",{path:e})}else{if(D.config.refreshOnHistoryMiss){window.location.reload(true)}else{yt(e)}}}function bt(e){var t=X(e,"hx-push-url");return t&&t!=="false"||j(e).boosted&&j(e).pushURL}function wt(e){var t=X(e,"hx-push-url");return t==="true"||t==="false"?null:t}function St(e){var t=X(e,"hx-indicator");if(t){var r=T(e,t)}else{r=[e]}B(r,function(e){e.classList["add"].call(e.classList,D.config.requestClass)});return r}function Et(e){B(e,function(e){e.classList["remove"].call(e.classList,D.config.requestClass)})}function Ct(e,t){for(var r=0;r<e.length;r++){var n=e[r];if(n.isSameNode(t)){return true}}return false}function Rt(e){if(e.name===""||e.name==null||e.disabled){return false}if(e.type==="button"||e.type==="submit"||e.tagName==="image"||e.tagName==="reset"||e.tagName==="file"){return false}if(e.type==="checkbox"||e.type==="radio"){return e.checked}return true}function qt(t,r,n,e,i){if(e==null||Ct(t,e)){return}else{t.push(e)}if(Rt(e)){var o=c(e,"name");var a=e.value;if(e.multiple){a=p(e.querySelectorAll("option:checked")).map(function(e){return e.value})}if(e.files){a=p(e.files)}if(o!=null&&a!=null){var s=r[o];if(s){if(Array.isArray(s)){if(Array.isArray(a)){r[o]=s.concat(a)}else{s.push(a)}}else{if(Array.isArray(a)){r[o]=[s].concat(a)}else{r[o]=[s,a]}}}else{r[o]=a}}if(i){Lt(e,n)}}if(v(e,"form")){var u=e.elements;B(u,function(e){qt(t,r,n,e,i)})}}function Lt(e,t){if(e.willValidate){lt(e,"htmx:validation:validate");if(!e.checkValidity()){t.push({elt:e,message:e.validationMessage,validity:e.validity});lt(e,"htmx:validation:failed",{message:e.validationMessage,validity:e.validity})}}}function Ot(e,t){var r=[];var n={};var i={};var o=[];var a=v(e,"form")&&e.noValidate!==true;if(t!=="get"){qt(r,i,o,O(e,"form"),a)}qt(r,n,o,e,a);var s=j(e);if(s.lastButtonClicked){var u=c(s.lastButtonClicked,"name");if(u){n[u]=s.lastButtonClicked.value}}var l=X(e,"hx-include");if(l){var f=T(e,l);B(f,function(e){qt(r,n,o,e,a);if(!v(e,"form")){B(e.querySelectorAll(Ee),function(e){qt(r,n,o,e,a)})}})}n=V(n,i);return{errors:o,values:n}}function Tt(e,t,r){if(e!==""){e+="&"}e+=encodeURIComponent(t)+"="+encodeURIComponent(r);return e}function At(e){var t="";for(var r in e){if(e.hasOwnProperty(r)){var n=e[r];if(Array.isArray(n)){B(n,function(e){t=Tt(t,r,e)})}else{t=Tt(t,r,n)}}}return t}function Ht(e){var t=new FormData;for(var r in e){if(e.hasOwnProperty(r)){var n=e[r];if(Array.isArray(n)){B(n,function(e){t.append(r,e)})}else{t.append(r,n)}}}return t}function kt(e,t,r){var n={"HX-Request":"true","HX-Trigger":c(e,"id"),"HX-Trigger-Name":c(e,"name"),"HX-Target":F(t,"id"),"HX-Current-URL":P().location.href};Xt(e,"hx-headers",false,n);if(r!==undefined){n["HX-Prompt"]=r}if(j(e).boosted){n["HX-Boosted"]="true"}return n}function Nt(t,e){var r=X(e,"hx-params");if(r){if(r==="none"){return{}}else if(r==="*"){return t}else if(r.indexOf("not ")===0){B(r.substr(4).split(","),function(e){e=e.trim();delete t[e]});return t}else{var n={};B(r.split(","),function(e){e=e.trim();n[e]=t[e]});return n}}else{return t}}function It(e){return c(e,"href")&&c(e,"href").indexOf("#")>=0}function Mt(e){var t=X(e,"hx-swap");var r={swapStyle:j(e).boosted?"innerHTML":D.config.defaultSwapStyle,swapDelay:D.config.defaultSwapDelay,settleDelay:D.config.defaultSettleDelay};if(j(e).boosted&&!It(e)){r["show"]="top"}if(t){var n=y(t);if(n.length>0){r["swapStyle"]=n[0];for(var i=1;i<n.length;i++){var o=n[i];if(o.indexOf("swap:")===0){r["swapDelay"]=h(o.substr(5))}if(o.indexOf("settle:")===0){r["settleDelay"]=h(o.substr(7))}if(o.indexOf("scroll:")===0){var a=o.substr(7);var s=a.split(":");var u=s.pop();var l=s.length>0?s.join(":"):null;r["scroll"]=u;r["scrollTarget"]=l}if(o.indexOf("show:")===0){var f=o.substr(5);var s=f.split(":");var c=s.pop();var l=s.length>0?s.join(":"):null;r["show"]=c;r["showTarget"]=l}}}}return r}function Dt(t,r,n){var i=null;st(r,function(e){if(i==null){i=e.encodeParameters(t,n,r)}});if(i!=null){return i}else{if(X(r,"hx-encoding")==="multipart/form-data"||v(r,"form")&&c(r,"enctype")==="multipart/form-data"){return Ht(n)}else{return At(n)}}}function Ft(e){return{tasks:[],elts:[e]}}function Pt(e,t){var r=e[0];var n=e[e.length-1];if(t.scroll){var i=null;if(t.scrollTarget){i=A(r,t.scrollTarget)}if(t.scroll==="top"&&(r||i)){i=i||r;i.scrollTop=0}if(t.scroll==="bottom"&&(n||i)){i=i||n;i.scrollTop=i.scrollHeight}}if(t.show){var i=null;if(t.showTarget){var o=t.showTarget;if(t.showTarget==="window"){o="body"}i=A(r,o)}if(t.show==="top"&&(r||i)){i=i||r;i.scrollIntoView({block:"start",behavior:D.config.scrollBehavior})}if(t.show==="bottom"&&(n||i)){i=i||n;i.scrollIntoView({block:"end",behavior:D.config.scrollBehavior})}}}function Xt(e,t,r,n){if(n==null){n={}}if(e==null){return n}var i=F(e,t);if(i){var o=i.trim();var a=r;if(o.indexOf("javascript:")===0){o=o.substr(11);a=true}else if(o.indexOf("js:")===0){o=o.substr(3);a=true}if(o.indexOf("{")!==0){o="{"+o+"}"}var s;if(a){s=Ut(e,function(){return Function("return ("+o+")")()},{})}else{s=x(o)}for(var u in s){if(s.hasOwnProperty(u)){if(n[u]==null){n[u]=s[u]}}}}return Xt(l(e),t,r,n)}function Ut(e,t,r){if(D.config.allowEval){return t()}else{ot(e,"htmx:evalDisallowedError");return r}}function jt(e,t){return Xt(e,"hx-vars",true,t)}function Bt(e,t){return Xt(e,"hx-vals",false,t)}function zt(e){return V(jt(e),Bt(e))}function Vt(t,r,n){if(n!==null){try{t.setRequestHeader(r,n)}catch(e){t.setRequestHeader(r,encodeURIComponent(n));t.setRequestHeader(r+"-URI-AutoEncoded","true")}}}function _t(t){if(t.responseURL&&typeof URL!=="undefined"){try{var e=new URL(t.responseURL);return e.pathname+e.search}catch(e){ot(P().body,"htmx:badResponseUrl",{url:t.responseURL})}}}function Wt(e,t){return e.getAllResponseHeaders().match(t)}function $t(e,t,r){e=e.toLowerCase();if(r){if(r instanceof Element||a(r,"String")){return Zt(e,t,null,null,{targetOverride:H(r),returnPromise:true})}else{return Zt(e,t,H(r.source),r.event,{handler:r.handler,headers:r.headers,values:r.values,targetOverride:H(r.target),returnPromise:true})}}else{return Zt(e,t,null,null,{returnPromise:true})}}function Jt(e){var t=[];while(e){t.push(e);e=e.parentElement}return t}function Zt(e,t,n,r,i){var o=null;var a=null;i=i!=null?i:{};if(i.returnPromise&&typeof Promise!=="undefined"){var s=new Promise(function(e,t){o=e;a=t})}if(n==null){n=P().body}var u=i.handler||Gt;if(!z(n)){return}var l=i.targetOverride||_(n);if(l==null){ot(n,"htmx:targetError",{target:F(n,"hx-target")});return}var f=j(n);if(f.requestInFlight){var c="last";if(r){var h=j(r);if(h&&h.triggerSpec&&h.triggerSpec.queue){c=h.triggerSpec.queue}}if(f.queuedRequests==null){f.queuedRequests=[]}if(c==="first"&&f.queuedRequests.length===0){f.queuedRequests.push(function(){Zt(e,t,n,r,i)})}else if(c==="all"){f.queuedRequests.push(function(){Zt(e,t,n,r,i)})}else if(c==="last"){f.queuedRequests=[];f.queuedRequests.push(function(){Zt(e,t,n,r,i)})}return}else{f.requestInFlight=true}var d=function(){f.requestInFlight=false;if(f.queuedRequests!=null&&f.queuedRequests.length>0){var e=f.queuedRequests.shift();e()}};var v=X(n,"hx-prompt");if(v){var g=prompt(v);if(g===null||!lt(n,"htmx:prompt",{prompt:g,target:l})){U(o);d();return s}}var p=X(n,"hx-confirm");if(p){if(!confirm(p)){U(o);d();return s}}var m=new XMLHttpRequest;var y=kt(n,l,g);if(i.headers){y=V(y,i.headers)}var x=Ot(n,e);var b=x.errors;var w=x.values;if(i.values){w=V(w,i.values)}var S=zt(n);var E=V(w,S);var C=Nt(E,n);if(e!=="get"&&X(n,"hx-encoding")==null){y["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8"}if(t==null||t===""){t=P().location.href}var R=Xt(n,"hx-request");var q={parameters:C,unfilteredParameters:E,headers:y,target:l,verb:e,errors:b,withCredentials:i.credentials||R.credentials||D.config.withCredentials,timeout:i.timeout||R.timeout||D.config.timeout,path:t,triggeringEvent:r};if(!lt(n,"htmx:configRequest",q)){U(o);d();return s}t=q.path;e=q.verb;y=q.headers;C=q.parameters;b=q.errors;if(b&&b.length>0){lt(n,"htmx:validation:halted",q);U(o);d();return s}var L=t.split("#");var O=L[0];var T=L[1];if(e==="get"){var A=O;var H=Object.keys(C).length!==0;if(H){if(A.indexOf("?")<0){A+="?"}else{A+="&"}A+=At(C);if(T){A+="#"+T}}m.open("GET",A,true)}else{m.open(e.toUpperCase(),t,true)}m.overrideMimeType("text/html");m.withCredentials=q.withCredentials;m.timeout=q.timeout;if(R.noHeaders){}else{for(var k in y){if(y.hasOwnProperty(k)){var N=y[k];Vt(m,k,N)}}}var I={xhr:m,target:l,requestConfig:q,pathInfo:{path:t,finalPath:A,anchor:T}};m.onload=function(){try{var e=Jt(n);u(n,I);Et(M);lt(n,"htmx:afterRequest",I);lt(n,"htmx:afterOnLoad",I);if(!z(n)){var t=null;while(e.length>0&&t==null){var r=e.shift();if(z(r)){t=r}}if(t){lt(t,"htmx:afterRequest",I);lt(t,"htmx:afterOnLoad",I)}}U(o);d()}catch(e){ot(n,"htmx:onLoadError",V({error:e},I));throw e}};m.onerror=function(){Et(M);ot(n,"htmx:afterRequest",I);ot(n,"htmx:sendError",I);U(a);d()};m.onabort=function(){Et(M);ot(n,"htmx:afterRequest",I);ot(n,"htmx:sendAbort",I);U(a);d()};m.ontimeout=function(){Et(M);ot(n,"htmx:afterRequest",I);ot(n,"htmx:timeout",I);U(a);d()};if(!lt(n,"htmx:beforeRequest",I)){U(o);d();return s}var M=St(n);B(["loadstart","loadend","progress","abort"],function(t){B([m,m.upload],function(e){e.addEventListener(t,function(e){lt(n,"htmx:xhr:"+t,{lengthComputable:e.lengthComputable,loaded:e.loaded,total:e.total})})})});lt(n,"htmx:beforeSend",I);m.send(e==="get"?null:Dt(m,n,C));return s}function Gt(a,s){var u=s.xhr;var l=s.target;if(!lt(a,"htmx:beforeOnLoad",s))return;if(Wt(u,/HX-Trigger:/i)){he(u,"HX-Trigger",a)}if(Wt(u,/HX-Push:/i)){var f=u.getResponseHeader("HX-Push")}if(Wt(u,/HX-Redirect:/i)){window.location.href=u.getResponseHeader("HX-Redirect");return}if(Wt(u,/HX-Refresh:/i)){if("true"===u.getResponseHeader("HX-Refresh")){location.reload();return}}if(Wt(u,/HX-Retarget:/i)){s.target=P().querySelector(u.getResponseHeader("HX-Retarget"))}var c=bt(a)||f;var e=u.status>=200&&u.status<400&&u.status!==204;var h=u.response;var t=u.status>=400;var r=V({shouldSwap:e,serverResponse:h,isError:t},s);if(!lt(l,"htmx:beforeSwap",r))return;l=r.target;h=r.serverResponse;t=r.isError;s.failed=t;s.successful=!t;if(r.shouldSwap){if(u.status===286){Re(a)}st(a,function(e){h=e.transformResponse(h,u,a)});if(c){gt()}var d=Mt(a);l.classList.add(D.config.swappingClass);var n=function(){try{var e=document.activeElement;var t={};try{t={elt:e,start:e?e.selectionStart:null,end:e?e.selectionEnd:null}}catch(e){}var r=Ft(l);ce(d.swapStyle,l,a,h,r);if(t.elt&&!z(t.elt)&&t.elt.id){var n=document.getElementById(t.elt.id);if(n){if(t.start&&n.setSelectionRange){n.setSelectionRange(t.start,t.end)}n.focus()}}l.classList.remove(D.config.swappingClass);B(r.elts,function(e){if(e.classList){e.classList.add(D.config.settlingClass)}lt(e,"htmx:afterSwap",s)});if(s.pathInfo.anchor){location.hash=s.pathInfo.anchor}if(Wt(u,/HX-Trigger-After-Swap:/i)){var i=a;if(!z(a)){i=P().body}he(u,"HX-Trigger-After-Swap",i)}var o=function(){B(r.tasks,function(e){e.call()});B(r.elts,function(e){if(e.classList){e.classList.remove(D.config.settlingClass)}lt(e,"htmx:afterSettle",s)});if(c){var e=f||wt(a)||_t(u)||s.pathInfo.finalPath||s.pathInfo.path;pt(e);lt(P().body,"htmx:pushedIntoHistory",{path:e})}Pt(r.elts,d);if(Wt(u,/HX-Trigger-After-Settle:/i)){var t=a;if(!z(a)){t=P().body}he(u,"HX-Trigger-After-Settle",t)}};if(d.settleDelay>0){setTimeout(o,d.settleDelay)}else{o()}}catch(e){ot(a,"htmx:swapError",s);throw e}};if(d.swapDelay>0){setTimeout(n,d.swapDelay)}else{n()}}if(t){ot(a,"htmx:responseError",V({error:"Response Status Error Code "+u.status+" from "+s.pathInfo.path},s))}}var Kt={};function Yt(){return{onEvent:function(e,t){return true},transformResponse:function(e,t,r){return e},isInlineSwap:function(e){return false},handleSwap:function(e,t,r,n){return false},encodeParameters:function(e,t,r){return null}}}function Qt(e,t){Kt[e]=V(Yt(),t)}function er(e){delete Kt[e]}function tr(e,r,n){if(e==undefined){return r}if(r==undefined){r=[]}if(n==undefined){n=[]}var t=F(e,"hx-ext");if(t){B(t.split(","),function(e){e=e.replace(/ /g,"");if(e.slice(0,7)=="ignore:"){n.push(e.slice(7));return}if(n.indexOf(e)<0){var t=Kt[e];if(t&&r.indexOf(t)<0){r.push(t)}}})}return tr(l(e),r,n)}function rr(e){if(P().readyState!=="loading"){e()}else{P().addEventListener("DOMContentLoaded",e)}}function nr(){if(D.config.includeIndicatorStyles!==false){P().head.insertAdjacentHTML("beforeend","<style>                      ."+D.config.indicatorClass+"{opacity:0;transition: opacity 200ms ease-in;}                      ."+D.config.requestClass+" ."+D.config.indicatorClass+"{opacity:1}                      ."+D.config.requestClass+"."+D.config.indicatorClass+"{opacity:1}                    </style>")}}function ir(){var e=P().querySelector('meta[name="htmx-config"]');if(e){return x(e.content)}else{return null}}function or(){var e=ir();if(e){D.config=V(D.config,e)}}rr(function(){or();nr();var e=P().body;rt(e);window.onpopstate=function(e){if(e.state&&e.state.htmx){xt()}};setTimeout(function(){lt(e,"htmx:load",{})},0)});return D}()});

/***/ }),

/***/ "./node_modules/hyperscript.org/dist/_hyperscript_web.modern.js":
/*!**********************************************************************!*\
  !*** ./node_modules/hyperscript.org/dist/_hyperscript_web.modern.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ y)
/* harmony export */ });
function e(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function t(e,t){var n=e[t];if(n)return n;var r={};return e[t]=r,r}function n(e,t){return new(e.bind.apply(e,[e].concat(t)))}let r;var a=globalThis;class o{constructor(e,t){this._css=e,this.relativeToElement=t}get css(){return l.escapeSelector(this._css)}get className(){return this._css.substr(1)}get id(){return this.className()}contains(e){for(let t of this)if(t.contains(e))return!0;return!1}[Symbol.iterator](){return l.getRootNode(this.relativeToElement).querySelectorAll(this.css)[Symbol.iterator]()}}var i=function(){var e={"+":"PLUS","-":"MINUS","*":"MULTIPLY","/":"DIVIDE",".":"PERIOD","..":"ELLIPSIS","\\":"BACKSLASH",":":"COLON","%":"PERCENT","|":"PIPE","!":"EXCLAMATION","?":"QUESTION","#":"POUND","&":"AMPERSAND",$:"DOLLAR",";":"SEMI",",":"COMMA","(":"L_PAREN",")":"R_PAREN","<":"L_ANG",">":"R_ANG","<=":"LTE_ANG",">=":"GTE_ANG","==":"EQ","===":"EQQ","!=":"NEQ","!==":"NEQQ","{":"L_BRACE","}":"R_BRACE","[":"L_BRACKET","]":"R_BRACKET","=":"EQUALS"};function t(e){return i(e)||o(e)||"-"===e||"_"===e||":"===e}function n(e){return i(e)||o(e)||"-"===e||"_"===e||":"===e}function r(e){return" "===e||"\t"===e||a(e)}function a(e){return"\r"===e||"\n"===e}function o(e){return e>="0"&&e<="9"}function i(e){return e>="a"&&e<="z"||e>="A"&&e<="Z"}function s(e,t){return"_"===e||"$"===e}function l(e,t,n){a();var r=null;function a(){for(;"WHITESPACE"===m(0,!0).type;)t.push(e.shift())}function o(e,t){u.raiseParseError(e,t)}function i(e){if(p()&&p().op&&p().value===e)return c()}function s(e,t,n,r){if(p()&&p().type&&[e,t,n,r].indexOf(p().type)>=0)return c()}function l(e,t){if(-1===h.indexOf(e))return t=t||"IDENTIFIER",p()&&p().value===e&&p().type===t?c():void 0}function c(){var n=e.shift();return t.push(n),r=n,a(),n}function f(n,r){for(var o=[],i=m(0,!0);!(null!=r&&i.type===r||null!=n&&i.value===n||"EOF"===i.type);){var u=e.shift();t.push(u),o.push(i),i=m(0,!0)}return a(),o}function m(t,n){var r,a=0;do{if(!n)for(;e[a]&&"WHITESPACE"===e[a].type;)a++;r=e[a],t--,a++}while(t>-1);return r||{type:"EOF",value:"<<<EOF>>>"}}function p(){return m(0)}var h=[];return{pushFollow:function(e){h.push(e)},popFollow:function(){h.pop()},clearFollow:function(){var e=h;return h=[],e},restoreFollow:function(e){h=e},matchAnyToken:function(e,t,n){for(var r=0;r<arguments.length;r++){var a=arguments[r],o=l(a);if(o)return o}},matchAnyOpToken:function(e,t,n){for(var r=0;r<arguments.length;r++){var a=arguments[r],o=i(a);if(o)return o}},matchOpToken:i,requireOpToken:function(e){var t=i(e);if(t)return t;o(this,"Expected '"+e+"' but found '"+p().value+"'")},matchTokenType:s,requireTokenType:function(e,t,n,r){var a=s(e,t,n,r);if(a)return a;o(this,"Expected one of "+JSON.stringify([e,t,n]))},consumeToken:c,matchToken:l,requireToken:function(e,t){var n=l(e,t);if(n)return n;o(this,"Expected '"+e+"' but found '"+p().value+"'")},list:e,consumed:t,source:n,hasMore:function(){return e.length>0},currentToken:p,lastMatch:function(){return r},token:m,consumeUntil:f,consumeUntilWhitespace:function(){return f(null,"WHITESPACE")},lastWhitespace:function(){return t[t.length-1]&&"WHITESPACE"===t[t.length-1].type?t[t.length-1].value:""},sourceFor:function(){return n.substring(this.startToken.start,this.endToken.end)},lineFor:function(){return n.split("\n")[this.startToken.line-1]}}}function c(e){if(e.length>0){var t=e[e.length-1];if("IDENTIFIER"===t.type||"CLASS_REF"===t.type||"ID_REF"===t.type)return!1;if(t.op&&(">"===t.value||")"===t.value))return!1}return!0}return{tokenize:function(u,f){var m,p=[],h=u,d=0,v=0,E=1,T="<START>",k=0;function y(){return f&&0===k}for(;d<h.length;)if("-"!==R()||"-"!==A()||!r(C())&&""!==C())if(r(R()))p.push(M());else if(P()||"."!==R()||!i(A())&&"{"!==A())if(P()||"#"!==R()||!i(A())&&"{"!==A())if("["===R()&&"@"===A())p.push(q());else if("@"===R())p.push(N());else if(i(R())||!y()&&s(R()))p.push(I());else if(o(R()))p.push(O());else if(y()||'"'!==R()&&"`"!==R())if(y()||"'"!==R()){if(e[R()])"$"===T&&"{"===R()&&k++,"}"===R()&&k--,p.push(L());else if(y()||"`"===(m=R())||"^"===m)p.push(g("RESERVED",F()));else if(d<h.length)throw Error("Unknown token: "+R()+" ")}else c(p)?p.push(S()):p.push(L());else p.push(S());else p.push(w());else p.push(b());else x();return l(p,[],h);function g(e,t){return{type:e,value:t,start:d,end:d+1,column:v,line:E}}function x(){for(;R()&&!a(R());)F();F()}function b(){var e=g("CLASS_REF"),n=F();if("{"===R()){for(e.template=!0,n+=F();R()&&"}"!==R();)n+=F();if("}"!==R())throw Error("Unterminated class reference");n+=F()}else for(;t(R());)n+=F();return e.value=n,e.end=d,e}function q(){for(var e=g("ATTRIBUTE_REF"),t=F();d<h.length&&"]"!==R();)t+=F();return"]"===R()&&(t+=F()),e.value=t,e.end=d,e}function N(){for(var e=g("ATTRIBUTE_REF"),t=F();n(R());)t+=F();return e.value=t,e.end=d,e}function w(){var e=g("ID_REF"),t=F();if("{"===R()){for(e.template=!0,t+=F();R()&&"}"!==R();)t+=F();if("}"!==R())throw Error("Unterminated id reference");F()}else for(;n(R());)t+=F();return e.value=t,e.end=d,e}function I(){for(var e=g("IDENTIFIER"),t=F();i(R())||s(R());)t+=F();return e.value=t,e.end=d,e}function O(){for(var e=g("NUMBER"),t=F();o(R());)t+=F();for("."===R()&&o(A())&&(t+=F());o(R());)t+=F();return e.value=t,e.end=d,e}function L(){for(var t=(r=void 0,(r=g(void 0,void 0)).op=!0,r),n=F();R()&&e[n+R()];)n+=F();var r;return t.type=e[n],t.value=n,t.end=d,t}function S(){for(var e,t=g("STRING"),n=F(),r="";R()&&R()!==n;)"\\"===R()&&F(),r+=F();if(R()!==n)throw Error("Unterminated string at [Line: "+(e=t).line+", Column: "+e.column+"]");return F(),t.value=r,t.end=d,t.template="`"===n,t}function R(){return h.charAt(d)}function A(){return h.charAt(d+1)}function C(){return h.charAt(d+2)}function F(){return T=R(),d++,v++,T}function P(){return i(T)||o(T)||")"===T||"}"===T||"]"===T}function M(){for(var e=g("WHITESPACE"),t="";R()&&r(R());)a(R())&&(v=0,E++),t+=F();return e.value=t,e.end=d,e}},makeTokensObject:l}}(),u=function(){var e={},t={},n={},r=[],a=[];function o(e,t,n){e.startToken=t,e.sourceFor=n.sourceFor,e.lineFor=n.lineFor,e.programSource=n.source}function i(t,n,r){var a=e[t];if(a){var i=n.currentToken(),s=a(u,l,n,r);if(s)for(o(s,i,n),s.endToken=s.endToken||n.lastMatch(),r=s.root;null!=r;)o(r,i,n),r=r.root;return s}}function s(e,t,n,r){var a=i(e,t,r);return a||m(t,n||"Expected "+e),a}function c(e,t){for(var n=0;n<e.length;n++){var r=i(e[n],t);if(r)return r}}function f(t,n){e[t]=n}function m(e,t){t=(t||"Unexpected Token : "+e.currentToken().value)+"\n\n"+function(e){var t=e.currentToken(),n=e.source.split("\n"),r=n[t&&t.line?t.line-1:n.length-1];return r+"\n"+" ".repeat(t&&t.line?t.column:r.length-1)+"^^\n\n"}(e);var n=new Error(t);throw n.tokens=e,n}function p(e){return t[e.value]}function h(e){return n[e.value]}return f("feature",function(e,t,r){if(r.matchOpToken("(")){var a=e.requireElement("feature",r);return r.requireOpToken(")"),a}var o=n[r.currentToken().value];if(o)return o(e,t,r)}),f("command",function(e,n,r){if(r.matchOpToken("(")){const t=e.requireElement("command",r);return r.requireOpToken(")"),t}var a=t[r.currentToken().value];let o;return a?o=a(e,n,r):"IDENTIFIER"===r.currentToken().type&&"("===r.token(1).value&&(o=e.requireElement("pseudoCommand",r)),o?e.parseElement("indirectStatement",r,o):o}),f("commandList",function(e,t,n){var r=e.parseElement("command",n);if(r){n.matchToken("then");const t=e.parseElement("commandList",n);return t&&(r.next=t),r}}),f("leaf",function(e,t,n){var a=c(r,n);return null==a?i("symbol",n):a}),f("indirectExpression",function(e,t,n,r){for(var o=0;o<a.length;o++){var i=a[o];r.endToken=n.lastMatch();var u=e.parseElement(i,n,r);if(u)return u}return r}),f("indirectStatement",function(e,t,n,r){if(n.matchToken("unless")){r.endToken=n.lastMatch();var a={type:"unlessStatementModifier",args:[e.requireElement("expression",n)],op:function(e,t){return t?this.next:r},execute:function(e){return t.unifiedExec(this,e)}};return r.parent=a,a}return r}),f("primaryExpression",function(e,t,n){var r=e.parseElement("leaf",n);if(r)return e.parseElement("indirectExpression",n,r);e.raiseParseError(n,"Unexpected value: "+n.currentToken().value)}),{setParent:function e(t,n){t&&(t.parent=n,e(t.next,n))},requireElement:s,parseElement:i,featureStart:h,commandStart:p,commandBoundary:function(e){return!("end"!=e.value&&"then"!=e.value&&"else"!=e.value&&")"!=e.value&&!p(e)&&!h(e)&&"EOF"!=e.type)},parseAnyOf:c,parseHyperScript:function(e){var t=i("hyperscript",e);if(e.hasMore()&&m(e),t)return t},raiseParseError:m,addGrammarElement:f,addCommand:function(n,r){var a=n+"Command",o=function(e,t,n){const o=r(e,t,n);if(o)return o.type=a,o.execute=function(e){return e.meta.command=o,t.unifiedExec(this,e)},o};e[a]=o,t[n]=o},addFeature:function(t,r){var a=t+"Feature",o=function(e,n,o){var i=r(e,n,o);if(i)return i.keyword=t,i.type=a,i};e[a]=o,n[t]=o},addLeafExpression:function(e,t){r.push(e),f(e,t)},addIndirectExpression:function(e,t){a.push(e),f(e,t)},parseStringTemplate:function(e){var t=[""];do{if(t.push(e.lastWhitespace()),"$"===e.currentToken().value){e.consumeToken();var n=e.matchOpToken("{");t.push(s("expression",e)),n&&e.requireOpToken("}"),t.push("")}else if("\\"===e.currentToken().value)e.consumeToken(),e.consumeToken();else{var r=e.consumeToken();t[t.length-1]+=r?r.value:""}}while(e.hasMore());return t.push(e.lastWhitespace()),t}}}(),s={dynamicResolvers:[],String:function(e){return e.toString?e.toString():""+e},Int:function(e){return parseInt(e)},Float:function(e){return parseFloat(e)},Number:function(e){return console.log(e),Number(e)},Date:function(e){return new Date(e)},Array:function(e){return Array.from(e)},JSON:function(e){return JSON.stringify(e)},Object:function(t){return t instanceof String&&(t=t.toString()),"string"==typeof t?JSON.parse(t):e({},t)}},l=function(){function n(e,t){var n=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector;return n&&n.call(e,t)}function c(e,t,n){(n=n||{}).sentBy=e;var r=function(e,t){var n;return a.Event&&"function"==typeof a.Event?(n=new Event(e,{bubbles:!0,cancelable:!0})).detail=t:(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,t),n}(t,n);return e.dispatchEvent(r)}function f(e){return Array.isArray(e)||"undefined"!=typeof NodeList&&e instanceof NodeList}function m(e){return e instanceof o||f(e)}function p(e,t){if(null==e);else if(function(e){return"object"==typeof e&&Symbol.iterator in e&&"function"==typeof e[Symbol.iterator]}(e))for(const n of e)t(n);else if(f(e))for(var n=0;n<e.length;n++)t(e[n]);else t(e)}var h={array_sentinel:!0};function d(e){for(var t=0;t<e.length;t++){var n=e[t];if(n.asyncWrapper&&(e[t]=n.value),Array.isArray(n))for(var r=0;r<n.length;r++){var a=n[r];a.asyncWrapper&&(n[r]=a.value)}}}var v={};function E(e,t){for(;;){try{var n=T(e,t)}catch(r){if(l.registerHyperTrace(t,r),t.meta.errorHandler&&!t.meta.handlingError){t.meta.handlingError=!0,t[t.meta.errorSymmbol]=r,e=t.meta.errorHandler;continue}if(!t.meta.reject)throw r;t.meta.reject(r),n=v}if(null==n)return void console.error(e," did not return a next element to execute! context: ",t);if(n.then)return void n.then(function(e){E(e,t)}).catch(function(e){if(l.registerHyperTrace(t,e),t.meta.errorHandler&&!t.meta.handlingError)t.meta.handlingError=!0,t[t.meta.errorSymmbol]=e,E(t.meta.errorHandler,t);else{if(!t.meta.reject)throw e;t.meta.reject(e)}});if(n===v)return;e=n}}function T(e,t){var n=[t],r=!1,a=!1;if(e.args)for(var o=0;o<e.args.length;o++){var i=e.args[o];if(null==i)n.push(null);else if(Array.isArray(i)){for(var u=[],s=0;s<i.length;s++){var l=i[s];(c=l?l.evaluate(t):null)&&(c.then?r=!0:c.asyncWrapper&&(a=!0)),u.push(c)}n.push(u)}else if(i.evaluate){var c;(c=i.evaluate(t))&&(c.then?r=!0:c.asyncWrapper&&(a=!0)),n.push(c)}else n.push(i)}return r?new Promise(function(r,o){var i=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];if(Array.isArray(r)){t.push(h);for(var a=0;a<r.length;a++)t.push(r[a]);t.push(h)}else t.push(r)}return t}(n);Promise.all(i).then(function(t){t=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];if(r===h){r=e[++n];var a=[];for(t.push(a);r!==h;)a.push(r),r=e[++n]}else t.push(r)}return t}(t),a&&d(t);try{var n=e.op.apply(e,t);r(n)}catch(e){o(e)}}).catch(function(e){t.meta.errorHandler&&!t.meta.handlingError?(t.meta.handlingError=!0,t[t.meta.errorSymmbol]=e,E(t.meta.errorHandler,t)):t.meta.reject&&t.meta.reject(e)})}):(a&&d(n),e.op.apply(e,n))}let k=null;function y(){return null==k&&(k=r.config.attributes.replace(/ /g,"").split(",")),k}function g(e){for(var t=0;t<y().length;t++){var n=y()[t];if(e.hasAttribute&&e.hasAttribute(n))return e.getAttribute(n)}return e instanceof HTMLScriptElement&&"text/hyperscript"===e.type?e.innerText:null}var x=new WeakMap;function b(e){var t=x.get(e);return void 0===t&&x.set(e,t={}),t}function q(t,n){t&&(e(n,b(t)),q(t.parentElement,n))}function N(e,t,n,r){var o={meta:{parser:u,lexer:i,runtime:l,owner:e,feature:t,iterators:{}},me:n,event:r,target:r?r.target:null,detail:r?r.detail:null,body:"document"in a?document.body:null};return o.meta.ctx=o,q(e,o),o}function w(e){var t=i.tokenize(e);if(u.commandStart(t.currentToken())){for(var n=u.requireElement("commandList",t),r=n;r.next;)r=r.next;return r.next={op:function(){return v}},n}return u.featureStart(t.currentToken())?u.requireElement("hyperscript",t):u.requireElement("expression",t)}function I(e,t){if(!e.closest||!e.closest(r.config.disableSelector)){var n=L(e);if(!n.initialized){var a=g(e);if(a)try{n.initialized=!0,n.script=a;var o=i.tokenize(a),s=u.parseHyperScript(o);if(!s)return;s.apply(t||e,e),setTimeout(function(){c(t||e,"load",{hyperscript:!0})},1)}catch(t){l.triggerEvent(e,"exception",{error:t}),console.error("hyperscript errors were found on the following element:",e,"\n\n",t.message,t.stack)}}}}var O=new WeakMap;function L(e){var t=O.get(e);return void 0===t&&O.set(e,t={}),t}function S(e){var n=e.meta&&e.meta.owner;if(n){var r=L(n),a="elementScope";return e.meta.feature&&e.meta.feature.behavior&&(a=e.meta.feature.behavior+"Scope"),t(r,a)}return{}}return{typeCheck:function(e,t,n){return!(null!=e||!n)||Object.prototype.toString.call(e).slice(8,-1)===t},forEach:p,implicitLoop:function(e,t){if(m(e))for(const n of e)t(n);else t(e)},triggerEvent:c,matchesSelector:n,getScript:g,processNode:function(e){var t=l.getScriptSelector();n(e,t)&&I(e,e),e instanceof HTMLScriptElement&&"text/hyperscript"===e.type&&I(e,document.body),e.querySelectorAll&&p(e.querySelectorAll(t+", [type='text/hyperscript']"),function(e){I(e,e instanceof HTMLScriptElement&&"text/hyperscript"===e.type?document.body:e)})},evaluate:function(t,n,r){class o extends EventTarget{constructor(e){super(),this.module=e}toString(){return this.module.id}}var i="document"in a?a.document.body:new o(r&&r.module);n=e(N(i,null,i,null),n||{});var u=w(t);return u.execute?(u.execute(n),n.result):u.apply?(u.apply(i,i,r),b(i)):u.evaluate(n)},evaluateNoPromise:function(e,t){let n=e.evaluate(t);if(n.next)throw new Error(e.sourceFor()+" returned a Promise in a context that they are not allowed.");return n},parse:w,getScriptSelector:function(){return y().map(function(e){return"["+e+"]"}).join(", ")},resolveSymbol:function(e,t,n){if("me"===e||"my"===e||"I"===e)return t.me;if("it"===e||"its"===e)return t.result;if("you"===e||"your"===e||"yourself"===e)return t.beingTold;if("global"===n)return a[e];if("element"===n)return S(t)[e];if("local"===n)return t[e];if(t.meta&&t.meta.context){var r=t.meta.context[e];if(void 0!==r)return r}var o=t[e];return void 0!==o||void 0!==(o=S(t)[e])?o:a[e]},setSymbol:function(e,t,n,r){if("global"===n)a[e]=r;else if("element"===n)(o=S(t))[e]=r;else if("local"===n)t[e]=r;else{var o,i=t[e];void 0!==i?t[e]=r:void 0!==(i=(o=S(t))[e])?o[e]=r:t[e]=r}},makeContext:N,findNext:function e(t,n){if(t)return t.resolveNext?t.resolveNext(n):t.next?t.next:e(t.parent,n)},unifiedEval:T,convertValue:function(e,t){for(var n=s.dynamicResolvers,r=0;r<n.length;r++){var a=(0,n[r])(t,e);if(void 0!==a)return a}if(null==e)return null;var o=s[t];if(o)return o(e);throw"Unknown conversion : "+t},unifiedExec:E,resolveProperty:function(e,t,n){if(null!=e){var r=n&&e.getAttribute?e.getAttribute(t):e[t];if(void 0!==r)return r;if(m(e)){var a=[];for(var o of e){var i=n?o.getAttribute(t):o[t];i&&a.push(i)}return a}}},assignToNamespace:function(e,t,n,r){let o;for(o="undefined"!=typeof document&&e===document.body?a:b(e);t.length>0;){var i=t.shift(),u=o[i];null==u&&(o[i]=u={}),o=u}o[n]=r},registerHyperTrace:function(e,t){for(var n=[],r=null;null!=e;)n.push(e),r=e,e=e.meta.caller;null==r.meta.traceMap&&(r.meta.traceMap=new Map),r.meta.traceMap.get(t)||r.meta.traceMap.set(t,{trace:n,print:function(e){(e=e||console.error)("hypertrace /// ");for(var t=0,r=0;r<n.length;r++)t=Math.max(t,n[r].meta.feature.displayName.length);for(r=0;r<n.length;r++){var a=n[r];e("  ->",a.meta.feature.displayName.padEnd(t+2),"-",a.meta.owner)}}})},getHyperTrace:function(e,t){for(var n=e;n.meta.caller;)n=n.meta.caller;if(n.meta.traceMap)return n.meta.traceMap.get(t,[])},getInternalData:L,getHyperscriptFeatures:b,escapeSelector:function(e){return e.replace(/:/g,function(e){return"\\"+e})},nullCheck:function(e,t){if(null==e)throw new Error(t.sourceFor()+" is null")},isEmpty:function(e){return null==e||0===e.length},getRootNode:function(e){var t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:document},hyperscriptUrl:"document"in a?"file:///C:/Users/CraigRodway/Code/projects/living-lab-zodiac/client/node_modules/hyperscript.org/dist/_hyperscript_web.modern.js":null,HALT:v}}();{u.addLeafExpression("parenthesized",function(e,t,n){if(n.matchOpToken("(")){var r=n.clearFollow();try{var a=e.requireElement("expression",n)}finally{n.restoreFollow(r)}return n.requireOpToken(")"),a}}),u.addLeafExpression("string",function(e,t,n){var r=n.matchTokenType("STRING");if(r){var a,o=r.value;if(r.template){var u=i.tokenize(o,!0);a=e.parseStringTemplate(u)}else a=[];return{type:"string",token:r,args:a,op:function(e){for(var t="",n=1;n<arguments.length;n++){var r=arguments[n];void 0!==r&&(t+=r)}return t},evaluate:function(e){return 0===a.length?o:t.unifiedEval(this,e)}}}}),u.addGrammarElement("nakedString",function(e,t,n){if(n.hasMore()){var r=n.consumeUntilWhitespace();return n.matchTokenType("WHITESPACE"),{type:"nakedString",tokens:r,evaluate:function(e){return r.map(function(e){return e.value}).join("")}}}}),u.addLeafExpression("number",function(e,t,n){var r=n.matchTokenType("NUMBER");if(r){var a=r,o=parseFloat(r.value);return{type:"number",value:o,numberToken:a,evaluate:function(){return o}}}}),u.addLeafExpression("idRef",function(e,t,n){var r=n.matchTokenType("ID_REF");if(r){if(r.template){var a=r.value.substr(2,r.value.length-2),o=i.tokenize(a);return{type:"idRefTemplate",args:[e.requireElement("expression",o)],op:function(e,n){return t.getRootNode(e.me).getElementById(n)},evaluate:function(e){return t.unifiedEval(this,e)}}}{const e=r.value.substr(1);return{type:"idRef",css:r.value,value:e,evaluate:function(n){return t.getRootNode(n.me).getElementById(e)}}}}}),u.addLeafExpression("classRef",function(e,t,n){var r=n.matchTokenType("CLASS_REF");if(r){if(r.template){var a=r.value.substr(2,r.value.length-2),u=i.tokenize(a);return{type:"classRefTemplate",args:[e.requireElement("expression",u)],op:function(e,t){return new o("."+t,e.me)},evaluate:function(e){return t.unifiedEval(this,e)}}}{const e=r.value;return{type:"classRef",css:e,evaluate:function(t){return new o(e,t.me)}}}}});class r extends o{constructor(e,t,n){super(e,t),this.templateParts=n,this.elements=n.filter(e=>e instanceof Element)}get css(){let e="",t=0;for(const n of this.templateParts)n instanceof Element?e+="[data-hs-query-id='"+t+++"']":e+=n;return e}[Symbol.iterator](){this.elements.forEach((e,t)=>e.dataset.hsQueryId=t);const e=super[Symbol.iterator]();return this.elements.forEach(e=>e.removeAttribute("data-hs-query-id")),e}}u.addLeafExpression("queryRef",function(e,t,n){if(n.matchOpToken("<")){var a=n.consumeUntil("/");n.requireOpToken("/"),n.requireOpToken(">");var u=a.map(function(e){return"STRING"===e.type?'"'+e.value+'"':e.value}).join("");if(u.indexOf("$")>=0)var s=!0,l=i.tokenize(u,!0),c=e.parseStringTemplate(l);return{type:"queryRef",css:u,args:c,op:function(e,...t){return s?new r(u,e.me,t):new o(u,e.me)},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addLeafExpression("attributeRef",function(e,t,n){var r=n.matchTokenType("ATTRIBUTE_REF");if(r){var a=r.value;if(0===a.indexOf("["))var o=a.substring(2,a.length-1);else o=a.substring(1);var i="["+o+"]",u=o.split("="),s=u[0],l=u[1];return l&&0===l.indexOf('"')&&(l=l.substring(1,l.length-1)),{type:"attributeRef",name:s,css:i,value:l,op:function(e){var t=e.beingTold||e.me;if(t)return t.getAttribute(s)},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("objectKey",function(e,t,n){var r;if(r=n.matchTokenType("STRING"))return{type:"objectKey",key:r.value,evaluate:function(){return r.value}};if(n.matchOpToken("[")){var a=e.parseElement("expression",n);return n.requireOpToken("]"),{type:"objectKey",expr:a,args:[a],op:function(e,t){return t},evaluate:function(e){return t.unifiedEval(this,e)}}}var o="";do{(r=n.matchTokenType("IDENTIFIER")||n.matchOpToken("-"))&&(o+=r.value)}while(r);return{type:"objectKey",key:o,evaluate:function(){return o}}}),u.addLeafExpression("objectLiteral",function(e,t,n){if(n.matchOpToken("{")){var r=[],a=[];if(!n.matchOpToken("}")){do{var o=e.requireElement("objectKey",n);n.requireOpToken(":");var i=e.requireElement("expression",n);a.push(i),r.push(o)}while(n.matchOpToken(","));n.requireOpToken("}")}return{type:"objectLiteral",args:[r,a],op:function(e,t,n){for(var r={},a=0;a<t.length;a++)r[t[a]]=n[a];return r},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("nakedNamedArgumentList",function(e,t,n){var r=[],a=[];if("IDENTIFIER"===n.currentToken().type)do{var o=n.requireTokenType("IDENTIFIER");n.requireOpToken(":");var i=e.requireElement("expression",n);a.push(i),r.push({name:o,value:i})}while(n.matchOpToken(","));return{type:"namedArgumentList",fields:r,args:[a],op:function(e,t){for(var n={_namedArgList_:!0},a=0;a<t.length;a++)n[r[a].name.value]=t[a];return n},evaluate:function(e){return t.unifiedEval(this,e)}}}),u.addGrammarElement("namedArgumentList",function(e,t,n){if(n.matchOpToken("(")){var r=e.requireElement("nakedNamedArgumentList",n);return n.requireOpToken(")"),r}}),u.addGrammarElement("symbol",function(e,t,n){var r="default";n.matchToken("global")?r="global":n.matchToken("element")||n.matchToken("module")?(r="element",n.matchOpToken("'")&&n.requireToken("s")):n.matchToken("local")&&(r="local");let a=n.matchOpToken(":"),o=n.matchTokenType("IDENTIFIER");if(o){var i=o.value;return a&&(i=":"+i),"default"===r&&(0===i.indexOf("$")&&(r="global"),0===i.indexOf(":")&&(r="element")),{type:"symbol",token:o,scope:r,name:i,evaluate:function(e){return t.resolveSymbol(i,e,r)}}}}),u.addGrammarElement("implicitMeTarget",function(e,t,n){return{type:"implicitMeTarget",evaluate:function(e){return e.beingTold||e.me}}}),u.addLeafExpression("boolean",function(e,t,n){var r=n.matchToken("true")||n.matchToken("false");if(!r)return;const a="true"===r.value;return{type:"boolean",evaluate:function(e){return a}}}),u.addLeafExpression("null",function(e,t,n){if(n.matchToken("null"))return{type:"null",evaluate:function(e){return null}}}),u.addLeafExpression("arrayLiteral",function(e,t,n){if(n.matchOpToken("[")){var r=[];if(!n.matchOpToken("]")){do{var a=e.requireElement("expression",n);r.push(a)}while(n.matchOpToken(","));n.requireOpToken("]")}return{type:"arrayLiteral",values:r,args:[r],op:function(e,t){return t},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addLeafExpression("blockLiteral",function(e,t,n){if(n.matchOpToken("\\")){var r=[],a=n.matchTokenType("IDENTIFIER");if(a)for(r.push(a);n.matchOpToken(",");)r.push(n.requireTokenType("IDENTIFIER"));n.requireOpToken("-"),n.requireOpToken(">");var o=e.requireElement("expression",n);return{type:"blockLiteral",args:r,expr:o,evaluate:function(e){return function(){for(var t=0;t<r.length;t++)e[r[t].value]=arguments[t];return o.evaluate(e)}}}}}),u.addGrammarElement("timeExpression",function(e,t,n){var r=e.requireElement("expression",n),a=1;return n.matchToken("s")||n.matchToken("seconds")?a=1e3:n.matchToken("ms")||n.matchToken("milliseconds"),{type:"timeExpression",time:r,factor:a,args:[r],op:function(e,t){return t*a},evaluate:function(e){return t.unifiedEval(this,e)}}}),u.addIndirectExpression("propertyAccess",function(e,t,n,r){if(n.matchOpToken(".")){var a=n.requireTokenType("IDENTIFIER");return e.parseElement("indirectExpression",n,{type:"propertyAccess",root:r,prop:a,args:[r],op:function(e,n){return t.resolveProperty(n,a.value,!1)},evaluate:function(e){return t.unifiedEval(this,e)}})}}),u.addIndirectExpression("of",function(e,t,n,r){if(n.matchToken("of")){for(var a=e.requireElement("expression",n),o=null,i=r;i.root;)o=i,i=i.root;"symbol"!==i.type&&"attributeRef"!==i.type&&e.raiseParseError(n,"Cannot take a property of a non-symbol: "+i.type);var u="attributeRef"===i.type,s=i.name,l={type:"ofExpression",prop:i.token,root:a,attribute:u,expression:r,args:[a],op:function(e,n){return t.resolveProperty(n,s,u)},evaluate:function(e){return t.unifiedEval(this,e)}};return"attributeRef"===i.type&&(l.attribute=i),o?(o.root=l,o.args=[l]):r=l,e.parseElement("indirectExpression",n,r)}}),u.addIndirectExpression("possessive",function(e,t,n,r){if(!e.possessivesDisabled){var a=n.matchOpToken("'");if(a||"symbol"===r.type&&("my"===r.name||"its"===r.name||"your"===r.name)&&"IDENTIFIER"===n.currentToken().type){a&&n.requireToken("s");var o=e.parseElement("attributeRef",n);if(null==o)var i=n.requireTokenType("IDENTIFIER");return e.parseElement("indirectExpression",n,{type:"possessive",root:r,attribute:o,prop:i,args:[r],op:function(e,n){if(o)var r=t.resolveProperty(n,o.name,!0);else r=t.resolveProperty(n,i.value,!1);return r},evaluate:function(e){return t.unifiedEval(this,e)}})}}}),u.addIndirectExpression("inExpression",function(e,t,n,r){if(n.matchToken("in")){if("idRef"!==r.type&&"queryRef"===r.type||"classRef"===r.type)var a=!0;var o=e.requireElement("expression",n),i={type:"inExpression",root:r,args:[a?null:r,o],op:function(e,n,o){var i=[];return a?t.forEach(o,function(e){for(var t=e.querySelectorAll(r.css),n=0;n<t.length;n++)i.push(t[n])}):t.forEach(n,function(e){t.forEach(o,function(t){e===t&&i.push(e)})}),i.length>0?i:null},evaluate:function(e){return t.unifiedEval(this,e)}};return e.parseElement("indirectExpression",n,i)}}),u.addIndirectExpression("asExpression",function(e,t,n,r){if(n.matchToken("as")){n.matchToken("a")||n.matchToken("an");var a=e.requireElement("dotOrColonPath",n).evaluate();return e.parseElement("indirectExpression",n,{type:"asExpression",root:r,args:[r],op:function(e,n){return t.convertValue(n,a)},evaluate:function(e){return t.unifiedEval(this,e)}})}}),u.addIndirectExpression("functionCall",function(e,t,n,r){if(n.matchOpToken("(")){var a=[];if(!n.matchOpToken(")")){do{a.push(e.requireElement("expression",n))}while(n.matchOpToken(","));n.requireOpToken(")")}if(r.root)var o={type:"functionCall",root:r,argExressions:a,args:[r.root,a],op:function(e,n,a){t.nullCheck(n,r.root);var o=n[r.prop.value];return t.nullCheck(o,r),o.hyperfunc&&a.push(e),o.apply(n,a)},evaluate:function(e){return t.unifiedEval(this,e)}};else o={type:"functionCall",root:r,argExressions:a,args:[r,a],op:function(e,n,a){return t.nullCheck(n,r),n.hyperfunc&&a.push(e),n.apply(null,a)},evaluate:function(e){return t.unifiedEval(this,e)}};return e.parseElement("indirectExpression",n,o)}}),u.addIndirectExpression("attributeRefAccess",function(e,t,n,r){var a=e.parseElement("attributeRef",n);if(a)return{type:"attributeRefAccess",root:r,attribute:a,args:[r],op:function(e,n){return t.resolveProperty(n,a.name,!0)},evaluate:function(e){return l.unifiedEval(this,e)}}}),u.addIndirectExpression("arrayIndex",function(e,t,n,r){if(n.matchOpToken("[")){var a=!1,o=!1,i=null,s=null;n.matchOpToken("..")?(a=!0,i=e.requireElement("expression",n)):(i=e.requireElement("expression",n),n.matchOpToken("..")&&(o=!0,"R_BRACKET"!==n.currentToken().type&&(s=e.parseElement("expression",n)))),n.requireOpToken("]");var c={type:"arrayIndex",root:r,firstIndex:i,secondIndex:s,args:[r,i,s],op:function(e,t,n,r){return a?t.slice(0,n+1):o?null!=r?t.slice(n,r+1):t.slice(n):t[n]},evaluate:function(e){return l.unifiedEval(this,e)}};return u.parseElement("indirectExpression",n,c)}}),u.addGrammarElement("postfixExpression",function(e,t,n){var r=e.parseElement("primaryExpression",n);if(n.matchOpToken(":")){var a=n.requireTokenType("IDENTIFIER"),o=!n.matchOpToken("!");return{type:"typeCheck",typeName:a,nullOk:o,args:[r],op:function(e,n){if(t.typeCheck(n,a.value,o))return n;throw new Error("Typecheck failed!  Expected: "+a.value)},evaluate:function(e){return t.unifiedEval(this,e)}}}return r}),u.addGrammarElement("logicalNot",function(e,t,n){if(n.matchToken("not")){var r=e.requireElement("unaryExpression",n);return{type:"logicalNot",root:r,args:[r],op:function(e,t){return!t},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("noExpression",function(e,t,n){if(n.matchToken("no")){var r=e.requireElement("unaryExpression",n);return{type:"noExpression",root:r,args:[r],op:function(e,n){return t.isEmpty(n)},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("negativeNumber",function(e,t,n){if(n.matchOpToken("-")){var r=e.requireElement("unaryExpression",n);return{type:"negativeNumber",root:r,args:[r],op:function(e,t){return-1*t},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("unaryExpression",function(e,t,n){return e.parseAnyOf(["logicalNot","relativePositionalExpression","positionalExpression","noExpression","negativeNumber","postfixExpression"],n)});var c=function(e,t,n,r){var a=[];l.forEach(t,function(t){(t.matches(n)||t===e)&&a.push(t)});for(var o=0;o<a.length-1;o++)if(a[o]===e)return a[o+1];if(r){var i=a[0];if(i&&i.matches(n))return i}};function f(e,t,n){if(t.contains)return t.contains(n);if(t.includes)return t.includes(n);throw Error("The value of "+e.sourceFor()+" does not have a contains or includes method on it")}function m(e,t,n){if(t.match)return!!t.match(n);if(t.matches)return t.matches(n);throw Error("The value of "+e.sourceFor()+" does not have a match or matches method on it")}u.addGrammarElement("relativePositionalExpression",function(e,t,n){var r=n.matchAnyToken("next","previous");if(r){if("next"===r.value)var a=!0;var o=e.parseElement("expression",n);if(n.matchToken("from")){n.pushFollow("in");try{var i=e.requireElement("expression",n)}finally{n.popFollow()}}else i=e.requireElement("implicitMeTarget",n);var u,s=!1;if(n.matchToken("in")){s=!0;var l=e.requireElement("expression",n)}else u=n.matchToken("within")?e.requireElement("expression",n):document.body;var f=!1;return n.matchToken("with")&&(n.requireToken("wrapping"),f=!0),{type:"relativePositionalExpression",from:i,forwardSearch:a,inSearch:s,wrapping:f,inElt:l,withinElt:u,operator:r.value,args:[o,i,l,u],op:function(e,t,n,r,o){var i,u,l=t.css;if(null==l)throw"Expected a CSS value";if(s){if(r)return a?c(n,r,l,f):(i=l,u=f,c(n,Array.from(r).reverse(),i,u))}else if(o)return a?function(e,t,n,r){for(var a=t.querySelectorAll(n),o=0;o<a.length;o++){var i=a[o];if(i.compareDocumentPosition(e)===Node.DOCUMENT_POSITION_PRECEDING)return i}if(r)return a[0]}(n,o,l,f):function(e,t,n,r){for(var a=t.querySelectorAll(n),o=a.length-1;o>=0;o--){var i=a[o];if(i.compareDocumentPosition(e)===Node.DOCUMENT_POSITION_FOLLOWING)return i}if(r)return a[a.length-1]}(n,o,l,f)},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("positionalExpression",function(e,t,n){var r=n.matchAnyToken("first","last","random");if(!r)return;n.matchAnyToken("in","from","of");var a=e.requireElement("unaryExpression",n);const o=r.value;return{type:"positionalExpression",rhs:a,operator:r.value,args:[a],op:function(e,t){if(t&&!Array.isArray(t)&&(t=t.children?t.children:Array.from(t)),t){if("first"===o)return t[0];if("last"===o)return t[t.length-1];if("random"===o)return t[Math.floor(Math.random()*t.length)]}},evaluate:function(e){return t.unifiedEval(this,e)}}}),u.addGrammarElement("mathOperator",function(e,t,n){var r,a=e.parseElement("unaryExpression",n),o=null;for(r=n.matchAnyOpToken("+","-","*","/","%");r;){var i=r.value;(o=o||r).value!==i&&e.raiseParseError(n,"You must parenthesize math operations with different operators");var u=e.parseElement("unaryExpression",n);a={type:"mathOperator",lhs:a,rhs:u,operator:i,args:[a,u],op:function(e,t,n){return"+"===i?t+n:"-"===i?t-n:"*"===i?t*n:"/"===i?t/n:"%"===i?t%n:void 0},evaluate:function(e){return t.unifiedEval(this,e)}},r=n.matchAnyOpToken("+","-","*","/","%")}return a}),u.addGrammarElement("mathExpression",function(e,t,n){return e.parseAnyOf(["mathOperator","unaryExpression"],n)}),u.addGrammarElement("comparisonOperator",function(e,t,n){var r=e.parseElement("mathExpression",n),a=n.matchAnyOpToken("<",">","<=",">=","==","===","!=","!=="),o=a?a.value:null,i=!0,u=!1;if(null==o&&(n.matchToken("is")||n.matchToken("am")?n.matchToken("not")?n.matchToken("in")?o="not in":n.matchToken("a")?(o="not a",u=!0):n.matchToken("empty")?(o="not empty",i=!1):o="!=":n.matchToken("in")?o="in":n.matchToken("a")?(o="a",u=!0):n.matchToken("empty")?(o="empty",i=!1):n.matchToken("less")?(n.requireToken("than"),n.matchToken("or")?(n.requireToken("equal"),n.requireToken("to"),o="<="):o="<"):n.matchToken("greater")?(n.requireToken("than"),n.matchToken("or")?(n.requireToken("equal"),n.requireToken("to"),o=">="):o=">"):o="==":n.matchToken("matches")||n.matchToken("match")?o="match":n.matchToken("contains")||n.matchToken("contain")?o="contain":n.matchToken("includes")||n.matchToken("include")?o="include":(n.matchToken("do")||n.matchToken("does"))&&(n.requireToken("not"),n.matchToken("matches")||n.matchToken("match")?o="not match":n.matchToken("contains")||n.matchToken("contain")?o="not contain":n.matchToken("include")?o="not include":e.raiseParseError(n,"Expected matches or contains"))),o){if(u)var s=n.requireTokenType("IDENTIFIER"),l=!n.matchOpToken("!");else if(i){var c=e.requireElement("mathExpression",n);"match"!==o&&"not match"!==o||(c=c.css?c.css:c)}var p=r;r={type:"comparisonOperator",operator:o,typeName:s,nullOk:l,lhs:r,rhs:c,args:[r,c],op:function(e,n,r){if("=="===o)return n==r;if("!="===o)return n!=r;if("match"===o)return null!=n&&m(p,n,r);if("not match"===o)return null==n||!m(p,n,r);if("in"===o)return null!=r&&f(c,r,n);if("not in"===o)return null==r||!f(c,r,n);if("contain"===o)return null!=n&&f(p,n,r);if("not contain"===o)return null==n||!f(p,n,r);if("include"===o)return null!=n&&f(p,n,r);if("not include"===o)return null==n||!f(p,n,r);if("==="===o)return n===r;if("!=="===o)return n!==r;if("<"===o)return n<r;if(">"===o)return n>r;if("<="===o)return n<=r;if(">="===o)return n>=r;if("empty"===o)return t.isEmpty(n);if("not empty"===o)return!t.isEmpty(n);if("a"===o)return t.typeCheck(n,s.value,l);if("not a"===o)return!t.typeCheck(n,s.value,l);throw"Unknown comparison : "+o},evaluate:function(e){return t.unifiedEval(this,e)}}}return r}),u.addGrammarElement("comparisonExpression",function(e,t,n){return e.parseAnyOf(["comparisonOperator","mathExpression"],n)}),u.addGrammarElement("logicalOperator",function(e,t,n){var r,a=e.parseElement("comparisonExpression",n),o=null;for(r=n.matchToken("and")||n.matchToken("or");r;){(o=o||r).value!==r.value&&e.raiseParseError(n,"You must parenthesize logical operations with different operators");var i=e.requireElement("comparisonExpression",n);const u=r.value;a={type:"logicalOperator",operator:u,lhs:a,rhs:i,args:[a,i],op:function(e,t,n){return"and"===u?t&&n:t||n},evaluate:function(e){return t.unifiedEval(this,e)}},r=n.matchToken("and")||n.matchToken("or")}return a}),u.addGrammarElement("logicalExpression",function(e,t,n){return e.parseAnyOf(["logicalOperator","mathExpression"],n)}),u.addGrammarElement("asyncExpression",function(e,t,n){return n.matchToken("async")?{type:"asyncExpression",value:e.requireElement("logicalExpression",n),evaluate:function(e){return{asyncWrapper:!0,value:this.value.evaluate(e)}}}:e.parseElement("logicalExpression",n)}),u.addGrammarElement("expression",function(e,t,n){return n.matchToken("the"),e.parseElement("asyncExpression",n)}),u.addGrammarElement("assignableExpression",function(e,t,n){n.matchToken("the");var r=e.parseElement("primaryExpression",n);return!r||"symbol"!==r.type&&"ofExpression"!==r.type&&"propertyAccess"!==r.type&&"attributeRefAccess"!==r.type&&"attributeRef"!==r.type&&"possessive"!==r.type?(u.raiseParseError(n,"A target expression must be writable.  The expression type '"+(r&&r.type)+"' is not."),r):r}),u.addGrammarElement("hyperscript",function(e,t,n){var r=[];if(n.hasMore())for(;e.featureStart(n.currentToken())||"("===n.currentToken().value;){var a=e.requireElement("feature",n);r.push(a),n.matchToken("end")}return{type:"hyperscript",features:r,apply:function(e,t,n){for(const a of r)a.install(e,t,n)}}});var p=function(e){var t=[];if("("===e.token(0).value&&(")"===e.token(1).value||","===e.token(2).value||")"===e.token(2).value)){e.matchOpToken("(");do{t.push(e.requireTokenType("IDENTIFIER"))}while(e.matchOpToken(","));e.requireOpToken(")")}return t};function h(e,t,n,r){var a=t.requireElement("eventName",r),o=t.parseElement("namedArgumentList",r);if("send"===e&&r.matchToken("to")||"trigger"===e&&r.matchToken("on"))var i=t.requireElement("expression",r);else i=t.requireElement("implicitMeTarget",r);var u={eventName:a,details:o,to:i,args:[i,a,o],op:function(e,t,r,a){return n.forEach(t,function(e){n.triggerEvent(e,r,a||{})}),n.findNext(u,e)}};return u}u.addFeature("on",function(t,n,r){if(r.matchToken("on")){var a=!1;r.matchToken("every")&&(a=!0);var o=[],i=null;do{var u=t.requireElement("eventName",r,"Expected event name").evaluate();i=i?i+" or "+u:"on "+u;var s=p(r),c=null;if(r.matchOpToken("[")&&(c=t.requireElement("expression",r),r.requireOpToken("]")),"NUMBER"===r.currentToken().type){var f=r.consumeToken(),m=parseInt(f.value);if(r.matchToken("to"))var h=r.consumeToken(),d=parseInt(h.value);else if(r.matchToken("and")){var v=!0;r.requireToken("on")}}if("intersection"===u){var E={};if(r.matchToken("with")&&(E.with=t.requireElement("expression",r).evaluate()),r.matchToken("having"))do{r.matchToken("margin")?E.rootMargin=t.requireElement("stringLike",r).evaluate():r.matchToken("threshold")?E.threshold=t.requireElement("expression",r).evaluate():t.raiseParseError(r,"Unknown intersection config specification")}while(r.matchToken("and"))}else if("mutation"===u){var T={};if(r.matchToken("of"))do{if(r.matchToken("anything"))T.attributes=!0,T.subtree=!0,T.characterData=!0,T.childList=!0;else if(r.matchToken("childList"))T.childList=!0;else if(r.matchToken("attributes"))T.attributes=!0,T.attributeOldValue=!0;else if(r.matchToken("subtree"))T.subtree=!0;else if(r.matchToken("characterData"))T.characterData=!0,T.characterDataOldValue=!0;else if("ATTRIBUTE_REF"===r.currentToken().type){var k=r.consumeToken();null==T.attributeFilter&&(T.attributeFilter=[]),0==k.value.indexOf("@")?T.attributeFilter.push(k.value.substring(1)):t.raiseParseError(r,"Only shorthand attribute references are allowed here")}else t.raiseParseError(r,"Unknown mutation config specification")}while(r.matchToken("or"));else T.attributes=!0,T.characterData=!0,T.childList=!0}var y=null,g=!1;if(r.matchToken("from")&&(r.matchToken("elsewhere")?g=!0:(y=t.parseElement("expression",r))||t.raiseParseError(r,'Expected either target value or "elsewhere".')),null===y&&!1===g&&r.matchToken("elsewhere")&&(g=!0),r.matchToken("in"))var x=t.parseAnyOf(["idRef","queryRef","classRef"],r);if(r.matchToken("debounced")){r.requireToken("at");var b=t.requireElement("timeExpression",r).evaluate({})}else if(r.matchToken("throttled")){r.requireToken("at");var q=t.requireElement("timeExpression",r).evaluate({})}o.push({execCount:0,every:a,on:u,args:s,filter:c,from:y,inExpr:x,elsewhere:g,startCount:m,endCount:d,unbounded:v,debounceTime:b,throttleTime:q,mutationSpec:T,intersectionSpec:E,debounced:void 0,lastExec:void 0})}while(r.matchToken("or"));var N=[],w=!0;if(!a&&r.matchToken("queue"))if(r.matchToken("all"))w=!1;else if(r.matchToken("first"))var I=!0;else if(r.matchToken("none"))var O=!0;else r.requireToken("last");var L=t.parseElement("commandList",r),S={type:"implicitReturn",op:function(e){return e.meta.resolve(),n.HALT},execute:function(e){}};if(L){for(var R=L,A=R;A.next;)A=A.next;A.next=S}else R=S;var C={displayName:i,events:o,start:R,every:a,executing:!1,execCount:0,queue:N,execute:function(e){if(this.executing&&!1===a){if(O||I&&N.length>0)return;return w&&(C.queue.length=0),void C.queue.push(e)}C.execCount++,this.executing=!0,e.meta.resolve=function(){C.executing=!1;var e=C.queue.shift();e&&setTimeout(function(){C.execute(e)},1)},e.meta.reject=function(t){console.error(t.message?t.message:t);var r=n.getHyperTrace(e,t);r&&r.print(),n.triggerEvent(e.me,"exception",{error:t}),C.executing=!1;var a=C.queue.shift();a&&setTimeout(function(){C.execute(a)},1)},R.execute(e)},install:function(t,r){for(const r of C.events){var a;a=r.elsewhere?[document]:r.from?r.from.evaluate(n.makeContext(t,C,t,null)):[t],n.forEach(a,function(a){var o=r.on;if(r.mutationSpec&&(o="hyperscript:mutation",new MutationObserver(function(e,t){console.log(a,e),C.executing||l.triggerEvent(a,o,{mutationList:e,observer:t})}).observe(a,r.mutationSpec)),r.intersectionSpec){o="hyperscript:insersection";const t=new IntersectionObserver(function(n){for(const i of n){var r={observer:t};(r=e(r,i)).intersecting=i.isIntersecting,l.triggerEvent(a,o,r)}},r.intersectionSpec);t.observe(a)}(a.addEventListener||a.on).call(a,o,function e(i){if("undefined"!=typeof Node&&t instanceof Node&&a!==t&&!t.isConnected)a.removeEventListener(o,e);else{var u=n.makeContext(t,C,t,i);if(!r.elsewhere||!t.contains(i.target)){r.from&&(u.result=a);for(const e of r.args)u[e.value]=u.event[e.value]||("detail"in u.event?u.event.detail[e.value]:null);if(r.filter){var s=u.meta.context;u.meta.context=u.event;try{if(!r.filter.evaluate(u))return}finally{u.meta.context=s}}if(r.inExpr)for(var l=i.target;;){if(l.matches&&l.matches(r.inExpr.css)){u.result=l;break}if(null==(l=l.parentElement))return}if(r.execCount++,r.startCount)if(r.endCount){if(r.execCount<r.startCount||r.execCount>r.endCount)return}else if(r.unbounded){if(r.execCount<r.startCount)return}else if(r.execCount!==r.startCount)return;if(r.debounceTime)return r.debounced&&clearTimeout(r.debounced),void(r.debounced=setTimeout(function(){C.execute(u)},r.debounceTime));if(r.throttleTime){if(r.lastExec&&Date.now()<r.lastExec+r.throttleTime)return;r.lastExec=Date.now()}C.execute(u)}}})})}}};return t.setParent(R,C),C}}),u.addFeature("def",function(e,t,n){if(n.matchToken("def")){var r=e.requireElement("dotOrColonPath",n).evaluate(),a=r.split("."),o=a.pop(),i=[];if(n.matchOpToken("("))if(n.matchOpToken(")"));else{do{i.push(n.requireTokenType("IDENTIFIER"))}while(n.matchOpToken(","));n.requireOpToken(")")}var u=e.requireElement("commandList",n);if(n.matchToken("catch"))var s=n.requireTokenType("IDENTIFIER").value,l=e.parseElement("commandList",n);var c={displayName:o+"("+i.map(function(e){return e.value}).join(", ")+")",name:o,args:i,start:u,errorHandler:l,errorSymbol:s,install:function(e,n){var f=function(){var r=t.makeContext(n,c,e,null);r.meta.errorHandler=l,r.meta.errorSymmbol=s;for(var a=0;a<i.length;a++){var o=i[a],f=arguments[a];o&&(r[o.value]=f)}r.meta.caller=arguments[i.length],r.meta.caller&&(r.meta.callingCommand=r.meta.caller.meta.command);var m,p=null,h=new Promise(function(e,t){m=e,p=t});return u.execute(r),r.meta.returned?r.meta.returnValue:(r.meta.resolve=m,r.meta.reject=p,h)};f.hyperfunc=!0,f.hypername=r,t.assignToNamespace(e,a,o,f)}},f={type:"implicitReturn",op:function(e){return e.meta.returned=!0,e.meta.resolve&&e.meta.resolve(),t.HALT},execute:function(e){}};if(u){for(var m=u;m.next;)m=m.next;m.next=f}else c.start=f;if(l){for(m=l;m.next;)m=m.next;m.next=f}return e.setParent(u,c),c}}),u.addFeature("set",function(e,t,n){let r=e.parseElement("setCommand",n);var a={type:"implicitReturn",op:function(e){return t.HALT},execute:function(e){}};if(r){"element"!==r.target.scope&&e.raiseParseError(n,"variables declared at the feature level must be element scoped.");let o={start:r,install:function(e,n){r&&r.execute(t.makeContext(e,o,e,null))}};return r.next=a,o}}),u.addFeature("init",function(e,t,n){if(n.matchToken("init")){var r=e.parseElement("commandList",n),a={start:r,install:function(e,n){setTimeout(function(){r&&r.execute(t.makeContext(e,a,e,null))},0)}},o={type:"implicitReturn",op:function(e){return t.HALT},execute:function(e){}};if(r){for(var i=r;i.next;)i=i.next;i.next=o}else a.start=o;return e.setParent(r,a),a}}),u.addFeature("worker",function(e,t,n){n.matchToken("worker")&&e.raiseParseError(n,"In order to use the 'worker' feature, include the _hyperscript worker plugin. See https://hyperscript.org/features/worker/ for more info.")}),u.addFeature("behavior",function(e,n,r){if(r.matchToken("behavior")){var o=e.requireElement("dotOrColonPath",r).evaluate(),i=o.split("."),u=i.pop(),s=[];if(r.matchOpToken("(")&&!r.matchOpToken(")")){do{s.push(r.requireTokenType("IDENTIFIER").value)}while(r.matchOpToken(","));r.requireOpToken(")")}for(var l=e.requireElement("hyperscript",r),c=0;c<l.features.length;c++)l.features[c].behavior=o;return{install:function(e,r){n.assignToNamespace(a.document&&a.document.body,i,u,function(e,r,a){for(var i=t(n.getInternalData(e),o+"Scope"),u=0;u<s.length;u++)i[s[u]]=a[s[u]];l.apply(e,r)})}}}}),u.addFeature("install",function(e,t,n){if(n.matchToken("install")){var r,o=e.requireElement("dotOrColonPath",n).evaluate(),i=o.split("."),u=e.parseElement("namedArgumentList",n);return r={install:function(e,n){t.unifiedEval({args:[u],op:function(t,r){for(var u=a,s=0;s<i.length;s++)if("object"!=typeof(u=u[i[s]])&&"function"!=typeof u)throw new Error("No such behavior defined as "+o);if(!(u instanceof Function))throw new Error(o+" is not a behavior");u(e,n,r)}},t.makeContext(e,r,e))}}}}),u.addGrammarElement("jsBody",function(e,t,n){for(var r=n.currentToken().start,a=n.currentToken(),o=[],i="",u=!1;n.hasMore();){a=n.consumeToken();var s=n.token(0,!0);if("IDENTIFIER"===s.type&&"end"===s.value)break;u?"IDENTIFIER"===a.type||"NUMBER"===a.type?i+=a.value:(""!==i&&o.push(i),i="",u=!1):"IDENTIFIER"===a.type&&"function"===a.value&&(u=!0)}return{type:"jsBody",exposedFunctionNames:o,jsSource:n.source.substring(r,a.end+1)}}),u.addFeature("js",function(t,n,r){if(r.matchToken("js")){var o=t.requireElement("jsBody",r),i=o.jsSource+"\nreturn { "+o.exposedFunctionNames.map(function(e){return e+":"+e}).join(",")+" } ",u=new Function(i);return{jsSource:i,function:u,exposedFunctionNames:o.exposedFunctionNames,install:function(){e(a,u())}}}}),u.addCommand("js",function(e,t,r){if(r.matchToken("js")){var o=[];if(r.matchOpToken("("))if(r.matchOpToken(")"));else{do{var i=r.requireTokenType("IDENTIFIER");o.push(i.value)}while(r.matchOpToken(","));r.requireOpToken(")")}var u=e.requireElement("jsBody",r);r.matchToken("end");var s=n(Function,o.concat([u.jsSource]));return{jsSource:u.jsSource,function:s,inputs:o,op:function(e){var n=[];o.forEach(function(r){n.push(t.resolveSymbol(r,e,"default"))});var r=s.apply(a,n);return r&&"function"==typeof r.then?new Promise(function(n){r.then(function(r){e.result=r,n(t.findNext(this,e))})}):(e.result=r,t.findNext(this,e))}}}}),u.addCommand("async",function(e,t,n){if(n.matchToken("async")){if(n.matchToken("do")){for(var r=a=e.requireElement("commandList",n);r.next;)r=r.next;r.next=t.HALT,n.requireToken("end")}else var a=e.requireElement("command",n);return{body:a,op:function(e){return setTimeout(function(){a.execute(e)}),t.findNext(this,e)}}}}),u.addCommand("tell",function(e,t,n){var r=n.currentToken();if(n.matchToken("tell")){var a=e.requireElement("expression",n),o=e.requireElement("commandList",n);n.hasMore()&&!e.featureStart(n.currentToken())&&n.requireToken("end");var i="tell_"+r.start,u={value:a,body:o,args:[a],resolveNext:function(e){var n=e.meta.iterators[i];return n.index<n.value.length?(e.beingTold=n.value[n.index++],o):(e.beingTold=n.originalBeingTold,this.next?this.next:t.findNext(this.parent,e))},op:function(e,t){return null==t?t=[]:Array.isArray(t)||t instanceof NodeList||(t=[t]),e.meta.iterators[i]={originalBeingTold:e.beingTold,index:0,value:t},this.resolveNext(e)}};return e.setParent(o,u),u}}),u.addCommand("wait",function(e,t,n){if(n.matchToken("wait")){var r,a;if(n.matchToken("for")){n.matchToken("a");var o=[];do{var i=n.token(0);o.push("NUMBER"===i.type||"L_PAREN"===i.type?{time:e.requireElement("timeExpression",n).evaluate()}:{name:u.requireElement("dotOrColonPath",n,"Expected event name").evaluate(),args:p(n)})}while(n.matchToken("or"));if(n.matchToken("from"))var s=e.requireElement("expression",n);return r={event:o,on:s,args:[s],op:function(e,n){var r=n||e.me;if(!(r instanceof EventTarget))throw new Error("Not a valid event target: "+this.on.sourceFor());return new Promise(n=>{var a=!1;for(const u of o){var i=r=>{e.result=r;for(const t of u.args)e[t.value]=r[t.value]||(r.detail?r.detail[t.value]:null);a||(a=!0,n(t.findNext(this,e)))};u.name?r.addEventListener(u.name,i,{once:!0}):u.time&&setTimeout(i,u.time,u.time)}})}},r}return n.matchToken("a")?(n.requireToken("tick"),a=0):a=u.requireElement("timeExpression",n),{type:"waitCmd",time:a,args:[a],op:function(e,n){return new Promise(r=>{setTimeout(()=>{r(t.findNext(this,e))},n)})},execute:function(e){return t.unifiedExec(this,e)}}}}),u.addGrammarElement("dotOrColonPath",function(e,t,n){var r=n.matchTokenType("IDENTIFIER");if(r){var a=[r.value],o=n.matchOpToken(".")||n.matchOpToken(":");if(o)do{a.push(n.requireTokenType("IDENTIFIER").value)}while(n.matchOpToken(o.value));return{type:"dotOrColonPath",path:a,evaluate:function(){return a.join(o?o.value:"")}}}}),u.addGrammarElement("eventName",function(e,t,n){var r;return(r=n.matchTokenType("STRING"))?{evaluate:function(){return r.value}}:e.parseElement("dotOrColonPath",n)}),u.addCommand("trigger",function(e,t,n){if(n.matchToken("trigger"))return h("trigger",e,t,n)}),u.addCommand("send",function(e,t,n){if(n.matchToken("send"))return h("send",e,t,n)});var d=function(e,t,n,r){if(r)var a=e.requireElement("expression",n);var o={value:a,args:[a],op:function(e,n){var r=e.meta.resolve;return e.meta.returned=!0,r?n?r(n):r():(e.meta.returned=!0,e.meta.returnValue=n),t.HALT}};return o};u.addCommand("return",function(e,t,n){if(n.matchToken("return"))return d(e,t,n,!0)}),u.addCommand("exit",function(e,t,n){if(n.matchToken("exit"))return d(e,t,n,!1)}),u.addCommand("halt",function(e,t,n){if(n.matchToken("halt")){if(n.matchToken("the")){n.requireToken("event"),n.matchOpToken("'")&&n.requireToken("s");var r=!0}if(n.matchToken("bubbling"))var a=!0;else if(n.matchToken("default"))var o=!0;var i=d(e,t,n,!1);return{keepExecuting:!0,bubbling:a,haltDefault:o,exit:i,op:function(e){if(e.event)return a?e.event.stopPropagation():(o||e.event.stopPropagation(),e.event.preventDefault()),r?t.findNext(this,e):i}}}}),u.addCommand("log",function(e,t,n){if(n.matchToken("log")){for(var r=[e.parseElement("expression",n)];n.matchOpToken(",");)r.push(e.requireElement("expression",n));if(n.matchToken("with"))var a=e.requireElement("expression",n);var o={exprs:r,withExpr:a,args:[a,r],op:function(e,n,r){return n?n.apply(null,r):console.log.apply(null,r),t.findNext(this,e)}};return o}}),u.addCommand("throw",function(e,t,n){if(n.matchToken("throw")){var r=e.requireElement("expression",n),a={expr:r,args:[r],op:function(e,n){t.registerHyperTrace(e,n);var r=e.meta&&e.meta.reject;if(r)return r(n),t.HALT;throw n}};return a}});var v=function(e,t,n){var r=e.requireElement("expression",n),a={expr:r,args:[r],op:function(e,n){return e.result=n,t.findNext(a,e)}};return a};u.addCommand("call",function(e,t,n){if(n.matchToken("call")){var r=v(e,t,n);return r.expr&&"functionCall"!==r.expr.type&&e.raiseParseError(n,"Must be a function invocation"),r}}),u.addCommand("get",function(e,t,n){if(n.matchToken("get"))return v(e,t,n)}),u.addCommand("make",function(e,t,r){if(r.matchToken("make")){r.matchToken("a")||r.matchToken("an");var a,o=e.requireElement("expression",r),i=[];if("queryRef"!==o.type&&r.matchToken("from"))do{i.push(e.requireElement("expression",r))}while(r.matchOpToken(","));if(r.matchToken("called"))var u=r.requireTokenType("IDENTIFIER").value;return"queryRef"===o.type?a={op:function(e){for(var n,r,a="div",i=[],s=/(?:(^|#|\.)([^#\. ]+))/g;n=s.exec(o.css);)""===n[1]?a=n[2].trim():"#"===n[1]?r=n[2].trim():i.push(n[2].trim());var l=document.createElement(a);void 0!==r&&(l.id=r);for(var c=0;c<i.length;c++)l.classList.add(i[c]);return e.result=l,u&&(e[u]=l),t.findNext(this,e)}}:(a={args:[o,i],op:function(e,r,a){return e.result=n(r,a),u&&(e[u]=e.result),t.findNext(this,e)}},a)}}),u.addGrammarElement("pseudoCommand",function(e,t,n){try{var r=e.requireElement("primaryExpression",n)}finally{n.popFollow()}"functionCall"!==r.type&&"symbol"!==r.root.type&&null!=r.root.root&&e.raiseParseError(n,"Implicit function calls must start with a simple function");var a=r.root.name;if(n.matchAnyToken("the","to","on","with","into","from","at"))var o=e.requireElement("expression",n);else n.matchToken("me")&&(o=e.requireElement("implicitMeTarget",n));var i={type:"pseudoCommand",expr:r,args:[o,r.argExressions],op:function(e,n,r){if(n)var o=n[a];else o=t.resolveSymbol(a,e);o.hyperfunc&&r.push(e);var u=o.apply(n,r);return e.result=u,t.findNext(i,e)},execute:function(e){return t.unifiedExec(this,e)}};return i});var E=function(e,t,n,r,a){var o="symbol"===r.type,i="attributeRef"===r.type;i||o||null!=r.root||e.raiseParseError(n,"Can only put directly into symbols, not references");var u=null,s=null;if(o);else if(i){u=e.requireElement("implicitMeTarget",n);var l=r}else s=r.prop?r.prop.value:null,l=r.attribute,u=r.root;var c={target:r,symbolWrite:o,value:a,args:[u,a],op:function(e,n,a){return o?t.setSymbol(r.name,e,r.scope,a):t.implicitLoop(n,function(e){l?null==a?e.removeAttribute(l.name):e.setAttribute(l.name,a):e[s]=a}),t.findNext(this,e)}};return c};u.addCommand("default",function(e,t,n){if(n.matchToken("default")){var r=e.requireElement("assignableExpression",n);n.requireToken("to");var a=e.requireElement("expression",n),o=E(e,t,n,r,a),i={target:r,value:a,setter:o,args:[r],op:function(e,n){return n?t.findNext(this,e):o}};return o.parent=i,i}}),u.addCommand("set",function(t,n,r){if(r.matchToken("set")){if("L_BRACE"===r.currentToken().type){var a=t.requireElement("objectLiteral",r);r.requireToken("on");var o={objectLiteral:a,target:i=t.requireElement("expression",r),args:[a,i],op:function(t,r,a){return e(a,r),n.findNext(this,t)}};return o}try{r.pushFollow("to");var i=t.requireElement("assignableExpression",r)}finally{r.popFollow()}r.requireToken("to");var u=t.requireElement("expression",r);return E(t,n,r,i,u)}}),u.addCommand("if",function(e,t,n){if(n.matchToken("if")){var r=e.requireElement("expression",n);n.matchToken("then");var a=e.parseElement("commandList",n);if(n.matchToken("else"))var o=e.parseElement("commandList",n);n.hasMore()&&n.requireToken("end");var i={expr:r,trueBranch:a,falseBranch:o,args:[r],op:function(e,n){return n?a:o||t.findNext(this,e)}};return e.setParent(a,i),e.setParent(o,i),i}});var T=function(e,t,n,r){var a,o=t.currentToken();if(t.matchToken("for")||r){var i=t.requireTokenType("IDENTIFIER");a=i.value,t.requireToken("in");var s=e.requireElement("expression",t)}else if(t.matchToken("in"))a="it",s=e.requireElement("expression",t);else if(t.matchToken("while"))var l=e.requireElement("expression",t);else if(t.matchToken("until")){var c=!0;if(t.matchToken("event")){var f=u.requireElement("dotOrColonPath",t,"Expected event name");if(t.matchToken("from"))var m=e.requireElement("expression",t)}else l=e.requireElement("expression",t)}else if(t.matchTokenType("NUMBER")){var p=parseFloat(o.value);t.requireToken("times")}else{t.matchToken("forever");var h=!0}if(t.matchToken("index"))var d=(i=t.requireTokenType("IDENTIFIER")).value;var v=e.parseElement("commandList",t);if(v&&f){for(var E=v;E.next;)E=E.next;var T={type:"waitATick",op:function(){return new Promise(function(e){setTimeout(function(){e(n.findNext(T))},0)})}};E.next=T}if(t.hasMore()&&t.requireToken("end"),null==a)var k=a="_implicit_repeat_"+o.start;else k=a+"_"+o.start;var y={identifier:a,indexIdentifier:d,slot:k,expression:s,forever:h,times:p,until:c,event:f,on:m,whileExpr:l,resolveNext:function(){return this},loop:v,args:[l],op:function(e,t){var r=e.meta.iterators[k],o=!1,i=null;if(this.forever)o=!0;else if(this.until)o=f?!1===e.meta.iterators[k].eventFired:!0!==t;else if(l)o=t;else if(p)o=r.index<this.times;else{var u=r.iterator.next();o=!u.done,i=u.value}return o?(e.result=r.value?e[a]=i:r.index,d&&(e[d]=r.index),r.index++,v):(e.meta.iterators[k]=null,n.findNext(this.parent,e))}};e.setParent(v,y);var g={name:"repeatInit",args:[s,f,m],op:function(e,t,n,r){var a={index:0,value:t,eventFired:!1};return e.meta.iterators[k]=a,t&&t[Symbol.iterator]&&(a.iterator=t[Symbol.iterator]()),f&&(r||e.me).addEventListener(n,function(t){e.meta.iterators[k].eventFired=!0},{once:!0}),y},execute:function(e){return n.unifiedExec(this,e)}};return e.setParent(y,g),g};u.addCommand("repeat",function(e,t,n){if(n.matchToken("repeat"))return T(e,n,t,!1)}),u.addCommand("for",function(e,t,n){if(n.matchToken("for"))return T(e,n,t,!0)}),u.addCommand("continue",function(e,t,n){if(n.matchToken("continue"))return{op:function(t){for(var r=this.parent;;r=r.parent)if(null==r&&e.raiseParseError(n,"Command `continue` cannot be used outside of a `repeat` loop."),null!=r.loop)return r.resolveNext(t)}}}),u.addGrammarElement("stringLike",function(e,t,n){return u.parseAnyOf(["string","nakedString"],n)}),u.addCommand("append",function(e,t,n){if(n.matchToken("append")){var r=null,a=null,o=e.requireElement("expression",n);if(n.matchToken("to")&&(r=e.requireElement("expression",n)),null==r)a="result";else if("symbol"===r.type)a=r.name;else{if("propertyAccess"!==r.type)throw"Unable to append to "+r.type;a=r.prop.value}var i={value:o,target:r,args:[o],op:function(e,n){if(Array.isArray(e[a]))e[a].push(n);else if(e[a]instanceof Element){if("string"!=typeof n)throw"Don't know how to append non-strings to an HTML Element yet.";e[a].innerHTML+=n}else e[a]+=n;return t.findNext(this,e)},execute:function(e){return t.unifiedExec(this,e)}};return i}}),u.addCommand("increment",function(e,t,n){if(n.matchToken("increment")){var r,a=e.parseElement("assignableExpression",n);n.matchToken("by")&&(r=e.requireElement("expression",n));var o={target:a,args:[a,r],op:function(r,o,i){var u=(o=o?parseFloat(o):0)+(i=i?parseFloat(i):1),s=E(e,t,n,a,u);return r.result=u,s.parent=this,s},execute:function(e){return t.unifiedExec(this,e)}};return o}}),u.addCommand("decrement",function(e,t,n){if(n.matchToken("decrement")){var r,a=e.parseElement("assignableExpression",n);n.matchToken("by")&&(r=e.requireElement("expression",n));var o={target:a,args:[a,r],op:function(r,o,i){var u=(o=o?parseFloat(o):0)-(i=i?parseFloat(i):1),s=E(e,t,n,a,u);return r.result=u,s.parent=this,s},execute:function(e){return t.unifiedExec(this,e)}};return o}}),u.addCommand("fetch",function(e,t,n){if(n.matchToken("fetch")){var r=e.requireElement("stringLike",n);if(n.matchToken("with"))var a=e.parseElement("nakedNamedArgumentList",n);else a=e.parseElement("objectLiteral",n);var o,i="text";n.matchToken("as")&&(n.matchToken("a")||n.matchToken("an"),n.matchToken("json")||n.matchToken("Object")?i="json":n.matchToken("response")?i="response":n.matchToken("html")?i="html":n.matchToken("text")||(o=e.requireElement("dotOrColonPath",n).evaluate()));var u={url:r,argExpressions:a,args:[r,a],op:function(e,n,r){var a=r||{};return a.sentBy=e.me,t.triggerEvent(e.me,"hyperscript:beforeFetch",a),r=a,fetch(n,r).then(function(n){return"response"===i?(e.result=n,t.findNext(u,e)):"json"===i?n.json().then(function(n){return e.result=n,t.findNext(u,e)}):n.text().then(function(n){return o&&(n=t.convertValue(n,o)),"html"===i&&(n=t.convertValue(n,"Fragment")),e.result=n,t.findNext(u,e)})}).catch(function(n){throw t.triggerEvent(e.me,"fetch:error",{reason:n}),n})}};return u}})}if("document"in a){var k=Array.from(document.querySelectorAll("script[type='text/hyperscript'][src]"));Promise.all(k.map(function(e){return fetch(e.src).then(function(e){return e.text()}).then(function(e){return l.evaluate(e)})})).then(function(){var t;t=function(){var t,n;(n=(t=document.querySelector('meta[name="htmx-config"]'))?function(e){try{return JSON.parse(e)}catch(e){return t=e,console.error?console.error(t):console.log&&console.log("ERROR: ",t),null}var t}(t.content):null)&&(r.config=e(r.config,n)),l.processNode(document.documentElement),document.addEventListener("htmx:load",function(e){l.processNode(e.detail.elt)})},"loading"!==document.readyState?setTimeout(t):document.addEventListener("DOMContentLoaded",t)})}var y=r=e(function(e,t){return l.evaluate(e,t)},{internals:{lexer:i,parser:u,runtime:l},ElementCollection:o,addFeature:function(e,t){u.addFeature(e,t)},addCommand:function(e,t){u.addCommand(e,t)},addLeafExpression:function(e,t){u.addLeafExpression(e,t)},addIndirectExpression:function(e,t){u.addIndirectExpression(e,t)},evaluate:l.evaluate.bind(l),parse:l.parse.bind(l),processNode:l.processNode.bind(l),config:{attributes:"_, script, data-script",defaultTransition:"all 500ms ease-in",disableSelector:"[disable-scripting], [data-disable-scripting]",conversions:s}});(t=>{t.addCommand("settle",function(e,t,n){if(n.matchToken("settle")){if(e.commandBoundary(n.currentToken()))r=e.requireElement("implicitMeTarget",n);else var r=e.requireElement("expression",n);var a={type:"settleCmd",args:[r],op:function(e,n){var r=null,o=!1,i=new Promise(function(e){r=e});return n.addEventListener("transitionstart",function(){o=!0},{once:!0}),setTimeout(function(){o||r(t.findNext(a,e))},500),n.addEventListener("transitionend",function(){r(t.findNext(a,e))},{once:!0}),i},execute:function(e){return t.unifiedExec(this,e)}};return a}}),t.addCommand("add",function(e,t,n){if(n.matchToken("add")){var r=e.parseElement("classRef",n),a=null,o=null;if(null==r)null==(a=e.parseElement("attributeRef",n))&&null==(o=e.parseElement("styleLiteral",n))&&e.raiseParseError(n,"Expected either a class reference or attribute expression");else for(var i=[r];r=e.parseElement("classRef",n);)i.push(r);if(n.matchToken("to"))var u=e.requireElement("expression",n);else u=e.parseElement("implicitMeTarget",n);return i?{classRefs:i,to:u,args:[u,i],op:function(e,n,r){return t.forEach(r,function(e){t.implicitLoop(n,function(t){t instanceof Element&&t.classList.add(e.className)})}),t.findNext(this,e)}}:a?{type:"addCmd",attributeRef:a,to:u,args:[u],op:function(e,n,r){return t.implicitLoop(n,function(e){e.setAttribute(a.name,a.value)}),t.findNext(this,e)},execute:function(e){return t.unifiedExec(this,e)}}:{type:"addCmd",cssDeclaration:o,to:u,args:[u,o],op:function(e,n,r){return t.implicitLoop(n,function(e){e.style.cssText+=r}),t.findNext(this,e)},execute:function(e){return t.unifiedExec(this,e)}}}}),t.internals.parser.addGrammarElement("styleLiteral",function(e,t,n){if(n.matchOpToken("{")){for(var r=[""],a=[];n.hasMore();){if(n.matchOpToken("\\"))n.consumeToken();else{if(n.matchOpToken("}"))break;if(n.matchToken("$")){var o=n.matchOpToken("{"),i=e.parseElement("expression",n);o&&n.requireOpToken("}"),a.push(i),r.push("")}else{var u=n.consumeToken();r[r.length-1]+=n.source.substring(u.start,u.end)}}r[r.length-1]+=n.lastWhitespace()}return{type:"styleLiteral",args:[a],op:function(e,t){var n="";return r.forEach(function(e,r){n+=e,r in t&&(n+=t[r])}),n},evaluate:function(e){return t.unifiedEval(this,e)}}}}),t.addCommand("remove",function(e,t,n){if(n.matchToken("remove")){var r=e.parseElement("classRef",n),a=null,o=null;if(null==r)null==(a=e.parseElement("attributeRef",n))&&null==(o=e.parseElement("expression",n))&&e.raiseParseError(n,"Expected either a class reference, attribute expression or value expression");else for(var i=[r];r=e.parseElement("classRef",n);)i.push(r);if(n.matchToken("from"))var u=e.requireElement("expression",n);else u=e.requireElement("implicitMeTarget",n);return o?{elementExpr:o,from:u,args:[o],op:function(e,n){return t.implicitLoop(n,function(e){e.parentElement&&e.parentElement.removeChild(e)}),t.findNext(this,e)}}:{classRefs:i,attributeRef:a,elementExpr:o,from:u,args:[i,u],op:function(e,n,r){return n?t.forEach(n,function(e){t.implicitLoop(r,function(t){t.classList.remove(e.className)})}):t.implicitLoop(r,function(e){e.removeAttribute(a.name)}),t.findNext(this,e)}}}}),t.addCommand("toggle",function(e,t,n){if(n.matchToken("toggle")){if(n.matchToken("between")){var r=!0,a=e.parseElement("classRef",n);n.requireToken("and");var o=e.requireElement("classRef",n)}else{a=e.parseElement("classRef",n);var i=null;if(null==a)null==(i=e.parseElement("attributeRef",n))&&e.raiseParseError(n,"Expected either a class reference or attribute expression");else for(var u=[a];a=e.parseElement("classRef",n);)u.push(a)}if(n.matchToken("on"))var s=e.requireElement("expression",n);else s=e.requireElement("implicitMeTarget",n);if(n.matchToken("for"))var l=e.requireElement("timeExpression",n);else if(n.matchToken("until")){var c=e.requireElement("dotOrColonPath",n,"Expected event name");if(n.matchToken("from"))var f=e.requireElement("expression",n)}var m={classRef:a,classRef2:o,classRefs:u,attributeRef:i,on:s,time:l,evt:c,from:f,toggle:function(e,n,a,o){r?t.implicitLoop(e,function(e){e.classList.contains(n.className)?(e.classList.remove(n.className),e.classList.add(a.className)):(e.classList.add(n.className),e.classList.remove(a.className))}):o?t.forEach(o,function(n){t.implicitLoop(e,function(e){e.classList.toggle(n.className)})}):t.forEach(e,function(e){e.hasAttribute(i.name)?e.removeAttribute(i.name):e.setAttribute(i.name,i.value)})},args:[s,l,c,f,a,o,u],op:function(e,n,r,a,o,i,u,s){return r?new Promise(function(a){m.toggle(n,i,u,s),setTimeout(function(){m.toggle(n,i,u,s),a(t.findNext(m,e))},r)}):a?new Promise(function(r){(o||e.me).addEventListener(a,function(){m.toggle(n,i,u,s),r(t.findNext(m,e))},{once:!0}),m.toggle(n,i,u,s)}):(this.toggle(n,i,u,s),t.findNext(m,e))}};return m}});var n={display:function(e,n,r){if(r)n.style.display=r;else if("hide"===e){const e=t.internals.runtime.getInternalData(n);null==e.originalDisplay&&(e.originalDisplay=n.style.display),n.style.display="none"}else{const e=t.internals.runtime.getInternalData(n);e.originalDisplay?n.style.display=e.originalDisplay:n.style.removeProperty("display")}},visibility:function(e,t,n){t.style.visibility=n||("hide"===e?"hidden":"visible")},opacity:function(e,t,n){t.style.opacity=n||("hide"===e?"0":"1")}},r=function(e,t,n){var r=n.currentToken();return"when"===r.value||"with"===r.value||e.commandBoundary(r)?e.parseElement("implicitMeTarget",n):e.parseElement("expression",n)},a=function(r,a,o){var i=t.config.defaultHideShowStrategy,u=n;t.config.hideShowStrategies&&(u=e(u,t.config.hideShowStrategies));var s=u[o=o||i||"display"];return null==s&&r.raiseParseError(a,"Unknown show/hide strategy : "+o),s};function o(e,n,r,a){if(r)var o=e.resolveSymbol(r,n);else o=n;if(o instanceof Element||o instanceof HTMLDocument){for(;o.firstChild;)o.removeChild(o.firstChild);o.append(t.internals.runtime.convertValue(a,"Fragment"))}else{if(!r)throw"Don't know how to put a value into "+typeof n;e.setSymbol(r,n,null,a)}}function i(e,t,n){var r;if(n.matchToken("the")||n.matchToken("element")||n.matchToken("elements")||"CLASS_REF"===n.currentToken().type||"ID_REF"===n.currentToken().type||n.currentToken().op&&"<"===n.currentToken().value){e.possessivesDisabled=!0;try{r=e.parseElement("expression",n)}finally{delete e.possessivesDisabled}n.matchOpToken("'")&&n.requireToken("s")}else if("IDENTIFIER"===n.currentToken().type&&"its"===n.currentToken().value){var a=n.matchToken("its");r={type:"pseudopossessiveIts",token:a,name:a.value,evaluate:function(e){return t.resolveSymbol("it",e)}}}else n.matchToken("my")||n.matchToken("me"),r=e.parseElement("implicitMeTarget",n);return r}t.addCommand("hide",function(e,t,n){if(n.matchToken("hide")){var o=r(e,0,n),i=null;n.matchToken("with")&&(i=n.requireTokenType("IDENTIFIER").value);var u=a(e,n,i);return{target:o,args:[o],op:function(e,n){return t.implicitLoop(n,function(e){u("hide",e)}),t.findNext(this,e)}}}}),t.addCommand("show",function(e,t,n){if(n.matchToken("show")){var o=r(e,0,n),i=null;n.matchToken("with")&&(i=n.requireTokenType("IDENTIFIER").value);var u=null;if(n.matchOpToken(":")){var s=n.consumeUntilWhitespace();n.matchTokenType("WHITESPACE"),u=s.map(function(e){return e.value}).join("")}if(n.matchToken("when"))var l=e.requireElement("expression",n);var c=a(e,n,i);return{target:o,when:l,args:[o],op:function(e,n){return t.implicitLoop(n,function(n){l?(e.result=n,t.evaluateNoPromise(l,e)?c("show",n,u):c("hide",n),e.result=null):c("show",n,u)}),t.findNext(this,e)}}}}),t.addCommand("take",function(e,t,n){if(n.matchToken("take")){var r=e.parseElement("classRef",n);if(n.matchToken("from"))var a=e.requireElement("expression",n);else a=r;if(n.matchToken("for"))var o=e.requireElement("expression",n);else o=e.requireElement("implicitMeTarget",n);var i={classRef:r,from:a,forElt:o,args:[r,a,o],op:function(e,n,r,a){var o=n.className;return t.implicitLoop(r,function(e){e.classList.remove(o)}),t.implicitLoop(a,function(e){e.classList.add(o)}),t.findNext(this,e)}};return i}}),t.addCommand("put",function(e,t,n){if(n.matchToken("put")){var r=e.requireElement("expression",n),a=n.matchAnyToken("into","before","after");null==a&&n.matchToken("at")&&(n.matchToken("the"),a=n.matchAnyToken("start","end"),n.requireToken("of")),null==a&&e.raiseParseError(n,"Expected one of 'into', 'before', 'at start of', 'at end of', 'after'");var i=e.requireElement("expression",n),u=a.value,s=!1,l=null,c=null;if(i.prop&&i.root&&"into"===u)c=i.prop.value,l=i.root;else if("symbol"===i.type&&"into"===u)s=!0,c=i.name;else if("attributeRef"===i.type&&"into"===u){var f=!0;c=i.name,l=e.requireElement("implicitMeTarget",n)}else i.attribute&&"into"===u?(f=!0,c=i.attribute.name,l=i.root):l=i;return{target:i,operation:u,symbolWrite:s,value:r,args:[l,r],op:function(e,n,r){if(s)o(t,e,c,r);else if("into"===u)t.implicitLoop(n,f?function(e){e.setAttribute(c,r)}:function(e){o(t,e,c,r)});else{var a="before"===u?Element.prototype.before:"after"===u?Element.prototype.after:"start"===u?Element.prototype.prepend:Element.prototype.append;n&&t.implicitLoop(n,function(e){a.call(e,r instanceof Node?r:t.convertValue(r,"Fragment"))})}return t.findNext(this,e)}}}}),t.addCommand("transition",function(e,n,r){if(r.matchToken("transition")){for(var a=i(e,n,r),o=[],u=[],s=[],l=r.currentToken();!e.commandBoundary(l)&&"over"!==l.value&&"using"!==l.value;)o.push(e.requireElement("stringLike",r)),r.matchToken("from")?u.push(e.requireElement("stringLike",r)):u.push(null),r.requireToken("to"),s.push(e.requireElement("stringLike",r)),l=r.currentToken();if(r.matchToken("over"))var c=e.requireElement("timeExpression",r);else if(r.matchToken("using"))var f=e.requireElement("expression",r);var m={to:s,args:[a,o,u,s,f,c],op:function(e,r,a,o,i,u,s){var l=[];return n.implicitLoop(r,function(e){var r=new Promise(function(r,l){var c=e.style.transition;e.style.transition=s?"all "+s+"ms ease-in":u||t.config.defaultTransition;for(var f=n.getInternalData(e),m=getComputedStyle(e),p={},h=0;h<m.length;h++){var d=m[h];p[d]=m[d]}for(f.initalStyles||(f.initalStyles=p),h=0;h<a.length;h++){var v=a[h],E=o[h];e.style[v]="computed"===E||null==E?p[v]:E}var T=!1,k=!1;e.addEventListener("transitionend",function(){k||(e.style.transition=c,k=!0,r())},{once:!0}),e.addEventListener("transitionstart",function(){T=!0},{once:!0}),setTimeout(function(){k||T||(e.style.transition=c,k=!0,r())},100),setTimeout(function(){for(var t=0;t<a.length;t++){var n=a[t],r=i[t];e.style[n]="initial"===r?f.initalStyles[n]:r}},0)});l.push(r)}),Promise.all(l).then(function(){return n.findNext(m,e)})}};return m}}),t.addCommand("measure",function(e,t,n){if(n.matchToken("measure")){var r=i(e,t,n),a=[];if(!e.commandBoundary(n.currentToken()))do{a.push(n.matchTokenType("IDENTIFIER").value)}while(n.matchOpToken(","));return{properties:a,args:[r],op:function(e,n){0 in n&&(n=n[0]);var r=n.getBoundingClientRect(),o={top:n.scrollTop,left:n.scrollLeft,topMax:n.scrollTopMax,leftMax:n.scrollLeftMax,height:n.scrollHeight,width:n.scrollWidth};return e.result={x:r.x,y:r.y,left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height,bounds:r,scrollLeft:o.left,scrollTop:o.top,scrollLeftMax:o.leftMax,scrollTopMax:o.topMax,scrollWidth:o.width,scrollHeight:o.height,scroll:o},t.forEach(a,function(t){if(!(t in e.result))throw"No such measurement as "+t;e[t]=e.result[t]}),t.findNext(this,e)}}}}),t.addLeafExpression("closestExpr",function(e,t,n){if(n.matchToken("closest")){if(n.matchToken("parent"))var r=!0;var a=null;if("ATTRIBUTE_REF"===n.currentToken().type){var o=e.parseElement("attributeRefAccess",n,null);a="["+o.attribute.name+"]"}if(null==a){var i=e.parseElement("expression",n);null==i.css?e.raiseParseError(n,"Expected a CSS expression"):a=i.css}if(n.matchToken("to"))var u=e.parseElement("expression",n);else u=e.parseElement("implicitMeTarget",n);var s={type:"closestExpr",parentSearch:r,expr:i,css:a,to:u,args:[u],op:function(e,t){if(null!=t&&t instanceof Element){if(r)var n=t.parentElement?t.parentElement.closest(a):null;else n=t.closest(a);return n}return null},evaluate:function(e){return t.unifiedEval(this,e)}};return o?(o.root=s,o.args=[s],o):s}}),t.addCommand("go",function(e,t,n){if(n.matchToken("go")){if(n.matchToken("back"))var r=!0;else if(n.matchToken("to"),n.matchToken("url")){var a=e.requireElement("stringLike",n),o=!0;if(n.matchToken("in")){n.requireToken("new"),n.requireToken("window");var i=!0}}else{n.matchToken("the");var u=n.matchAnyToken("top","bottom","middle"),s=n.matchAnyToken("left","center","right");(u||s)&&n.requireToken("of"),a=e.requireElement("expression",n);var l=n.matchAnyToken("smoothly","instantly"),c={};u&&("top"===u.value?c.block="start":"bottom"===u.value?c.block="end":"middle"===u.value&&(c.block="center")),s&&("left"===s.value?c.inline="start":"center"===s.value?c.inline="center":"right"===s.value&&(c.inline="end")),l&&("smoothly"===l.value?c.behavior="smooth":"instantly"===l.value&&(c.behavior="instant"))}var f={target:a,args:[a],op:function(e,n){return r?window.history.back():o?n&&(0!==n.indexOf("#")||i?window.open(n,i?"_blank":null):window.location.href=n):t.forEach(n,function(e){e.scrollIntoView(c)}),t.findNext(f)}};return f}}),t.config.conversions.Values=function(e){var n={};return(0,t.internals.runtime.implicitLoop)(e,function(e){var t=a(e);void 0===t?null!=e.querySelectorAll&&e.querySelectorAll("input,select,textarea").forEach(r):n[t.name]=t.value}),n;function r(e){var t=a(e);null!=t&&(null!=n[t.name]?Array.isArray(n[t.name])&&Array.isArray(t.value)&&(n[t.name]=[].concat(n[t.name],t.value)):n[t.name]=t.value)}function a(e){try{var t={name:e.name,value:e.value};if(null==t.name||null==t.value)return;if("radio"==e.type&&0==e.checked)return;if("checkbox"==e.type&&(0==e.checked?t.value=void 0:"string"==typeof t.value&&(t.value=[t.value])),"select-multiple"==e.type){var n=e.querySelectorAll("option[selected]");t.value=[];for(var r=0;r<n.length;r++)t.value.push(n[r].value)}return t}catch(e){return}}},t.config.conversions.HTML=function(e){return function e(t){if(t instanceof Array)return t.map(function(t){return e(t)}).join("");if(t instanceof HTMLElement)return t.outerHTML;if(t instanceof NodeList){for(var n="",r=0;r<t.length;r++){var a=t[r];a instanceof HTMLElement&&(n+=a.outerHTML)}return n}return t.toString?t.toString():""}(e)},t.config.conversions.Fragment=function(e){var n=document.createDocumentFragment();return t.internals.runtime.implicitLoop(e,function(e){if(e instanceof Node)n.append(e);else{var t=document.createElement("template");t.innerHTML=e,n.append(t.content)}}),n}})(y);
//# sourceMappingURL=_hyperscript_web.modern.js.map


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./css/main.scss":
/*!***********************!*\
  !*** ./css/main.scss ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/parseqs/index.js":
/*!***************************************!*\
  !*** ./node_modules/parseqs/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),

/***/ "./node_modules/parseuri/index.js":
/*!****************************************!*\
  !*** ./node_modules/parseuri/index.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);

    return uri;
};

function pathNames(obj, path) {
    var regx = /\/{2,9}/g,
        names = path.replace(regx, "/").split("/");

    if (path.substr(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == '/') {
        names.splice(names.length - 1, 1);
    }

    return names;
}

function queryKey(uri, query) {
    var data = {};

    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });

    return data;
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/yeast/index.js":
/*!*************************************!*\
  !*** ./node_modules/yeast/index.js ***!
  \*************************************/
/***/ ((module) => {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/globalThis.browser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})();


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.installTimerFunctions = exports.transports = exports.Transport = exports.protocol = exports.Socket = void 0;
const socket_js_1 = __webpack_require__(/*! ./socket.js */ "./node_modules/engine.io-client/build/cjs/socket.js");
Object.defineProperty(exports, "Socket", ({ enumerable: true, get: function () { return socket_js_1.Socket; } }));
exports.protocol = socket_js_1.Socket.protocol;
var transport_js_1 = __webpack_require__(/*! ./transport.js */ "./node_modules/engine.io-client/build/cjs/transport.js");
Object.defineProperty(exports, "Transport", ({ enumerable: true, get: function () { return transport_js_1.Transport; } }));
var index_js_1 = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/cjs/transports/index.js");
Object.defineProperty(exports, "transports", ({ enumerable: true, get: function () { return index_js_1.transports; } }));
var util_js_1 = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
Object.defineProperty(exports, "installTimerFunctions", ({ enumerable: true, get: function () { return util_js_1.installTimerFunctions; } }));


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/socket.js":
/*!***********************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/socket.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Socket = void 0;
const index_js_1 = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/cjs/transports/index.js");
const util_js_1 = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
const parseqs_1 = __importDefault(__webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js"));
const parseuri_1 = __importDefault(__webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js"));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const engine_io_parser_1 = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/cjs/index.js");
const debug = (0, debug_1.default)("engine.io-client:socket"); // debug()
class Socket extends component_emitter_1.Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri or options
     * @param {Object} opts - options
     * @api public
     */
    constructor(uri, opts = {}) {
        super();
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = (0, parseuri_1.default)(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
                opts.query = uri.query;
        }
        else if (opts.host) {
            opts.hostname = (0, parseuri_1.default)(opts.host).host;
        }
        (0, util_js_1.installTimerFunctions)(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        this.transports = opts.transports || ["polling", "websocket"];
        this.readyState = "";
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
        if (typeof this.opts.query === "string") {
            this.opts.query = parseqs_1.default.decode(this.opts.query);
        }
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                addEventListener("beforeunload", () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                }, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = () => {
                    this.onClose("transport close");
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} transport name
     * @return {Transport}
     * @api private
     */
    createTransport(name) {
        debug('creating transport "%s"', name);
        const query = clone(this.opts.query);
        // append engine.io protocol identifier
        query.EIO = engine_io_parser_1.protocol;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        });
        debug("options: %j", opts);
        return new index_js_1.transports[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @api private
     */
    open() {
        let transport;
        if (this.opts.rememberUpgrade &&
            Socket.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
        }
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        else {
            transport = this.transports[0];
        }
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        }
        catch (e) {
            debug("error while creating transport: %s", e);
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @api private
     */
    setTransport(transport) {
        debug("setting transport %s", transport.name);
        if (this.transport) {
            debug("clearing existing transport %s", this.transport.name);
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this.onDrain.bind(this))
            .on("packet", this.onPacket.bind(this))
            .on("error", this.onError.bind(this))
            .on("close", () => {
            this.onClose("transport close");
        });
    }
    /**
     * Probes a transport.
     *
     * @param {String} transport name
     * @api private
     */
    probe(name) {
        debug('probing transport "%s"', name);
        let transport = this.createTransport(name);
        let failed = false;
        Socket.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            debug('probe transport "%s" opened', name);
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", msg => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    debug('probe transport "%s" pong', name);
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    Socket.priorWebsocketSuccess = "websocket" === transport.name;
                    debug('pausing current transport "%s"', this.transport.name);
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        debug("changing transport and sending upgrade packet");
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    debug('probe transport "%s" failed', name);
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = err => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            debug('probe transport "%s" failed because of error: %s', name, err);
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                debug('"%s" works - aborting "%s"', to.name, transport.name);
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
    }
    /**
     * Called when connection is deemed open.
     *
     * @api private
     */
    onOpen() {
        debug("socket open");
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState &&
            this.opts.upgrade &&
            this.transport.pause) {
            debug("starting upgrade probes");
            let i = 0;
            const l = this.upgrades.length;
            for (; i < l; i++) {
                this.probe(this.upgrades[i]);
            }
        }
    }
    /**
     * Handles a packet.
     *
     * @api private
     */
    onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.resetPingTimeout();
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
        else {
            debug('packet received with socket readyState "%s"', this.readyState);
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @api private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @api private
     */
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @api private
     */
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @api private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            debug("flushing %d packets in socket", this.writeBuffer.length);
            this.transport.send(this.writeBuffer);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = this.writeBuffer.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Sends a message.
     *
     * @param {String} message.
     * @param {Function} callback function.
     * @param {Object} options.
     * @return {Socket} for chaining.
     * @api public
     */
    write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} callback function.
     * @api private
     */
    sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     *
     * @api public
     */
    close() {
        const close = () => {
            this.onClose("forced close");
            debug("socket closing - telling transport to close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @api private
     */
    onError(err) {
        debug("socket error %j", err);
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @api private
     */
    onClose(reason, desc) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            debug('socket close with reason: "%s"', reason);
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, desc);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} server upgrades
     * @api private
     *
     */
    filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
exports.Socket = Socket;
Socket.protocol = engine_io_parser_1.protocol;
function clone(obj) {
    const o = {};
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = obj[i];
        }
    }
    return o;
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transport.js":
/*!**************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transport.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Transport = void 0;
const engine_io_parser_1 = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/cjs/index.js");
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const util_js_1 = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = (0, debug_1.default)("engine.io-client:transport"); // debug()
class Transport extends component_emitter_1.Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} options.
     * @api private
     */
    constructor(opts) {
        super();
        this.writable = false;
        (0, util_js_1.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.readyState = "";
        this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} str
     * @return {Transport} for chaining
     * @api protected
     */
    onError(msg, desc) {
        const err = new Error(msg);
        // @ts-ignore
        err.type = "TransportError";
        // @ts-ignore
        err.description = desc;
        super.emit("error", err);
        return this;
    }
    /**
     * Opens the transport.
     *
     * @api public
     */
    open() {
        if ("closed" === this.readyState || "" === this.readyState) {
            this.readyState = "opening";
            this.doOpen();
        }
        return this;
    }
    /**
     * Closes the transport.
     *
     * @api public
     */
    close() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     * @api public
     */
    send(packets) {
        if ("open" === this.readyState) {
            this.write(packets);
        }
        else {
            // this might happen if the transport was silently closed in the beforeunload event handler
            debug("transport is not open, discarding packets");
        }
    }
    /**
     * Called upon open
     *
     * @api protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emit("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @api protected
     */
    onData(data) {
        const packet = (0, engine_io_parser_1.decodePacket)(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @api protected
     */
    onPacket(packet) {
        super.emit("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @api protected
     */
    onClose() {
        this.readyState = "closed";
        super.emit("close");
    }
}
exports.Transport = Transport;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transports = void 0;
const polling_xhr_js_1 = __webpack_require__(/*! ./polling-xhr.js */ "./node_modules/engine.io-client/build/cjs/transports/polling-xhr.js");
const websocket_js_1 = __webpack_require__(/*! ./websocket.js */ "./node_modules/engine.io-client/build/cjs/transports/websocket.js");
exports.transports = {
    websocket: websocket_js_1.WS,
    polling: polling_xhr_js_1.XHR
};


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/polling-xhr.js":
/*!***************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/polling-xhr.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/* global attachEvent */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Request = exports.XHR = void 0;
const xmlhttprequest_js_1 = __importDefault(__webpack_require__(/*! ./xmlhttprequest.js */ "./node_modules/engine.io-client/build/cjs/transports/xmlhttprequest.browser.js"));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const globalThis_js_1 = __importDefault(__webpack_require__(/*! ../globalThis.js */ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js"));
const util_js_1 = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const polling_js_1 = __webpack_require__(/*! ./polling.js */ "./node_modules/engine.io-client/build/cjs/transports/polling.js");
const debug = (0, debug_1.default)("engine.io-client:polling-xhr"); // debug()
/**
 * Empty function
 */
function empty() { }
const hasXHR2 = (function () {
    const xhr = new xmlhttprequest_js_1.default({
        xdomain: false
    });
    return null != xhr.responseType;
})();
class XHR extends polling_js_1.Polling {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @api public
     */
    constructor(opts) {
        super(opts);
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
            this.xs = opts.secure !== isSSL;
        }
        /**
         * XHR supports binary
         */
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @api private
     */
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
        return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @api private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data
        });
        req.on("success", fn);
        req.on("error", err => {
            this.onError("xhr post error", err);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @api private
     */
    doPoll() {
        debug("xhr poll");
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", err => {
            this.onError("xhr poll error", err);
        });
        this.pollXhr = req;
    }
}
exports.XHR = XHR;
class Request extends component_emitter_1.Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @api public
     */
    constructor(uri, opts) {
        super();
        (0, util_js_1.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = false !== opts.async;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @api private
     */
    create() {
        const opts = (0, util_js_1.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = (this.xhr = new xmlhttprequest_js_1.default(opts));
        try {
            debug("xhr open %s: %s", this.method, this.uri);
            xhr.open(this.method, this.uri, this.async);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this.opts.extraHeaders) {
                        if (this.opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this.method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
                xhr.timeout = this.opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this.onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            debug("xhr data %s", this.data);
            xhr.send(this.data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
        }
    }
    /**
     * Called upon successful response.
     *
     * @api private
     */
    onSuccess() {
        this.emit("success");
        this.cleanup();
    }
    /**
     * Called if we have data.
     *
     * @api private
     */
    onData(data) {
        this.emit("data", data);
        this.onSuccess();
    }
    /**
     * Called upon error.
     *
     * @api private
     */
    onError(err) {
        this.emit("error", err);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @api private
     */
    cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
            return;
        }
        this.xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this.xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this.index];
        }
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @api private
     */
    onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.onData(data);
        }
    }
    /**
     * Aborts the request.
     *
     * @api public
     */
    abort() {
        this.cleanup();
    }
}
exports.Request = Request;
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in globalThis_js_1.default ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/polling.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/polling.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Polling = void 0;
const transport_js_1 = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/cjs/transport.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const yeast_1 = __importDefault(__webpack_require__(/*! yeast */ "./node_modules/yeast/index.js"));
const parseqs_1 = __importDefault(__webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js"));
const engine_io_parser_1 = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/cjs/index.js");
const debug = (0, debug_1.default)("engine.io-client:polling"); // debug()
class Polling extends transport_js_1.Transport {
    constructor() {
        super(...arguments);
        this.polling = false;
    }
    /**
     * Transport name.
     */
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @api private
     */
    doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} callback upon buffers are flushed and transport is paused
     * @api private
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            debug("paused");
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                debug("we are currently polling - waiting to pause");
                total++;
                this.once("pollComplete", function () {
                    debug("pre-pause polling complete");
                    --total || pause();
                });
            }
            if (!this.writable) {
                debug("we are currently writing - waiting to pause");
                total++;
                this.once("drain", function () {
                    debug("pre-pause writing complete");
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @api public
     */
    poll() {
        debug("polling");
        this.polling = true;
        this.doPoll();
        this.emit("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @api private
     */
    onData(data) {
        debug("polling got data %s", data);
        const callback = packet => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose();
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0, engine_io_parser_1.decodePayload)(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emit("pollComplete");
            if ("open" === this.readyState) {
                this.poll();
            }
            else {
                debug('ignoring poll - transport state "%s"', this.readyState);
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @api private
     */
    doClose() {
        const close = () => {
            debug("writing close packet");
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            debug("transport open - closing");
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            debug("transport not open - deferring close");
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} data packets
     * @param {Function} drain callback
     * @api private
     */
    write(packets) {
        this.writable = false;
        (0, engine_io_parser_1.encodePayload)(packets, data => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emit("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = "";
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, yeast_1.default)();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        // avoid port if default for schema
        if (this.opts.port &&
            (("https" === schema && Number(this.opts.port) !== 443) ||
                ("http" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        const encodedQuery = parseqs_1.default.encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
}
exports.Polling = Polling;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/websocket-constructor.browser.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/websocket-constructor.browser.js ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultBinaryType = exports.usingBrowserWebSocket = exports.WebSocket = exports.nextTick = void 0;
const globalThis_js_1 = __importDefault(__webpack_require__(/*! ../globalThis.js */ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js"));
exports.nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return cb => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
exports.WebSocket = globalThis_js_1.default.WebSocket || globalThis_js_1.default.MozWebSocket;
exports.usingBrowserWebSocket = true;
exports.defaultBinaryType = "arraybuffer";


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/websocket.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/websocket.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WS = void 0;
const transport_js_1 = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/cjs/transport.js");
const parseqs_1 = __importDefault(__webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js"));
const yeast_1 = __importDefault(__webpack_require__(/*! yeast */ "./node_modules/yeast/index.js"));
const util_js_1 = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
const websocket_constructor_js_1 = __webpack_require__(/*! ./websocket-constructor.js */ "./node_modules/engine.io-client/build/cjs/transports/websocket-constructor.browser.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const engine_io_parser_1 = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/cjs/index.js");
const debug = (0, debug_1.default)("engine.io-client:websocket"); // debug()
// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class WS extends transport_js_1.Transport {
    /**
     * WebSocket transport constructor.
     *
     * @api {Object} connection options
     * @api public
     */
    constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Transport name.
     *
     * @api public
     */
    get name() {
        return "websocket";
    }
    /**
     * Opens socket.
     *
     * @api private
     */
    doOpen() {
        if (!this.check()) {
            // let probe timeout
            return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : (0, util_js_1.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws =
                websocket_constructor_js_1.usingBrowserWebSocket && !isReactNative
                    ? protocols
                        ? new websocket_constructor_js_1.WebSocket(uri, protocols)
                        : new websocket_constructor_js_1.WebSocket(uri)
                    : new websocket_constructor_js_1.WebSocket(uri, protocols, opts);
        }
        catch (err) {
            return this.emit("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || websocket_constructor_js_1.defaultBinaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @api private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = ev => this.onData(ev.data);
        this.ws.onerror = e => this.onError("websocket error", e);
    }
    /**
     * Writes data to socket.
     *
     * @param {Array} array of packets.
     * @api private
     */
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0, engine_io_parser_1.encodePacket)(packet, this.supportsBinary, data => {
                // always create a new object (GH-437)
                const opts = {};
                if (!websocket_constructor_js_1.usingBrowserWebSocket) {
                    if (packet.options) {
                        opts.compress = packet.options.compress;
                    }
                    if (this.opts.perMessageDeflate) {
                        const len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
                        if (len < this.opts.perMessageDeflate.threshold) {
                            opts.compress = false;
                        }
                    }
                }
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (websocket_constructor_js_1.usingBrowserWebSocket) {
                        // TypeError is thrown when passing the second argument on Safari
                        this.ws.send(data);
                    }
                    else {
                        this.ws.send(data, opts);
                    }
                }
                catch (e) {
                    debug("websocket closed before onclose event");
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    (0, websocket_constructor_js_1.nextTick)(() => {
                        this.writable = true;
                        this.emit("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    /**
     * Closes socket.
     *
     * @api private
     */
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = "";
        // avoid port if default for schema
        if (this.opts.port &&
            (("wss" === schema && Number(this.opts.port) !== 443) ||
                ("ws" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, yeast_1.default)();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        const encodedQuery = parseqs_1.default.encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @api public
     */
    check() {
        return (!!websocket_constructor_js_1.WebSocket &&
            !("__initialize" in websocket_constructor_js_1.WebSocket && this.name === WS.prototype.name));
    }
}
exports.WS = WS;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/xmlhttprequest.browser.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/xmlhttprequest.browser.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// browser shim for xmlhttprequest module
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const has_cors_1 = __importDefault(__webpack_require__(/*! has-cors */ "./node_modules/has-cors/index.js"));
const globalThis_js_1 = __importDefault(__webpack_require__(/*! ../globalThis.js */ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js"));
function default_1(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || has_cors_1.default)) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new globalThis_js_1.default[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/util.js":
/*!*********************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/util.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.installTimerFunctions = exports.pick = void 0;
const globalThis_js_1 = __importDefault(__webpack_require__(/*! ./globalThis.js */ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js"));
function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
exports.pick = pick;
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = setTimeout;
const NATIVE_CLEAR_TIMEOUT = clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis_js_1.default);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis_js_1.default);
    }
    else {
        obj.setTimeoutFn = setTimeout.bind(globalThis_js_1.default);
        obj.clearTimeoutFn = clearTimeout.bind(globalThis_js_1.default);
    }
}
exports.installTimerFunctions = installTimerFunctions;


/***/ }),

/***/ "./node_modules/engine.io-parser/build/cjs/commons.js":
/*!************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/cjs/commons.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_PACKET = exports.PACKET_TYPES_REVERSE = exports.PACKET_TYPES = void 0;
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
exports.PACKET_TYPES = PACKET_TYPES;
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
exports.PACKET_TYPES_REVERSE = PACKET_TYPES_REVERSE;
Object.keys(PACKET_TYPES).forEach(key => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };
exports.ERROR_PACKET = ERROR_PACKET;


/***/ }),

/***/ "./node_modules/engine.io-parser/build/cjs/decodePacket.browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/cjs/decodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commons_js_1 = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/cjs/commons.js");
const base64_arraybuffer_1 = __webpack_require__(/*! base64-arraybuffer */ "./node_modules/base64-arraybuffer/dist/base64-arraybuffer.es5.js");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
    }
    const packetType = commons_js_1.PACKET_TYPES_REVERSE[type];
    if (!packetType) {
        return commons_js_1.ERROR_PACKET;
    }
    return encodedPacket.length > 1
        ? {
            type: commons_js_1.PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1)
        }
        : {
            type: commons_js_1.PACKET_TYPES_REVERSE[type]
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer) {
        const decoded = (0, base64_arraybuffer_1.decode)(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            return data instanceof ArrayBuffer ? new Blob([data]) : data;
        case "arraybuffer":
        default:
            return data; // assuming the data is already an ArrayBuffer
    }
};
exports["default"] = decodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/build/cjs/encodePacket.browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/cjs/encodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commons_js_1 = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/cjs/commons.js");
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer &&
        (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(commons_js_1.PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + content);
    };
    return fileReader.readAsDataURL(data);
};
exports["default"] = encodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/build/cjs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-parser/build/cjs/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodePayload = exports.decodePacket = exports.encodePayload = exports.encodePacket = exports.protocol = void 0;
const encodePacket_js_1 = __webpack_require__(/*! ./encodePacket.js */ "./node_modules/engine.io-parser/build/cjs/encodePacket.browser.js");
exports.encodePacket = encodePacket_js_1.default;
const decodePacket_js_1 = __webpack_require__(/*! ./decodePacket.js */ "./node_modules/engine.io-parser/build/cjs/decodePacket.browser.js");
exports.decodePacket = decodePacket_js_1.default;
const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        (0, encodePacket_js_1.default)(packet, false, encodedPacket => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
exports.encodePayload = encodePayload;
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = (0, decodePacket_js_1.default)(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
exports.decodePayload = decodePayload;
exports.protocol = 4;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/index.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = exports.connect = exports.io = exports.Socket = exports.Manager = exports.protocol = void 0;
const url_js_1 = __webpack_require__(/*! ./url.js */ "./node_modules/socket.io-client/build/cjs/url.js");
const manager_js_1 = __webpack_require__(/*! ./manager.js */ "./node_modules/socket.io-client/build/cjs/manager.js");
Object.defineProperty(exports, "Manager", ({ enumerable: true, get: function () { return manager_js_1.Manager; } }));
const socket_js_1 = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/cjs/socket.js");
Object.defineProperty(exports, "Socket", ({ enumerable: true, get: function () { return socket_js_1.Socket; } }));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = debug_1.default("socket.io-client"); // debug()
/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = url_js_1.url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io = new manager_js_1.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            debug("new io instance for %s", source);
            cache[id] = new manager_js_1.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
exports.io = lookup;
exports.connect = lookup;
exports["default"] = lookup;
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: manager_js_1.Manager,
    Socket: socket_js_1.Socket,
    io: lookup,
    connect: lookup,
});
/**
 * Protocol version.
 *
 * @public
 */
var socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/cjs/index.js");
Object.defineProperty(exports, "protocol", ({ enumerable: true, get: function () { return socket_io_parser_1.protocol; } }));

module.exports = lookup;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/manager.js":
/*!************************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/manager.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Manager = void 0;
const engine_io_client_1 = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/cjs/index.js");
const socket_js_1 = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/cjs/socket.js");
const parser = __importStar(__webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/cjs/index.js"));
const on_js_1 = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/cjs/on.js");
const backo2_1 = __importDefault(__webpack_require__(/*! backo2 */ "./node_modules/backo2/index.js"));
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = debug_1.default("socket.io-client:manager"); // debug()
class Manager extends component_emitter_1.Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        engine_io_client_1.installTimerFunctions(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new backo2_1.default({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open"))
            return this;
        debug("opening %s", this.uri);
        this.engine = new engine_io_client_1.Socket(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = on_js_1.on(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = on_js_1.on(socket, "error", (err) => {
            debug("error");
            self.cleanup();
            self._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                self.maybeReconnectOnOpen();
            }
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            debug("connect attempt will timeout after %d", timeout);
            if (timeout === 0) {
                openSubDestroy(); // prevents a race condition with the 'open' event
            }
            // set timer
            const timer = this.setTimeoutFn(() => {
                debug("connect attempt timed out after %d", timeout);
                openSubDestroy();
                socket.close();
                // @ts-ignore
                socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        debug("open");
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push(on_js_1.on(socket, "ping", this.onping.bind(this)), on_js_1.on(socket, "data", this.ondata.bind(this)), on_js_1.on(socket, "error", this.onerror.bind(this)), on_js_1.on(socket, "close", this.onclose.bind(this)), on_js_1.on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        this.decoder.add(data);
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        this.emitReserved("packet", packet);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        debug("error", err);
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new socket_js_1.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                debug("socket %s is still active, skipping close", nsp);
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        debug("writing packet %j", packet);
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        debug("cleanup");
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason) {
        debug("closed due to %s", reason);
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug("reconnect failed");
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            debug("will wait %dms before reconnect attempt", delay);
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                debug("attempting reconnect");
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        debug("reconnect attempt error");
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        debug("reconnect success");
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}
exports.Manager = Manager;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/on.js":
/*!*******************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/on.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.on = void 0;
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}
exports.on = on;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/socket.js":
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/socket.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Socket = void 0;
const socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/cjs/index.js");
const on_js_1 = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/cjs/on.js");
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = debug_1.default("socket.io-client:socket"); // debug()
/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
class Socket extends component_emitter_1.Emitter {
    /**
     * `Socket` constructor.
     *
     * @public
     */
    constructor(io, nsp, opts) {
        super();
        this.connected = false;
        this.disconnected = true;
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            on_js_1.on(io, "open", this.onopen.bind(this)),
            on_js_1.on(io, "packet", this.onpacket.bind(this)),
            on_js_1.on(io, "error", this.onerror.bind(this)),
            on_js_1.on(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @public
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for connect()
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @return self
     * @public
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            debug("emitting packet with ack id %d", id);
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
            debug("discard packet as the transport is not currently writable");
        }
        else if (this.connected) {
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        const timeout = this.flags.timeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    debug("removing packet with ack id %d from the buffer", id);
                    this.sendBuffer.splice(i, 1);
                }
            }
            debug("event with ack id %d has timed out after %d ms", id, timeout);
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, [null, ...args]);
        };
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        debug("transport is open - connecting");
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });
            });
        }
        else {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });
        }
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @private
     */
    onclose(reason) {
        debug("close (%s)", reason);
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        this.emitReserved("disconnect", reason);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser_1.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    const id = packet.data.sid;
                    this.onconnect(id);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser_1.PacketType.EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser_1.PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (null != packet.id) {
            debug("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            debug("sending ack %j", args);
            self.packet({
                type: socket_io_parser_1.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            debug("calling ack %s with %j", packet.id, packet.data);
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
            debug("bad ack %s", packet.id);
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id) {
        debug("socket connected with id %s", id);
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        this.emitBuffered();
        this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => this.packet(packet));
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually.
     *
     * @return self
     * @public
     */
    disconnect() {
        if (this.connected) {
            debug("performing disconnect (%s)", this.nsp);
            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for disconnect()
     *
     * @return self
     * @public
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @returns self
     * @public
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * ```
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     * ```
     *
     * @returns self
     * @public
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny() {
        return this._anyListeners || [];
    }
}
exports.Socket = Socket;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/url.js":
/*!********************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/url.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.url = void 0;
const parseuri_1 = __importDefault(__webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js"));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = debug_1.default("socket.io-client:url"); // debug()
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            debug("protocol-less url %s", uri);
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        debug("parse %s", uri);
        obj = parseuri_1.default(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}
exports.url = url;


/***/ }),

/***/ "./node_modules/socket.io-parser/build/cjs/binary.js":
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/cjs/binary.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reconstructPacket = exports.deconstructPacket = void 0;
const is_binary_js_1 = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/cjs/is-binary.js");
/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
exports.deconstructPacket = deconstructPacket;
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (is_binary_js_1.isBinary(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful
    return packet;
}
exports.reconstructPacket = reconstructPacket;
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder) {
        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/cjs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/cjs/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const binary_js_1 = __webpack_require__(/*! ./binary.js */ "./node_modules/socket.io-parser/build/cjs/binary.js");
const is_binary_js_1 = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/cjs/is-binary.js");
const debug_1 = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js"); // debug()
const debug = debug_1.default("socket.io-parser"); // debug()
/**
 * Protocol version.
 *
 * @public
 */
exports.protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType = exports.PacketType || (exports.PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (is_binary_js_1.hasBinary(obj)) {
                obj.type =
                    obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK;
                return this.encodeAsBinary(obj);
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data);
        }
        debug("encoded %j as %s", obj, str);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = binary_js_1.deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
exports.Encoder = Encoder;
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends component_emitter_1.Emitter {
    constructor() {
        super();
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            packet = this.decodeString(obj);
            if (packet.type === PacketType.BINARY_EVENT ||
                packet.type === PacketType.BINARY_ACK) {
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if (is_binary_js_1.isBinary(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        debug("decoded %s as %j", str, p);
        return p;
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return typeof payload === "object";
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
        }
    }
}
exports.Decoder = Decoder;
function tryParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = binary_js_1.reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/cjs/is-binary.js":
/*!**************************************************************!*\
  !*** ./node_modules/socket.io-parser/build/cjs/is-binary.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasBinary = exports.isBinary = void 0;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
exports.isBinary = isBinary;
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}
exports.hasBinary = hasBinary;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/main": 0,
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkliving_lab_zodiac_frontend"] = self["webpackChunkliving_lab_zodiac_frontend"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["main"], () => (__webpack_require__("./js/main.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["main"], () => (__webpack_require__("./css/main.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;