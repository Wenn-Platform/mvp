class ArrayInput < Formtastic::Inputs::StringInput
  def input_html_options
    super.merge(
      value: object.send(method).join(', ')
    )
  end
end