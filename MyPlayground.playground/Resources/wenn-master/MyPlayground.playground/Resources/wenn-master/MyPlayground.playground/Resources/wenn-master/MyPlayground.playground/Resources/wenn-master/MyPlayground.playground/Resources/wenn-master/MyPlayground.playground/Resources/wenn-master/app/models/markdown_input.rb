class MarkdownInput < Formtastic::Inputs::TextInput
  def to_html
    input_wrapping do
      label_html +
        builder.text_area(method, input_html_options) +
        template.content_tag('label', "&nbsp;".html_safe) +
        template.content_tag('div') do
          template.link_to('Markdown cheatseet ⧉', 'https://www.markdownguide.org/cheat-sheet/', target: '_blank') +
          template.content_tag('span', " (note that we only support the Basic Syntax)")
        end +
        template.content_tag('label', "#{humanized_method_name} (preview)") +
        template.content_tag('div', class: 'markdownlive-preview', data: {
          preview: method
        }) {}
    end
  end

  def input_html_options
    super.merge(
      data: { preview: '.markdownlive-preview[data-preview="' + method.to_s + '"]' },
      class: 'markdownlive-input'
    )
  end

  def label_text
    super + " (markdown)"
  end

  def humanized_method_name
    method.to_s.remove('_markdown').humanize
  end
end
