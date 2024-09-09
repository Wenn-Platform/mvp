class ApplicationBlueprint < Blueprinter::Base
  field :__type do |object, options|
    object.class.name.split('::').last
  end

  identifier :id

  def self.association(association_name, *)
    super
    association_id = "#{association_name}_id".to_sym
    field association_id, if: ->(_, object, options) { object.try(association_id) }
  end
end
