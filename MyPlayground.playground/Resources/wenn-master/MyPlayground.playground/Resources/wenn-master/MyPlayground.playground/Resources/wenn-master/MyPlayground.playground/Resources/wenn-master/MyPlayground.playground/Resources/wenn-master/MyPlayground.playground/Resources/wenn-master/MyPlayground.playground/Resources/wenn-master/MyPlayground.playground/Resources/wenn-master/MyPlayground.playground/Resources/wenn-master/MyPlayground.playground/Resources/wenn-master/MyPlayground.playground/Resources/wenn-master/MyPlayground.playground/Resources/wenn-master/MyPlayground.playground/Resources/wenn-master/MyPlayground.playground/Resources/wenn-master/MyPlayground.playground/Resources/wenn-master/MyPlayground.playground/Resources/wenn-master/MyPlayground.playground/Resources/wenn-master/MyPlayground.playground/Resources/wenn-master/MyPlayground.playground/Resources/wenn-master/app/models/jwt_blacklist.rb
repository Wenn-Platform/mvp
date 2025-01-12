# == Schema Information
#
# Table name: jwt_blacklists
#
#  id         :uuid             not null, primary key
#  jti        :string           not null
#  exp        :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class JwtBlacklist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Blacklist
end
