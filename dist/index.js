'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable arrow-body-style */

var graphqlHTTP = require('express-graphql');

var _require = require('graphql'),
    buildSchema = _require.buildSchema;

var fetch = require('node-fetch');

var schema = buildSchema('\n  type Registry {\n    href: String\n    ocVersion: String\n    type: String\n  }\n\n  type Component {\n    name: String\n    description: String\n    version: String\n  }\n\n  type Query {\n    registry: Registry\n    component(name: String): Component\n    components: [Component]\n  }\n');

var fetchComponent = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', fetch(url).then(function (response) {
              return response.json();
            }).then(function (data) {
              return data;
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchComponent(_x) {
    return _ref.apply(this, arguments);
  };
}();

var makeComponent = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(baseUrl, name) {
    var url, info, copy;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = '' + baseUrl + name + '/~info';
            _context2.next = 3;
            return fetchComponent(url);

          case 3:
            info = _context2.sent;
            copy = Object.assign({}, info);
            return _context2.abrupt('return', copy);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function makeComponent(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var root = function root(options) {
  return {
    registry: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', fetch(options.baseUrl).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  return {
                    href: data.href,
                    ocVersion: data.ocVersion,
                    type: data.type
                  };
                }));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function registry() {
        return _ref3.apply(this, arguments);
      };
    }(),
    components: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', fetch(options.baseUrl).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  return data.components.map(function (component) {
                    var name = component.replace(options.baseUrl, '');
                    return makeComponent(options.baseUrl, name);
                  });
                }));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function components() {
        return _ref4.apply(this, arguments);
      };
    }(),
    component: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(_ref6) {
        var name = _ref6.name;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', makeComponent(options.baseUrl, name));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      return function component(_x4) {
        return _ref5.apply(this, arguments);
      };
    }()
  };
};

var factory = function factory(options) {
  return graphqlHTTP({
    schema: schema,
    rootValue: root(options),
    graphiql: options.graphiql
  });
};

module.exports = factory;