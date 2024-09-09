class UserBlueprint < ApplicationBlueprint
  identifier :id

  view :current_user do
    fields :ability_rules, :full_name
  end
end
