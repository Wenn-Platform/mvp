# == Schema Information
#
# Table name: admin_users
#
#  id                     :uuid             not null, primary key
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#
require 'rails_helper'

RSpec.describe AdminUser, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
