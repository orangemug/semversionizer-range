# semverionizer-range (work in progress)
A [semver](http://semver.org/) range validator.

## Usage
Validate using

    var range = require("semverionizer-range");
    range(">3.14.25", "3.14.26"); // => true

Currently supported

    *              Anything as long as it's valid
    1.2.3          Equality
    >1.2.3         Greater than
    <1.2.3         Less than
    >=1.2.3        Greater than or equal to
    <=1.2.3        Less than or equal to
    1.2.3 - 1.4.5  Range 

Still unsupported

    ~1.2.3         Reasonably close
    ^1.2.3         Compatible with
    1.2.x          Staring with


## License
MIT
