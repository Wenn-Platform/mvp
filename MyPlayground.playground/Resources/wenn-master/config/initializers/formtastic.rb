# Formtastic uses an old rails 3 convention for scoping
# associations (e.g. those shown in <select> tags on forms)
# This monkey patch circumvents the old convention and
# gives us a new mechanism to accomplish the same
module FormtasticScopedAssociations
  def collection_from_association
    if reflection
      custom_scopes = object.class.const_get("ACTIVE_ADMIN_ASSOCIATION_SCOPE_CONDITIONS") if object.class.const_defined?("ACTIVE_ADMIN_ASSOCIATION_SCOPE_CONDITIONS")
      custom_scopes ||= {}
      scope = custom_scopes[reflection.name]
      if scope
        where_conditions = scope.call(object)
        reflection.klass.where(where_conditions)
      else
        super
      end
    end
  end
end

Formtastic::Inputs::SelectInput.prepend(FormtasticScopedAssociations)


