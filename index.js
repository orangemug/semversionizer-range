var parse   = require("semversionizer-parser");
var compare = require("semversionizer-comparison");

var VERSION_REGEXP = '[0-9]+\\.[0-9]+\\.[0-9]+(?:\\-(?:[0-9A-Za-z-.]+))?(?:\\+(?:[0-9A-Za-z-.]+))?';

var DEFS = [
  {
    // Equal to: "1.2.3"
    regexp: new RegExp("^("+VERSION_REGEXP+")$"),
    handler: function(va, vb) {
      var rslt = compare(vb, va);
      return rslt === 0;
    }
  },
  {
    // Greater than: ">1.2.3"
    regexp: new RegExp("^>("+VERSION_REGEXP+")$"),
    handler: function(va, vb) {
      var rslt = compare(vb, va);
      return rslt === 1;
    }
  },
  {
    // Less than: "<1.2.3"
    regexp: new RegExp("^<("+VERSION_REGEXP+")$"),
    handler: function(va, vb) {
      var rslt = compare(vb, va);
      return rslt === -1;
    }
  },
  {
    // Greater than or equal to: ">=1.2.3"
    regexp: new RegExp("^>=("+VERSION_REGEXP+")$"),
    handler: function(va, vb) {
      var rslt = compare(vb, va);
      return rslt > -1;
    }
  },
  {
    // Less than or equal to: ">=1.2.3"
    regexp: new RegExp("^<=("+VERSION_REGEXP+")$"),
    handler: function(va, vb) {
      var rslt = compare(vb, va);
      return rslt < 1;
    }
  },
  {
    // Any version
    regexp: new RegExp("^\\*$"),
    handler: function(va, vb) {
      // Just check the semver is valid.
      return (parse(vb) !== undefined);
    }
  }
];

module.exports = function(range, version) {
  var def;

  for(var i=0; i<DEFS.length; i++) {
    def = DEFS[i];
    if(rslt=range.match(def.regexp)) {
      var args = rslt.splice(1);
      args.push(version);

      return def.handler.apply(this, args);
    }
  }
};

