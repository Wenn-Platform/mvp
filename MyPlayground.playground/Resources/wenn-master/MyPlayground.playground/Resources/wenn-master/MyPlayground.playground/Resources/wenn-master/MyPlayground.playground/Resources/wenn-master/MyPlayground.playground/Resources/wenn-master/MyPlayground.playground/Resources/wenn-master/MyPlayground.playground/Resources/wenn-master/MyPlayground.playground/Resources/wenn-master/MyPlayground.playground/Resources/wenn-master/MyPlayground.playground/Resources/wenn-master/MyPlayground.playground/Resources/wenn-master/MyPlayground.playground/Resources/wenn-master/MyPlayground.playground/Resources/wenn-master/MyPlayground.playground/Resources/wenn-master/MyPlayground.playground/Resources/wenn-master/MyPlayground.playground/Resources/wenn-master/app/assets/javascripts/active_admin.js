//= require active_admin/base
//= require jquery.markdown-live.js
//= require js-video-url-parser/dist/jsVideoUrlParser.js
//= require underscore/underscore.js
//= require_tree ./

$(function() {
  $(document).on('click', '[data-enable]', function(e) {
    targetSelector = $(e.target).data('enable');
    $targetEl = $(targetSelector);
    $targetEl.prop('disabled', false);
    e.preventDefault();
  })

  $(document).on('click', '[data-hide]', function(e) {
    targetSelector = $(e.target).data('hide');
    $targetEl = $(targetSelector);
    $targetEl.hide();
    e.preventDefault();
  })

  $(document).on('click', '[data-show]', function(e) {
    targetSelector = $(e.target).data('show');
    $targetEl = $(targetSelector);
    $targetEl.show();
    e.preventDefault();
  })

  $(document).on('change', '[data-if-blank-enable]', function(e) {
    targetSelector = $(e.target).data('if-blank-enable');
    $targetEl = $(targetSelector);
    $targetEl.prop('disabled', !!e.target.files.length);
  })

  // Markdown: editing interface
  $('textarea.markdownlive-input').markdownlive();
  // Markdown: show interface
  $('div.markdown').each(function() {
    $this = $(this);
    var rawMarkdown = $this.html();
    markdownHtml = Markdown(rawMarkdown);
    $this.html(markdownHtml);
  })

  $('[data-embed-video-url]').each(function() {
    $this = $(this);
    parsedMedia = parseMedia($this.data('embed-video-url'));
    if(parsedMedia && parsedMedia[0]) {
      embedMedia($this, parsedMedia[0])
    }
  })
})
