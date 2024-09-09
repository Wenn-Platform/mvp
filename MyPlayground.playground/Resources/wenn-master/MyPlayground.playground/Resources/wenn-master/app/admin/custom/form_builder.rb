class Admin::FormBuilder < ActiveAdmin::FormBuilder
  def content_columns
    super + activestorage_columns
  end

  def activestorage_columns
    object.attachment_reflections.values.map(&:name)
  end
end