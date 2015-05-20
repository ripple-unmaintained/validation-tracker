"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidationLogEntry = (function () {
  function ValidationLogEntry(entry) {
    _classCallCheck(this, ValidationLogEntry);

    this.entry = entry.split(" ");
  }

  _createClass(ValidationLogEntry, [{
    key: "hash",
    get: function () {
      return this.entry[5];
    }
  }, {
    key: "public_key",
    get: function () {
      return this.entry[7];
    }
  }, {
    key: "trusted",
    get: function () {
      return this.entry[9];
    }
  }, {
    key: "datetime",
    get: function () {
      return "" + this.entry[0] + " " + this.entry[1];
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        hash: this.hash,
        public_key: this.public_key,
        trusted: this.trusted,
        datetime: this.datetime
      };
    }
  }]);

  return ValidationLogEntry;
})();

exports["default"] = ValidationLogEntry;
module.exports = exports["default"];