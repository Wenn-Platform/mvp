MEDIA_TYPES = {
  youtube: {
    matcher: function(parsed) {
      return parsed.mediaType === 'video' && parsed.provider === 'youtube'
    },
    embedHtml: function(parsed) {
      url = "//www.youtube.com/embed/" + parsed.id
      return "<iframe src=\"" + url + "\" frameborder=\"0\"></iframe>"
    }
  }
}

function parseMedia(str, options) {
  options = options || {}
  options.matcher = options.matcher || MEDIA_TYPES.youtube.matcher // temp: for now only match youtube
  if(typeof(options.max) === 'undefined') {
    options.max = 1
  }

  media = []
  segments = str.split(/\s+/)
  _.each(segments, function(s) {
    if(options.max && media.length >= options.max) {
      return
    }

    if(s.match(/^https?\:\/\//)) {
      parsed = urlParser.parse(s)
      if(parsed && options.matcher(parsed)) {
        media.push(parsed)
      }
    }
  })

  return media
}

function embedMedia(placeholderElement, parsedMedia) {
  element = $(MEDIA_TYPES[parsedMedia.provider].embedHtml(parsedMedia))
  $(placeholderElement).replaceWith(element)
  element.addClass('media-embed')
  element.css('width', '100%')
  element.css('height', element.width() / 16.0 * 9)
}

window.parseMedia = parseMedia
window.embedMedia = embedMedia
