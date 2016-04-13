// ========================================================================
//  XML.ObjTree -- XML source code from/to JavaScript object like E4X
// ========================================================================
var XML = window.XML;

if ( typeof(XML) == 'undefined' ) XML = function() {};

//  constructor
XML.ObjTree = function () {
  console.warn('xml obj transformation is not implemented.');
  return this;
};

//  class variables
XML.ObjTree.VERSION = "0.10";

//  object prototype
XML.ObjTree.prototype.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n';
XML.ObjTree.prototype.attr_prefix = '-';
XML.ObjTree.prototype.overrideMimeType = 'text/xml';

//  method: parseXML( xmlsource )
XML.ObjTree.prototype.parseXML = function ( xml ) {
  console.warn('parseXML is not implemented.');
};

//  method: parseHTTP( url, options, callback )
XML.ObjTree.prototype.parseHTTP = function ( url, options, callback ) {
  console.warn('parseHTTP is not implemented.');
}

//  method: parseDOM( documentroot )
XML.ObjTree.prototype.parseDOM = function ( root ) {
  console.warn('praseDom is not implemented.');
};

//  method: parseElement( element )
XML.ObjTree.prototype.parseElement = function ( elem ) {
  console.warn('parseElement is not implemented.');
};

//  method: addNode( hash, key, count, value )
XML.ObjTree.prototype.addNode = function ( hash, key, cnts, val ) {
  console.warn('addNode is not implemented.');
};

//  method: writeXML( tree )
XML.ObjTree.prototype.writeXML = function ( tree ) {
  console.warn('writeXML is not implemented.');
};

//  method: hash_to_xml( tagName, tree )
XML.ObjTree.prototype.hash_to_xml = function ( name, tree ) {
  console.warn('hash_to_xml is not implemented.');
};

//  method: array_to_xml( tagName, array )
XML.ObjTree.prototype.array_to_xml = function ( name, array ) {
  console.warn('array_to_xml is not implemented.');
};

//  method: scalar_to_xml( tagName, text )
XML.ObjTree.prototype.scalar_to_xml = function ( name, text ) {
  console.warn('scalar_to_xml is not implemented.');
};

//  method: xml_escape( text )
XML.ObjTree.prototype.xml_escape = function ( text ) {
  console.warn('xml_escape is not implemented.');
};


