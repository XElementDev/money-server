// ↓ based on https://www.iana.org/assignments/media-types/media-types.xhtml
type ApplicationMediaTypeName
	= "application/json"
;

type ImageMediaTypeName
	= "image/png"
;

type TextMediaTypeName
	= "text/plain"
;

export type MediaTypeName
	= ApplicationMediaTypeName
	| ImageMediaTypeName
	| TextMediaTypeName
;
